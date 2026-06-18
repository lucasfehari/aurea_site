import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.join(process.cwd(), 'backend', 'database.sqlite');
const db = new Database(dbPath);

const jsonPath = path.join(process.cwd(), 'backend', 'scraped_properties.json');
const properties = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const insertProp = db.prepare(`
    INSERT INTO properties (code, title, location, summary, price, specs, cta, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

let count = 0;
for (const p of properties) {
    const codeMatch = p.url.match(/\/(\d+)$/);
    const code = codeMatch ? `REF${codeMatch[1]}` : `REF${Math.floor(Math.random()*100000)}`;

    try {
        insertProp.run(
            code,
            p.title,
            p.location,
            p.description,
            p.price,
            JSON.stringify(p.specs),
            'Fale com a gente',
            'ms_properties'
        );
        console.log(`✔ Salvo: ${p.title}`);
        count++;
    } catch(e) {
        console.error("Erro ao salvar:", e);
    }
}

console.log(`Importação concluída: ${count} imóveis adicionados com as informações reais!`);
