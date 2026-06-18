import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.join(process.cwd(), 'backend', 'database.sqlite');
const db = new Database(dbPath);

const propertiesFile = path.join(process.cwd(), 'backend', 'properties.js');
let content = fs.readFileSync(propertiesFile, 'utf-8');

const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"]([^'"]+)['"];/g;
const importMap = {};
let match;

while ((match = importRegex.exec(content)) !== null) {
    importMap[match[1]] = match[2].replace('../assets/', '/src/assets/');
}

let contentWithoutImports = content.replace(importRegex, '');

// Substitui a exportação
contentWithoutImports = contentWithoutImports.replace(/export\s+const\s+propertiesData\s*=\s*/g, 'const propertiesData = ');
contentWithoutImports += '\n\nexport default propertiesData;';

let variablesCode = '';
for (const [varName, filePath] of Object.entries(importMap)) {
    variablesCode += `const ${varName} = "${filePath}";\n`;
}

const finalCode = variablesCode + contentWithoutImports;
const fsTemp = path.join(process.cwd(), 'backend', 'temp_eval.mjs');
fs.writeFileSync(fsTemp, finalCode);

try {
    const propertiesData = await import('file://' + fsTemp);
    
    const insertProp = db.prepare(`
        INSERT INTO properties (code, title, location, summary, price, specs, cta, category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const insertImg = db.prepare(`
        INSERT INTO property_images (property_id, image_url, is_main)
        VALUES (?, ?, ?)
    `);

    const data = propertiesData.default || propertiesData;
    let count = 0;
    
    db.transaction(() => {
        for (const [category, props] of Object.entries(data)) {
            if (!Array.isArray(props)) continue;
            
            for (const p of props) {
                const code = p.id || '';
                const specs = Array.isArray(p.specs) ? JSON.stringify(p.specs) : '[]';
                
                const res = insertProp.run(
                    code,
                    p.title || '',
                    p.location || '',
                    p.summary || '',
                    p.price || '',
                    specs,
                    p.cta || 'Fale com a gente',
                    category
                );
                
                const propId = res.lastInsertRowid;
                
                if (Array.isArray(p.images)) {
                    let isMain = 1;
                    for (const imgUrl of p.images) {
                        insertImg.run(propId, imgUrl, isMain);
                        isMain = 0;
                    }
                } else if (p.image) {
                    insertImg.run(propId, p.image, 1);
                }
                count++;
            }
        }
    })();
    
    console.log(`Migração concluída! ${count} imóveis foram inseridos no SQLite.`);
} catch (e) {
    console.error("Erro ao migrar:", e);
} finally {
    if (fs.existsSync(fsTemp)) fs.unlinkSync(fsTemp);
}
