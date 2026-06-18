import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const links = [
  { ref: "667161", url: "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-residencial-alphaville-iii/667161", drive: "1xrUZ2-hreLAEKcqShVIayUzElAvhurTt" },
  { ref: "676079", url: "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-residencial-alphaville-iv/676079", drive: "1VsDdbCdcxL3C2m1aCVfVqsVxcoV-V0LP" },
  { ref: "682176", url: "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-residencial-alphaville-ii/682176", drive: "13SHpQfotLJIaUsVNk3AoreDG51CXSamW" },
  { ref: "672721", url: "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-residencial-alphaville-iii/672721", drive: "1P0pBZX0LF61tGpWmzTQqdKVo3bh355V9" },
  { ref: "647469", url: "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-residencial-alphaville-iv/647469", drive: "1YncCBgt67i97fozPvC3BvQtf9LHqU0xk" },
  { ref: "660681", url: "https://www.infoimoveis.com.br/imovel/venda-casa-terrea-condominio-residencial-alphaville-iii/660681", drive: "18wk5h6UIk3tuGX8mD1xtSQjbUnrHzDH7" },
  { ref: "679270", url: "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-pq-residencial-damha-ii/679270", drive: "13xIX-c2QVjDiSzr39-aHOeILCDKruplY" },
  { ref: "680119", url: "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-pq-residencial-damha-iv/680119", drive: "11hoqwxiTqS8CIUUFGjvJq9mUxA0DUWP-" },
  { ref: "682180", url: "https://www.infoimoveis.com.br/imovel/venda-sobrado-condominio-ms-campo-grande-pq-residencial-damha-iii/682180", drive: "16iiUyzB06LHPZcFW9QgqiuQapGbqyEN2" }
];

const DOWNLOAD_DIR = path.join(process.cwd(), 'src', 'assets', 'imoveis_organizados', 'campo_grande');

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

async function run() {
  console.log("Instalando gdown para baixar pastas do Google Drive...");
  try {
    execSync("pip3 install gdown", { stdio: 'inherit' });
  } catch (e) {
    try {
      execSync("pip install gdown", { stdio: 'inherit' });
    } catch (e2) {
      console.log("Aviso: Falha ao instalar gdown. Verifique se o Python está instalado.");
    }
  }

  for (const item of links) {
    const destFolder = path.join(DOWNLOAD_DIR, `imovel_ref_${item.ref}`);
    if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder, { recursive: true });

    console.log(`\nBaixando fotos do Google Drive para Ref: ${item.ref}...`);
    try {
      execSync(`python3 -m gdown --folder https://drive.google.com/drive/folders/${item.drive} -O "${destFolder}"`, { stdio: 'inherit' });
      console.log(`Sucesso ao baixar pastas de ${item.ref}`);
    } catch (e) {
      console.error(`Erro ao baixar fotos de ${item.ref}`);
    }
  }
}

run();
