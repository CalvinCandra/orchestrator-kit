#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceAgentsDir = path.resolve(__dirname, '..', '.agents');
const targetDir = process.cwd();
const targetAgentsDir = path.join(targetDir, '.agents');

if (!fs.existsSync(sourceAgentsDir)) {
  console.error('❌ Error: Folder sumber .agents/ tidak ditemukan di dalam paket.');
  process.exit(1);
}

if (path.resolve(sourceAgentsDir) === path.resolve(targetAgentsDir)) {
  console.log('ℹ️  Kamu sedang berada di dalam repository orchestrator-kit itu sendiri.');
  console.log('   Jalankan perintah ini di dalam folder project tujuanmu.');
  process.exit(0);
}

console.log('\n🚀 Menginstal Orchestrator Kit (.agents/) ke:', targetDir);

// 1. Salin agents, rules, dan skills (selalu update ke versi terbaru)
const coreFolders = ['agents', 'rules', 'skills'];
for (const folder of coreFolders) {
  const src = path.join(sourceAgentsDir, folder);
  const dest = path.join(targetAgentsDir, folder);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true, force: true });
    console.log(`  ✔ .agents/${folder}/ berhasil dipasang/diperbarui.`);
  }
}

// 2. Buat .agents/docs/ secara aman (JANGAN timpa PRD.md, PROGRESS.md, API_SPEC.md, SCHEMA.md yang sudah ada!)
const srcDocs = path.join(sourceAgentsDir, 'docs');
const destDocs = path.join(targetAgentsDir, 'docs');
fs.mkdirSync(destDocs, { recursive: true });

if (fs.existsSync(srcDocs)) {
  for (const item of fs.readdirSync(srcDocs)) {
    const srcItem = path.join(srcDocs, item);
    const destItem = path.join(destDocs, item);
    if (!fs.existsSync(destItem)) {
      fs.cpSync(srcItem, destItem, { recursive: true });
    }
  }
}
console.log('  ✔ .agents/docs/ siap (dokumen kerja yang sudah ada tetap aman tidak tertimpa).');

console.log('\n✅ Selesai! Orchestrator Kit siap dipakai di Antigravity.');
console.log('   Ketik di chat Antigravity:');
console.log('   • /prd <ide aplikasi>   -> Merancang PRD.md dari nol/project yang ada');
console.log('   • /pm <tugas / fitur>   -> Menjalankan sub-agent paralel (database, be, fe, qa, security)');
console.log('   • /solo <tugas kecil>   -> Mengerjakan langsung tanpa PM\n');
