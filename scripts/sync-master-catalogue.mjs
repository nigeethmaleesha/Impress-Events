#!/usr/bin/env node
/**
 * Regenerate the PUBLIC web catalogue from docs/master-catalogue-demo.csv.
 * Deliberately EXCLUDES internal prices, provisional stock counts and notes
 * because the public Vercel preview must not expose internal rental prices.
 * Usage: node scripts/sync-master-catalogue.mjs [--check]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const master = path.join(root, 'docs/master-catalogue-demo.csv');
const output = path.join(root, 'src/data/products.json');
const REQUIRED = ['id','sku','source_sku','name','category','group','material','variants_json','description','image_path','featured','internal_rental_price_aud','stock_quantity','approval_notes'];
const publicProducts = JSON.parse(readFileSync(output,'utf8'));
const categories = new Set(publicProducts.map(p=>p.category));
function parseCsv(text) {
 const records=[];let row=[],field='',quoted=false;
 // Handle RFC4180 escaped double quotes and CRLF without third party libraries.
 for(let i=0;i<text.length;i++){
  const ch=text[i];
  if(quoted){if(ch==='"'&&text[i+1]==='"'){field+='"';i++;}else if(ch==='"')quoted=false;else field+=ch;}
  else if(ch==='"'){if(field!=='')throw Error('Unexpected quote in CSV');quoted=true;}
  else if(ch===','){row.push(field);field='';}
  else if(ch==='\n'){row.push(field.replace(/\r$/,''));if(row.some(x=>x.trim()))records.push(row);row=[];field='';}
  else field+=ch;
 }
 if(quoted)throw Error('CSV has an unclosed quoted field');
 if(field||row.length){row.push(field.replace(/\r$/,''));records.push(row);}
 return records;
}
const rows=parseCsv(readFileSync(master,'utf8').replace(/^\uFEFF/,''));
const headings=rows.shift();
if(!headings||REQUIRED.some(field=>!headings.includes(field)))throw Error('Missing columns: '+REQUIRED.filter(f=>!headings.includes(f)).join(', '));
const seenIds=new Set();const seenSku=new Set();
const originals=new Map(publicProducts.map(p=>[p.id,p]));
const newProducts=rows.map((cells,i)=>{
 if(cells.length!==headings.length)throw Error(`Row ${i+2}: wrong column count`);
 const row=Object.fromEntries(headings.map((h,index)=>[h,cells[index].trim()]));
 if(!row.id||!row.sku)throw Error(`Row ${i+2}: ID and SKU are required`);
 if(seenIds.has(row.id)||seenSku.has(row.sku))throw Error(`Row ${i+2}: duplicate ID or SKU ${row.id} / ${row.sku}`);
 seenIds.add(row.id);seenSku.add(row.sku);
 if(!categories.has(row.category))throw Error(`Row ${i+2}: unknown category ${row.category}`);
 if(!['true','false'].includes(row.featured))throw Error(`Row ${i+2}: featured must be true or false`);
 if(row.internal_rental_price_aud && (!Number.isFinite(Number(row.internal_rental_price_aud))||Number(row.internal_rental_price_aud)<0))throw Error(`Row ${i+2}: invalid internal rental price`);
 if(row.stock_quantity && (!Number.isSafeInteger(Number(row.stock_quantity))||Number(row.stock_quantity)<0))throw Error(`Row ${i+2}: invalid stock quantity`);
 let variants;
 try{variants=JSON.parse(row.variants_json)}catch{throw Error(`Row ${i+2}: variants_json is not valid JSON`)}
 if(!Array.isArray(variants)||variants.length===0||!variants.every(v=>typeof v==='string'&&v.trim()))throw Error(`Row ${i+2}: at least one variant required`);
 const previous=originals.get(row.id);
 if(!previous)throw Error(`Row ${i+2}: new IDs require manual review: ${row.id}`);
 // Never automatically overwrite the source provenance or expose internal values.
 return {...previous,id:row.id,sku:row.sku,sourceSku:row.source_sku,title:row.name,category:row.category,subcategory:row.group,fabric:row.material,variants,description:row.description,image:row.image_path,featured:row.featured==='true'};
});
if(newProducts.length!==publicProducts.length||seenIds.size!==originals.size)throw Error('Demo requires all original products; missing or extra rows');
const changed=newProducts.filter(p=>JSON.stringify(p)!==JSON.stringify(originals.get(p.id)));
if(process.argv.includes('--check')){
 console.log(`MASTER FILE OK — ${newProducts.length} products, ${changed.length} public records changed. Internal prices and stock stay private.`);
}else{
 writeFileSync(output,JSON.stringify(newProducts,null,2)+'\n','utf8');
 console.log(`Updated public catalogue (${newProducts.length} products). ${changed.length} records changed.`);
}
