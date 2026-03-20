import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, 'src/assets/imoveis_organizados');
const propertiesFile = path.join(__dirname, 'src/data/properties.ts');

let propertiesContent = fs.readFileSync(propertiesFile, 'utf-8');

const cities = ['campo_grande', 'itajai', 'balneario_camboriu', 'itapema', 'porto_belo'];

cities.forEach(city => {
  const cityDir = path.join(baseDir, city);
  if (!fs.existsSync(cityDir)) return;

  const files = fs.readdirSync(cityDir);
  
  files.forEach(file => {
    const filePath = path.join(cityDir, file);
    if (fs.statSync(filePath).isDirectory()) return;

    // Determine folder name
    let folderName = '';
    const codMatch = file.match(/cod_(\d+)/i);
    const refMatch = file.match(/ref_(\d+)/i);
    
    if (codMatch) {
      folderName = `imovel_cod_${codMatch[1]}`;
    } else if (refMatch) {
      folderName = `imovel_ref_${refMatch[1]}`;
    } else if (file === 'relatorio_geral_imoveis.md') {
       return;
    } else {
      // Fallback: use filename without extension and without _fachada_01
      folderName = file.replace(/\.(webp|jpeg|jpg|png|md)$/i, '').replace(/_fachada_01/i, '').replace(/_interior_01/i, '');
    }

    const newDir = path.join(cityDir, folderName);
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true });
    }

    const newFilePath = path.join(newDir, file);
    fs.renameSync(filePath, newFilePath);

    // Update references in properties.ts
    // Old ref: ../assets/imoveis_organizados/cidade/arquivo.ext
    // New ref: ../assets/imoveis_organizados/cidade/pasta/arquivo.ext
    
    const oldPathStr = `../assets/imoveis_organizados/${city}/${file}`;
    const newPathStr = `../assets/imoveis_organizados/${city}/${folderName}/${file}`;
    
    propertiesContent = propertiesContent.replaceAll(oldPathStr, newPathStr);
  });
});

fs.writeFileSync(propertiesFile, propertiesContent, 'utf-8');
console.log('Organização concluída e properties.ts atualizado!');
