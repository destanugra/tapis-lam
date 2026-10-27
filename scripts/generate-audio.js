// scripts/generate-audio.js
// Generates high quality synthesized audio files for Remotion:
// 1. gamolan_music.wav (Lampung gamolan pekhing inspired melody, metallic resonance, gong, ambient drone)
// 2. sparkle_thread.wav (Sparkling golden shimmer chime for thread birth)
// 3. whoosh.wav (Deep cinematic whoosh for camera zoom and thread expansion)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicAudioDir = path.join(__dirname, '..', 'public', 'audio');

if (!fs.existsSync(publicAudioDir)) {
  fs.mkdirSync(publicAudioDir, { recursive: true });
}

// Function to write a stereo or mono 16-bit PCM WAV file
function writeWav(filePath, samplesL, samplesR, sampleRate = 44100) {
  const numChannels = samplesR ? 2 : 1;
  const numSamples = samplesL.length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // audio format (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // bits per sample

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const sL = Math.max(-1, Math.min(1, samplesL[i]));
    const valL = sL < 0 ? sL * 0x8000 : sL * 0x7FFF;
    buffer.writeInt16LE(Math.floor(valL), offset);
    offset += 2;

    if (numChannels === 2) {
      const sR = Math.max(-1, Math.min(1, samplesR[i]));
      const valR = sR < 0 ? sR * 0x8000 : sR * 0x7FFF;
      buffer.writeInt16LE(Math.floor(valR), offset);
      offset += 2;
    }
  }

  fs.writeFileSync(filePath, buffer);
  console.log(`Generated ${filePath} (${(dataSize / 1024).toFixed(1)} KB)`);
}

// 1. Generate Sparkle / Chime Sound (2.5 seconds)
function generateSparkle() {
  const sampleRate = 44100;
  const duration = 2.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  // High bell / crystalline frequencies (pentatonic Lampung Gamolan)
  const freqs = [1046.5, 1318.5, 1567.98, 2093.0, 2637.0, 3135.96];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let sL = 0;
    let sR = 0;

    // Series of staggered sparkles
    freqs.forEach((f, idx) => {
      const startTime = idx * 0.12;
      if (t >= startTime) {
        const dt = t - startTime;
        const env = Math.exp(-dt * 4.5); // fast decay bell
        const shimmer = 1 + 0.15 * Math.sin(2 * Math.PI * 18 * dt);
        const osc1 = Math.sin(2 * Math.PI * f * dt);
        const osc2 = 0.5 * Math.sin(2 * Math.PI * f * 2.01 * dt);
        const osc3 = 0.25 * Math.sin(2 * Math.PI * f * 3.03 * dt);
        const val = (osc1 + osc2 + osc3) * env * shimmer * 0.25;

        // Pan across stereo
        const pan = (idx / (freqs.length - 1)) * 0.8 - 0.4; // -0.4 to 0.4
        sL += val * (0.5 - pan * 0.5);
        sR += val * (0.5 + pan * 0.5);
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  writeWav(path.join(publicAudioDir, 'sparkle_thread.wav'), left, right, sampleRate);
}

// 2. Generate Whoosh / Camera Zoom Sound (2.0 seconds)
function generateWhoosh() {
  const sampleRate = 44100;
  const duration = 2.0;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  let b0 = 0, b1 = 0, b2 = 0; // simple IIR lowpass state

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    // Envelope rises to peak at 0.8s, then smoothly trails off
    const progress = t / duration;
    const env = Math.sin(progress * Math.PI) ** 2;

    // Filter sweep from 150Hz to 1800Hz and back
    const cutoff = 200 + 1600 * Math.sin(progress * Math.PI);
    const alpha = (2 * Math.PI * cutoff / sampleRate) / (1 + (2 * Math.PI * cutoff / sampleRate));

    // White noise source + low rumble
    const noise = (Math.random() * 2 - 1) * 0.7;
    const rumble = Math.sin(2 * Math.PI * (70 + progress * 80) * t) * 0.5;
    const source = noise + rumble;

    // 2-pole lowpass
    b0 += alpha * (source - b0);
    b1 += alpha * (b0 - b1);
    b2 += alpha * (b1 - b2);

    const val = b2 * env * 0.85;

    // Stereo spread
    left[i] = val * (0.8 + 0.2 * Math.sin(progress * Math.PI * 4));
    right[i] = val * (0.8 - 0.2 * Math.sin(progress * Math.PI * 4));
  }

  writeWav(path.join(publicAudioDir, 'whoosh.wav'), left, right, sampleRate);
}

// 3. Generate Gamolan Lampung Ambient Music (14 seconds for Scene 1)
function generateGamolanMusic() {
  const sampleRate = 44100;
  const duration = 14.0;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  // Gamolan Pekhing pentatonic scale frequencies (Lampung traditional brass/bamboo notes)
  // Approximate scale notes: D4 (293.66), E4 (329.63), G4 (392.00), A4 (440.00), B4 (493.88), D5 (587.33), E5 (659.25)
  const notes = {
    gong: 73.42, // D2 deep resonant gong
    kenong: 146.83, // D3
    d4: 293.66,
    e4: 329.63,
    g4: 392.0,
    a4: 440.0,
    b4: 493.88,
    d5: 587.33,
    e5: 659.25,
    g5: 783.99,
  };

  // Melody sequence: [timeInSeconds, noteName, intensity, pan]
  const pattern = [
    // Intro gong & opening tone
    [0.1, 'gong', 0.9, 0.0],
    [0.5, 'd4', 0.6, -0.2],
    [1.2, 'g4', 0.7, 0.2],
    [2.0, 'a4', 0.75, -0.1],
    [2.8, 'b4', 0.7, 0.3],
    [3.5, 'd5', 0.85, -0.3],

    // Measure 2: Weaving phrase
    [4.2, 'kenong', 0.7, 0.0],
    [4.5, 'g4', 0.75, 0.2],
    [5.0, 'a4', 0.7, -0.2],
    [5.5, 'd5', 0.85, 0.3],
    [6.0, 'e5', 0.9, -0.1],
    [6.6, 'b4', 0.75, 0.2],
    [7.2, 'g4', 0.8, -0.2],

    // Measure 3: Grand title reveal & Gong
    [8.0, 'gong', 1.0, 0.0],
    [8.0, 'd4', 0.7, -0.3],
    [8.5, 'g4', 0.8, 0.1],
    [9.0, 'a4', 0.85, -0.2],
    [9.5, 'd5', 0.95, 0.2],
    [10.0, 'e5', 0.9, -0.3],
    [10.5, 'g5', 0.85, 0.1],
    [11.2, 'd5', 0.8, -0.1],

    // Outro transition into Scene 2
    [12.0, 'kenong', 0.75, 0.0],
    [12.4, 'b4', 0.7, 0.2],
    [12.8, 'a4', 0.75, -0.2],
    [13.2, 'g4', 0.7, 0.1],
  ];

  // Synthesize each strike with metallic Gamolan overtones & exponential decay
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;

    // Ambient warm mystic drone underneath (D minor / D pentatonic warmth)
    const droneEnv = Math.min(1, t * 0.8) * Math.max(0, 1 - (t - 13.0) / 1.0);
    const drone = (
      Math.sin(2 * Math.PI * 146.83 * t) * 0.07 +
      Math.sin(2 * Math.PI * 220.0 * t) * 0.05 +
      Math.sin(2 * Math.PI * 293.66 * t) * 0.03
    ) * droneEnv;

    let sL = drone * 0.7;
    let sR = drone * 0.7;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        const isGong = noteName === 'gong';
        const isKenong = noteName === 'kenong';

        if (isGong) {
          // Deep gong: low fundamental, long decay (5.5s), rich subtle beating
          const decay = Math.exp(-dt * 0.6);
          const o1 = Math.sin(2 * Math.PI * f0 * dt);
          const o2 = 0.6 * Math.sin(2 * Math.PI * (f0 * 2.02) * dt);
          const o3 = 0.3 * Math.sin(2 * Math.PI * (f0 * 3.01) * dt);
          const o4 = 0.15 * Math.sin(2 * Math.PI * (f0 * 4.76) * dt);
          const gongVal = (o1 + o2 + o3 + o4) * decay * intensity * 0.45;
          sL += gongVal;
          sR += gongVal;
        } else if (isKenong) {
          // Kenong: warm kettle gong, medium decay
          const decay = Math.exp(-dt * 1.5);
          const o1 = Math.sin(2 * Math.PI * f0 * dt);
          const o2 = 0.5 * Math.sin(2 * Math.PI * (f0 * 2.24) * dt);
          const o3 = 0.2 * Math.sin(2 * Math.PI * (f0 * 3.82) * dt);
          const val = (o1 + o2 + o3) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          // Gamolan metallophone bar: sharp initial mallet transient, bright metallic harmonics
          const decay = Math.exp(-dt * 2.8);
          const mallet = Math.exp(-dt * 45) * 0.3 * (Math.random() * 2 - 1);
          // Non-harmonic metallic bar overtones: 1.0, 2.76, 5.4, 8.9
          const o1 = Math.sin(2 * Math.PI * f0 * dt);
          const o2 = 0.55 * Math.sin(2 * Math.PI * (f0 * 2.76) * dt) * Math.exp(-dt * 3.5);
          const o3 = 0.3 * Math.sin(2 * Math.PI * (f0 * 5.4) * dt) * Math.exp(-dt * 5.0);
          const o4 = 0.15 * Math.sin(2 * Math.PI * (f0 * 8.9) * dt) * Math.exp(-dt * 7.0);

          const barVal = (o1 + o2 + o3 + o4 + mallet) * decay * intensity * 0.28;

          // Stereo placement
          const pL = 0.5 * (1 - pan);
          const pR = 0.5 * (1 + pan);
          sL += barVal * pL;
          sR += barVal * pR;
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  writeWav(path.join(publicAudioDir, 'gamolan_music.wav'), left, right, sampleRate);
}

console.log('Generating audio assets...');
generateSparkle();
generateWhoosh();
generateGamolanMusic();
console.log('Audio generation completed successfully!');
