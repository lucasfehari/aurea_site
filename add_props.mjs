import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src', 'data', 'properties.ts');
let content = fs.readFileSync(file, 'utf-8');

const scraped = JSON.parse(fs.readFileSync('scraped_imoveis.json', 'utf-8'));

let importsStr = "\n// --- NOVOS IMOVEIS ---\n";
let objectsStr = "";

for (const prop of scraped) {
  const ref = prop.id.replace('ref-', '');
  const dirPath = path.join(process.cwd(), 'src', 'assets', 'imoveis_organizados', 'campo_grande', `imovel_ref_${ref}`);
  
  if (!fs.existsSync(dirPath)) continue;
  
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));
  files.sort((a, b) => parseInt(a) - parseInt(b));
  
  let importNames = [];
  files.forEach((f, index) => {
    const importName = `imgNovos_${ref}_${index}`;
    importsStr += `import ${importName} from '../assets/imoveis_organizados/campo_grande/imovel_ref_${ref}/${f}';\n`;
    importNames.push(importName);
  });
  
  if (importNames.length === 0) continue;

  const title = prop.title.split(' em ')[1] || prop.title;
  const location = title + " | Campo Grande - MS";

  objectsStr += `
    {
      id: "novos-${ref}",
      title: "${prop.title.replace(/"/g, '\\"')}",
      location: "${location.replace(/"/g, '\\"')}",
      image: ${importNames[0]},
      images: [
        ${importNames.join(',\n        ')}
      ],
      summary: "Excelente oportunidade no ${location}. Entre em contato para mais detalhes.",
      specs: ["Cód. ${ref}"],
      price: "Consulte",
      cta: "Fale com a gente"
    },`;
}

// Inserir imports logo após os últimos imports
const importIdx = content.lastIndexOf('import ');
const importEndIdx = content.indexOf('\n', importIdx) + 1;
content = content.slice(0, importEndIdx) + importsStr + content.slice(importEndIdx);

// Inserir objetos dentro de ms_properties
const msPropIdx = content.indexOf('ms_properties: [') + 'ms_properties: ['.length;
content = content.slice(0, msPropIdx) + objectsStr + content.slice(msPropIdx);

fs.writeFileSync(file, content);
console.log("properties.ts atualizado com sucesso!");
