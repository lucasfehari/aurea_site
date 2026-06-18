import cloudscraper
import json
from bs4 import BeautifulSoup

urls = [
    ("667161", "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-residencial-alphaville-iii/667161"),
    ("676079", "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-residencial-alphaville-iv/676079"),
    ("682176", "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-residencial-alphaville-ii/682176"),
    ("672721", "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-residencial-alphaville-iii/672721"),
    ("647469", "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-residencial-alphaville-iv/647469"),
    ("660681", "https://www.infoimoveis.com.br/imovel/venda-casa-terrea-condominio-residencial-alphaville-iii/660681"),
    ("679270", "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-pq-residencial-damha-ii/679270"),
    ("680119", "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-pq-residencial-damha-iv/680119"),
    ("682180", "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-pq-residencial-damha-iii/682180")
]

scraper = cloudscraper.create_scraper()
results = []

for ref, url in urls:
    print(f"Scraping {ref}...")
    try:
        html = scraper.get(url).text
        soup = BeautifulSoup(html, 'html.parser')
        
        # Extracao de Titulo
        title = soup.title.string if soup.title else ""
        
        # Extracao de Preco
        price_tag = soup.find('h3', class_='price') or soup.find('div', class_='price')
        price = price_tag.text.strip() if price_tag else "Consulte"
        if not price_tag:
            price_match = soup.find(text=lambda text: text and 'R$' in text)
            if price_match: price = price_match.strip()
            
        # Descricao
        desc_tag = soup.find('div', class_='description') or soup.find('div', class_='conteudo-descricao')
        summary = desc_tag.text.strip()[:200] + '...' if desc_tag else ""
        
        results.append({
            "id": f"ref-{ref}",
            "title": title.split(' - ')[0].strip(),
            "price": price,
            "specs": [f"Cód. {ref}"],
            "summary": summary
        })
    except Exception as e:
        print(f"Erro no {ref}: {e}")

with open('scraped_imoveis.json', 'w') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print("Finalizado!")
