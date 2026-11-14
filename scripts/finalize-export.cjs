// Exported Next.js segment files use nested folders; provide the flat URLs requested by the router on static hosts.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve('out');let aliases=0;
function visit(folder){for(const entry of fs.readdirSync(folder,{withFileTypes:true})){const file=path.join(folder,entry.name);if(entry.isDirectory())visit(file);else if(entry.name.endsWith('.txt')){const rel=path.relative(root,file),parts=rel.split(path.sep);const index=parts.findIndex(p=>p.startsWith('__next.'));if(index>=0&&index<parts.length-1){const target=path.join(root,...parts.slice(0,index),parts.slice(index).join('.'));fs.copyFileSync(file,target);aliases++;}}}}
visit(root);console.log('Static router compatibility files: '+aliases);
