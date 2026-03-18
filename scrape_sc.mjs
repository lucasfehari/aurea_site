import fs from 'fs';
import https from 'https';
import path from 'path';

const SC_LINKS = [
  { name: 'yachthouse', url: "https://www.guilhermepilger.com/imovel/apartamento-no-edificio-yachthouse-by-pininfarina-balneario-camboriu-centro-4-quartos-4-garagens-venda-ref-1989/" },
  { name: 'onetower', url: "https://www.guilhermepilger.com/imovel/apartamento-no-edificio-one-tower-balneario-camboriu-centro-4-quartos-3-garagens-venda-ref-1026/" },
  { name: 'ena', url: "https://www.guilhermepilger.com/imovel/apartamento-no-edificio-ena-balneario-camboriu-praia-do-estaleiro-4-quartos-4-garagens-venda-ref-2251/" },
  { name: 'atlantic', url: "https://www.guilhermepilger.com/imovel/apartamento-no-edificio-atlantic-paradise-itapema-meia-praia-4-quartos-3-garagens-venda-ref-2283/" },
  { name: 'namar', url: "https://www.namarphaczhome.com.br" }, // might need special handle
  { name: 'portobelogolf', url: "https://www.guilhermepilger.com/imovel/terreno-em-condominio-no-porto-belo-golf-porto-belo-porto-belo-venda-ref-2339/" },
  { name: 'bravahome', url: "https://www.guilhermepilger.com/imovel/cobertura-duplex-no-edificio-brava-home-resort-itajai-praia-brava-4-quartos-4-garagens-venda-ref-2363/" }
];

const DOWNLOAD_DIR = "d:\\BACKUP FORMATA\\SITES CLIENTES\\SITES CLIENTES\\Aurea\\src\\assets\\imoveis_atualizados";

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

async function fetchHTML(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return await response.text();
}

function extractData(html) {
  let title = html.match(/<title>(.*?)<\/title>/)?.[1] || "";
  let image = html.match(/<meta property="og:image"\s*content="([^"]+)"/i)?.[1];
  
  // Try to find price
  let priceRegex = /R\$\s*[\d\.\,]+/g;
  let prices = html.match(priceRegex) || [];
  
  // Try to find specs
  let areaMatch = html.match(/(\d+(,\d+)?)\s*m²\s*de\s*área\s*privativa/i);
  let suitesMatch = html.match(/(\d+)\s*suítes/i);
  let vagasMatch = html.match(/(\d+)\s*vagas/i);
  
  return {
    title: title.trim(),
    image,
    price: prices[0] || "Valor sob consulta",
    area: areaMatch ? areaMatch[1] : null,
    suites: suitesMatch ? suitesMatch[1] : null,
    vagas: vagasMatch ? vagasMatch[1] : null
  };
}

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
    }).on('error', reject);
  });
}

async function run() {
  const results = {};
  for (const item of SC_LINKS) {
    try {
      console.log(`Fetching ${item.name}...`);
      const html = await fetchHTML(item.url);
      const data = extractData(html);
      
      if (data.image) {
        let ext = path.extname(data.image.split('?')[0]) || '.jpg';
        if (ext === '') ext = '.jpg';
        let destPath = path.join(DOWNLOAD_DIR, `${item.name}${ext}`);
        console.log(`Downloading image for ${item.name} from ${data.image}`);
        await downloadImage(data.image, destPath);
        data.localImage = destPath.replace("d:\\BACKUP FORMATA\\SITES CLIENTES\\SITES CLIENTES\\Aurea\\", "");
      }
      results[item.name] = data;
      console.log(`Success ${item.name}:`, data);
    } catch (e) {
      console.error(`Failed ${item.name}:`, e.message);
    }
  }
  fs.writeFileSync(path.join(DOWNLOAD_DIR, 'sc_data.json'), JSON.stringify(results, null, 2));
}

run();
