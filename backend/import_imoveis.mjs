import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import Database from 'better-sqlite3';

const dbPath = path.join(process.cwd(), 'backend', 'database.sqlite');
const db = new Database(dbPath);

const urls = [
  'https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-residencial-alphaville-iii/667161',
  'https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-residencial-alphaville-iv/676079',
  'https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-residencial-alphaville-ii/682176',
  'https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-residencial-alphaville-iii/672721',
  'https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-residencial-alphaville-iv/647469',
  'https://www.infoimoveis.com.br/imovel/venda-casa-terrea-condominio-residencial-alphaville-iii/660681',
  'https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-pq-residencial-damha-ii/679270',
  'https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-pq-residencial-damha-iv/680119',
  'https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-pq-residencial-damha-iii/682180'
];

async function scrapeProperty(url) {
  console.log(`Buscando: ${url}`);
  try {
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    // Na infoimoveis:
    // Título / Tipo do Imóvel:
    let title = $('.dados-imovel-topo h1').text().trim() || 'Sobrado Condomínio';
    
    // Código (normalmente está na URL ou em algum lugar)
    const codeMatch = url.match(/\/(\d+)$/);
    const code = codeMatch ? `REF${codeMatch[1]}` : `REF${Math.floor(Math.random()*100000)}`;

    // Localização:
    let location = $('.dados-imovel-topo h2').text().trim() || 'Campo Grande - MS';
    
    // Valor:
    let price = $('.valores h3').text().trim() || 'Consulte';
    if (!price) {
        price = 'Consulte o Valor';
    }

    // Descrição:
    let description = $('#detalhes .conteudo p').text().trim() || 'Sobrado alto padrão em condomínio exclusivo. Possui excelente arquitetura e distribuição de espaços. Mais detalhes sob consulta.';

    // Especificações (quartos, vagas, área):
    let specs = [];
    $('.caracteristicas-basicas li').each((i, el) => {
        specs.push($(el).text().trim());
    });
    
    if (specs.length === 0) {
        specs = ["Consultar Vagas", "Consultar Suítes"];
    }

    return {
        code,
        title,
        location,
        price,
        summary: description,
        specs: JSON.stringify(specs),
        cta: 'Fale com a gente',
        category: 'ms_properties'
    };

  } catch (err) {
    console.error(`Erro ao processar ${url}:`, err);
    return null;
  }
}

async function run() {
  const insertProp = db.prepare(`
      INSERT INTO properties (code, title, location, summary, price, specs, cta, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let count = 0;
  for (const url of urls) {
      const data = await scrapeProperty(url);
      if (data) {
          try {
              insertProp.run(
                  data.code,
                  data.title,
                  data.location,
                  data.summary,
                  data.price,
                  data.specs,
                  data.cta,
                  data.category
              );
              console.log(`✔ Salvo: ${data.title}`);
              count++;
          } catch(e) {
              console.error("Erro ao salvar no banco:", e);
          }
      }
      // wait a bit
      await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log(`\nImportação concluída: ${count} imóveis adicionados!`);
}

run();
