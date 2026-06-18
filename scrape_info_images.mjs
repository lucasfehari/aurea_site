import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';

const urls = [
  { ref: "679270", url: "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-pq-residencial-damha-ii/679270" },
  { ref: "680119", url: "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-pq-residencial-damha-iv/680119" },
  { ref: "682180", url: "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-pq-residencial-damha-iii/682180" }
];

const DOWNLOAD_DIR = path.join(process.cwd(), 'src', 'assets', 'imoveis_organizados', 'campo_grande');

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      } else {
        reject(new Error(`Failed with status ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  
  for (const item of urls) {
    console.log(`\nAbrindo Infoimóveis para Ref: ${item.ref}...`);
    const page = await browser.newPage();
    await page.goto(item.url, { waitUntil: 'networkidle2' });
    
    const imageUrls = await page.evaluate(() => {
      let srcs = [];
      // Tentar Modo 2
      const els = document.querySelectorAll('#carouselExampleIndicators .carousel-item img, .carousel-inner .carousel-item img');
      if (els.length > 0) {
        els.forEach(img => {
          srcs.push(img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-lazy'));
        });
      } else {
        // Tentar pegar todas as imagens grandes ou carrossel Fancybox
        const allImgs = document.querySelectorAll('img');
        allImgs.forEach(img => {
          const s = img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-lazy');
          if (s && !s.includes('corretores') && !s.includes('banner') && !s.includes('logo')) {
            srcs.push(s);
          }
        });
      }
      return [...new Set(srcs.filter(Boolean))];
    });

    console.log(`Encontradas ${imageUrls.length} imagens. Baixando...`);
    const destFolder = path.join(DOWNLOAD_DIR, `imovel_ref_${item.ref}`);
    if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder, { recursive: true });

    let idx = 1;
    for (const src of imageUrls) {
      let urlAbs = src.startsWith('http') ? src : `https://www.infoimoveis.com.br${src.startsWith('/') ? '' : '/'}${src}`;
      const ext = urlAbs.includes('.png') ? '.png' : urlAbs.includes('.webp') ? '.webp' : '.jpg';
      const fileDest = path.join(destFolder, `${idx}${ext}`);
      try {
        await downloadImage(urlAbs, fileDest);
        idx++;
      } catch (e) {
        console.error(`Erro na imagem ${idx}: ${e.message}`);
      }
    }
    await page.close();
  }

  await browser.close();
}

run().then(() => console.log('Pronto!')).catch(e => console.error(e));
