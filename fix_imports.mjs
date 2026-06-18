import fs from 'fs';
import path from 'path';

function fixImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"]\.\.\/assets\/imoveis_organizados\/(.+?)['"];/g;
    
    content = content.replace(importRegex, "const $1 = '/imoveis_organizados/$2';");
    
    fs.writeFileSync(filePath, content);
}

fixImports('./src/pages/Home.tsx');
fixImports('./src/data/properties.ts');
console.log('Fixed imports!');
