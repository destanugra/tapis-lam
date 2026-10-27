// scripts/render-modular.js
// Render video scene-by-scene untuk menghindari Crash / Force Close (OOM Killer) pada video panjang.
// Setelah semua adegan selesai, script otomatis menggabungkannya via FFmpeg dalam hitungan detik.

import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const outScenesDir = path.join(rootDir, 'out', 'scenes');
const finalOutputFile = path.join(rootDir, 'out', 'GeometriTransformasiTapis_Lengkap.mp4');

if (!fs.existsSync(outScenesDir)) {
  fs.mkdirSync(outScenesDir, { recursive: true });
}

const SCENES = [
  { id: 'Scene01-Opening', file: 'scene01.mp4', title: 'Scene 01 - Opening' },
  { id: 'Scene02-MengenalTapis', file: 'scene02.mp4', title: 'Scene 02 - Mengenal Tapis' },
  { id: 'Scene03-PertanyaanPemantik', file: 'scene03.mp4', title: 'Scene 03 - Pertanyaan Pemantik' },
  { id: 'Scene04-TigaMotifKunci', file: 'scene04.mp4', title: 'Scene 04 - Tiga Motif Kunci' },
  { id: 'Scene05-Translasi', file: 'scene05.mp4', title: 'Scene 05 - Translasi' },
  { id: 'Scene06-Refleksi', file: 'scene06.mp4', title: 'Scene 06 - Refleksi' },
  { id: 'Scene07-Rotasi', file: 'scene07.mp4', title: 'Scene 07 - Rotasi' },
  { id: 'Scene08-Dilatasi', file: 'scene08.mp4', title: 'Scene 08 - Dilatasi' },
  { id: 'Scene09-RefleksiGeser', file: 'scene09.mp4', title: 'Scene 09 - Refleksi Geser' },
  { id: 'Scene10-Rangkuman', file: 'scene10.mp4', title: 'Scene 10 - Rangkuman' },
  { id: 'Scene11-TantanganPBL', file: 'scene11.mp4', title: 'Scene 11 - Tantangan PBL' },
  { id: 'Scene12-Penutup', file: 'scene12.mp4', title: 'Scene 12 - Penutup' },
];

console.log('=====================================================');
console.log('  REMOTION MODULAR RENDER (Anti-Crash / Anti-OOM)    ');
console.log('=====================================================');
console.log(`Total Adegan: ${SCENES.length}`);
console.log(`Output folder: ${outScenesDir}\n`);

const forceReRender = process.argv.includes('--force');

// 1. Render tiap scene
for (let i = 0; i < SCENES.length; i++) {
  const scene = SCENES[i];
  const targetFile = path.join(outScenesDir, scene.file);
  const exists = fs.existsSync(targetFile) && fs.statSync(targetFile).size > 10000;

  if (exists && !forceReRender) {
    console.log(`[${i + 1}/${SCENES.length}] SKIP: ${scene.title} (sudah dirender sebelumnya)`);
    continue;
  }

  console.log(`\n-----------------------------------------------------`);
  console.log(`[${i + 1}/${SCENES.length}] Merender: ${scene.title} (${scene.id})...`);
  console.log(`-----------------------------------------------------`);

  const renderArgs = [
    'remotion',
    'render',
    'src/index.ts',
    scene.id,
    targetFile,
    '--concurrency=1',
    '--image-format=jpeg',
    '--jpeg-quality=85',
    '--gl=angle',
  ];

  const result = spawnSync('npx', renderArgs, {
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' },
  });

  if (result.status !== 0) {
    console.error(`\n[ERROR] Gagal merender ${scene.title}. Render dihentikan.`);
    process.exit(1);
  }
}

// 2. Buat daftar concat untuk FFmpeg
console.log('\n=====================================================');
console.log('  Semua adegan selesai dirender! Menggabungkan video...');
console.log('=====================================================');

const concatListPath = path.join(outScenesDir, 'concat_list.txt');
const concatContent = SCENES.map((s) => `file '${s.file}'`).join('\n');
fs.writeFileSync(concatListPath, concatContent, 'utf-8');

// 3. Gabungkan dengan ffmpeg concat (stream copy - instan & tanpa penurunan kualitas)
try {
  const ffmpegCmd = `ffmpeg -y -f concat -safe 0 -i "${concatListPath}" -c copy "${finalOutputFile}"`;
  execSync(ffmpegCmd, { stdio: 'inherit' });
  console.log(`\n🎉 SUKSES BESAR! Video lengkap berhasil digabung ke:\n${finalOutputFile}\n`);
} catch (err) {
  console.error('\nGagal menjalankan ffmpeg concat otomatis. Anda bisa menggabungkan manual dengan:');
  console.log(`cd out/scenes && ffmpeg -f concat -safe 0 -i concat_list.txt -c copy ../GeometriTransformasiTapis_Lengkap.mp4`);
}
