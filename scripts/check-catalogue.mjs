import {readFileSync} from 'node:fs';
const data=JSON.parse(readFileSync(new URL('../src/data/products.json',import.meta.url),'utf8'));
const seen=new Set();let errors=0;for(const p of data){if(seen.has(p.id)){console.error('Duplicate ID',p.id);errors++;}seen.add(p.id);if(!p.title||!p.category||!p.variants.length||!p.sku){console.error('Incomplete product',p);errors++;}}
console.log(`Catalogue: ${data.length} records, ${seen.size} unique IDs, ${new Set(data.map(p=>p.category)).size} categories, ${errors} validation errors.`);if(errors)process.exit(1);
