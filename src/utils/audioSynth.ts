// src/utils/audioSynth.ts
// Pure in-memory WAV audio synthesis for Remotion
// Works universally in both browser (Remotion Studio) and Node.js (Remotion Render).

function encodeWavBase64(samplesL: Float32Array, samplesR: Float32Array, sampleRate = 22050): string {
  const numChannels = 2;
  const numSamples = samplesL.length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const totalSize = 44 + dataSize;
  const buffer = new Uint8Array(totalSize);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      buffer[offset + i] = str.charCodeAt(i);
    }
  };

  const writeUint32 = (offset: number, val: number) => {
    buffer[offset] = val & 0xff;
    buffer[offset + 1] = (val >> 8) & 0xff;
    buffer[offset + 2] = (val >> 16) & 0xff;
    buffer[offset + 3] = (val >> 24) & 0xff;
  };

  const writeUint16 = (offset: number, val: number) => {
    buffer[offset] = val & 0xff;
    buffer[offset + 1] = (val >> 8) & 0xff;
  };

  // RIFF header
  writeString(0, "RIFF");
  writeUint32(4, 36 + dataSize);
  writeString(8, "WAVE");

  // fmt chunk
  writeString(12, "fmt ");
  writeUint32(16, 16);
  writeUint16(20, 1);
  writeUint16(22, numChannels);
  writeUint32(24, sampleRate);
  writeUint32(28, byteRate);
  writeUint16(32, blockAlign);
  writeUint16(34, 16);

  // data chunk
  writeString(36, "data");
  writeUint32(40, dataSize);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const sL = Math.max(-1, Math.min(1, samplesL[i]));
    const vL = sL < 0 ? sL * 0x8000 : sL * 0x7fff;
    const intL = Math.floor(vL);
    buffer[offset] = intL & 0xff;
    buffer[offset + 1] = (intL >> 8) & 0xff;
    offset += 2;

    const sR = Math.max(-1, Math.min(1, samplesR[i]));
    const vR = sR < 0 ? sR * 0x8000 : sR * 0x7fff;
    const intR = Math.floor(vR);
    buffer[offset] = intR & 0xff;
    buffer[offset + 1] = (intR >> 8) & 0xff;
    offset += 2;
  }

  let base64String = "";
  if (typeof Buffer !== "undefined") {
    base64String = Buffer.from(buffer).toString("base64");
  } else {
    let binary = "";
    const len = buffer.byteLength;
    const chunkSize = 4096;
    for (let i = 0; i < len; i += chunkSize) {
      const chunk = buffer.subarray(i, Math.min(i + chunkSize, len));
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    base64String = btoa(binary);
  }

  return "data:audio/wav;base64," + base64String;
}

// Cached data URIs
let cachedGamolanUri: string | null = null;
let cachedGamolanScene2Uri: string | null = null;
let cachedGamolanScene3Uri: string | null = null;
let cachedGamolanScene4Uri: string | null = null;
let cachedGamolanScene5Uri: string | null = null;
let cachedGamolanScene6Uri: string | null = null;
let cachedGamolanScene7Uri: string | null = null;
let cachedGamolanScene8Uri: string | null = null;
let cachedGamolanScene9Uri: string | null = null;
let cachedGamolanScene10Uri: string | null = null;
let cachedGamolanScene11Uri: string | null = null;
let cachedGamolanScene12Uri: string | null = null;
let cachedSparkleUri: string | null = null;
let cachedWhooshUri: string | null = null;
let cachedStitchUri: string | null = null;

// Gamolan scale frequencies
const notes: Record<string, number> = {
  gong: 73.42,
  kenong: 146.83,
  d4: 293.66,
  e4: 329.63,
  g4: 392.0,
  a4: 440.0,
  b4: 493.88,
  d5: 587.33,
  e5: 659.25,
  g5: 783.99,
};

export function getGamolanAudioUri(): string {
  if (cachedGamolanUri) return cachedGamolanUri;

  const sampleRate = 22050;
  const duration = 13.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  const pattern: Array<[number, string, number, number]> = [
    [0.1, "gong", 0.9, 0.0],
    [0.6, "d4", 0.6, -0.2],
    [1.3, "g4", 0.7, 0.2],
    [2.1, "a4", 0.75, -0.1],
    [2.9, "b4", 0.7, 0.3],
    [3.7, "d5", 0.85, -0.3],
    [4.5, "kenong", 0.7, 0.0],
    [4.9, "g4", 0.75, 0.2],
    [5.4, "a4", 0.7, -0.2],
    [5.9, "d5", 0.85, 0.3],
    [6.5, "e5", 0.9, -0.1],
    [7.1, "b4", 0.75, 0.2],
    [7.7, "g4", 0.8, -0.2],
    [8.4, "gong", 1.0, 0.0],
    [8.6, "d4", 0.7, -0.3],
    [9.1, "g4", 0.8, 0.1],
    [9.7, "a4", 0.85, -0.2],
    [10.2, "d5", 0.95, 0.2],
    [10.8, "e5", 0.9, -0.3],
    [11.4, "g5", 0.85, 0.1],
    [12.0, "kenong", 0.75, 0.0],
    [12.4, "b4", 0.7, 0.2],
    [12.8, "a4", 0.75, -0.2],
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const drone = Math.sin(2 * Math.PI * 146.83 * t) * 0.06 + Math.sin(2 * Math.PI * 220.0 * t) * 0.04;
    let sL = drone;
    let sR = drone;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        if (noteName === "gong") {
          const decay = Math.exp(-dt * 0.55);
          const gongVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.6 * Math.sin(2 * Math.PI * f0 * 2.02 * dt)) * decay * intensity * 0.4;
          sL += gongVal;
          sR += gongVal;
        } else if (noteName === "kenong") {
          const decay = Math.exp(-dt * 1.5);
          const val = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.24 * dt)) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          const decay = Math.exp(-dt * 3.0);
          const barVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.76 * dt) * Math.exp(-dt * 3.5)) * decay * intensity * 0.26;
          sL += barVal * 0.5 * (1 - pan);
          sR += barVal * 0.5 * (1 + pan);
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedGamolanUri = encodeWavBase64(left, right, sampleRate);
  return cachedGamolanUri;
}

export function getGamolanScene2Uri(): string {
  if (cachedGamolanScene2Uri) return cachedGamolanScene2Uri;

  const sampleRate = 22050;
  const duration = 25.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  const pattern: Array<[number, string, number, number]> = [
    [0.1, "gong", 0.95, 0.0],
    [0.7, "d4", 0.65, -0.2],
    [1.4, "g4", 0.7, 0.2],
    [2.1, "a4", 0.75, -0.1],
    [2.8, "d5", 0.85, 0.2],
    [3.5, "b4", 0.7, -0.2],
    [4.2, "a4", 0.75, 0.1],
    [4.9, "g4", 0.8, -0.1],
    [5.6, "d4", 0.65, 0.2],
    [6.2, "kenong", 0.8, 0.0],
    [6.8, "g4", 0.75, -0.2],
    [7.4, "a4", 0.8, 0.2],
    [8.0, "d5", 0.9, -0.1],
    [8.7, "e5", 0.9, 0.2],
    [9.4, "g5", 0.85, -0.2],
    [10.1, "d5", 0.8, 0.1],
    [10.8, "b4", 0.75, -0.2],
    [11.5, "a4", 0.8, 0.2],
    [12.3, "g4", 0.75, 0.0],
    [13.0, "gong", 1.0, 0.0],
    [13.6, "d4", 0.7, -0.2],
    [14.2, "g4", 0.75, 0.2],
    [14.8, "a4", 0.8, -0.1],
    [15.5, "b4", 0.75, 0.2],
    [16.2, "d5", 0.9, -0.2],
    [16.9, "a4", 0.8, 0.1],
    [17.6, "g4", 0.75, -0.1],
    [18.5, "kenong", 0.85, 0.0],
    [19.1, "g4", 0.8, 0.2],
    [19.7, "a4", 0.85, -0.2],
    [20.3, "d5", 0.95, 0.2],
    [21.0, "e5", 0.9, -0.2],
    [21.7, "g5", 0.85, 0.1],
    [22.4, "d5", 0.8, -0.1],
    [23.1, "b4", 0.75, 0.2],
    [23.8, "a4", 0.7, -0.2],
    [24.5, "g4", 0.65, 0.0],
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const drone = (Math.sin(2 * Math.PI * 146.83 * t) * 0.06 + Math.sin(2 * Math.PI * 220.0 * t) * 0.04) * Math.min(1, t * 0.5);
    let sL = drone;
    let sR = drone;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        if (noteName === "gong") {
          const decay = Math.exp(-dt * 0.5);
          const gongVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.6 * Math.sin(2 * Math.PI * f0 * 2.02 * dt)) * decay * intensity * 0.42;
          sL += gongVal;
          sR += gongVal;
        } else if (noteName === "kenong") {
          const decay = Math.exp(-dt * 1.4);
          const val = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.24 * dt)) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          const decay = Math.exp(-dt * 2.8);
          const barVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.76 * dt) * Math.exp(-dt * 3.5)) * decay * intensity * 0.25;
          sL += barVal * 0.5 * (1 - pan);
          sR += barVal * 0.5 * (1 + pan);
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedGamolanScene2Uri = encodeWavBase64(left, right, sampleRate);
  return cachedGamolanScene2Uri;
}

export function getGamolanScene3Uri(): string {
  if (cachedGamolanScene3Uri) return cachedGamolanScene3Uri;

  const sampleRate = 22050;
  const duration = 14.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  const pattern: Array<[number, string, number, number]> = [
    [0.1, "kenong", 0.8, 0.0],
    [0.6, "a4", 0.65, -0.2],
    [1.4, "d5", 0.75, 0.2],
    [2.3, "b4", 0.7, -0.1],
    [3.2, "g4", 0.75, 0.2],
    [4.1, "e4", 0.65, -0.2],
    [5.0, "d4", 0.7, 0.1],
    [6.0, "a4", 0.75, -0.1],
    [7.4, "gong", 1.0, 0.0],
    [7.8, "d4", 0.75, -0.2],
    [8.4, "g4", 0.8, 0.2],
    [9.0, "a4", 0.85, -0.1],
    [9.6, "d5", 0.95, 0.2],
    [10.3, "e5", 0.95, -0.2],
    [11.0, "g5", 0.9, 0.1],
    [11.8, "d5", 0.85, -0.1],
    [12.6, "kenong", 0.8, 0.0],
    [13.2, "a4", 0.7, 0.1],
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const drone = (Math.sin(2 * Math.PI * 146.83 * t) * 0.05 + Math.sin(2 * Math.PI * 220.0 * t) * 0.035);
    let sL = drone;
    let sR = drone;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        if (noteName === "gong") {
          const decay = Math.exp(-dt * 0.5);
          const gongVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.6 * Math.sin(2 * Math.PI * f0 * 2.02 * dt)) * decay * intensity * 0.42;
          sL += gongVal;
          sR += gongVal;
        } else if (noteName === "kenong") {
          const decay = Math.exp(-dt * 1.5);
          const val = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.24 * dt)) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          const decay = Math.exp(-dt * 2.8);
          const barVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.76 * dt) * Math.exp(-dt * 3.5)) * decay * intensity * 0.26;
          sL += barVal * 0.5 * (1 - pan);
          sR += barVal * 0.5 * (1 + pan);
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedGamolanScene3Uri = encodeWavBase64(left, right, sampleRate);
  return cachedGamolanScene3Uri;
}

export function getGamolanScene4Uri(): string {
  if (cachedGamolanScene4Uri) return cachedGamolanScene4Uri;

  const sampleRate = 22050;
  const duration = 20.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  const pattern: Array<[number, string, number, number]> = [
    [0.1, "gong", 0.95, 0.0],
    [0.6, "d4", 0.65, -0.2],
    [1.3, "g4", 0.75, 0.2],
    [2.1, "a4", 0.8, -0.1],
    [2.9, "d5", 0.85, 0.2],
    [3.7, "e5", 0.9, -0.2],
    [4.6, "b4", 0.75, 0.1],
    [5.4, "g4", 0.7, -0.1],
    [6.3, "kenong", 0.85, 0.0],
    [6.9, "e4", 0.7, 0.2],
    [7.6, "g4", 0.75, -0.2],
    [8.4, "b4", 0.8, 0.2],
    [9.2, "d5", 0.9, -0.1],
    [10.0, "e5", 0.9, 0.2],
    [10.8, "b4", 0.8, -0.2],
    [11.6, "a4", 0.75, 0.1],
    [12.4, "gong", 1.0, 0.0],
    [13.0, "d5", 0.85, -0.2],
    [13.7, "g5", 0.95, 0.2],
    [14.5, "e5", 0.9, -0.1],
    [15.3, "d5", 0.85, 0.2],
    [16.1, "b4", 0.8, -0.2],
    [16.9, "a4", 0.8, 0.1],
    [17.6, "g4", 0.75, -0.1],
    [18.4, "kenong", 0.85, 0.0],
    [18.9, "d4", 0.7, -0.2],
    [19.4, "g4", 0.75, 0.2],
    [19.9, "d5", 0.85, 0.0],
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const drone = (Math.sin(2 * Math.PI * 146.83 * t) * 0.05 + Math.sin(2 * Math.PI * 220.0 * t) * 0.035);
    let sL = drone;
    let sR = drone;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        if (noteName === "gong") {
          const decay = Math.exp(-dt * 0.5);
          const gongVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.6 * Math.sin(2 * Math.PI * f0 * 2.02 * dt)) * decay * intensity * 0.42;
          sL += gongVal;
          sR += gongVal;
        } else if (noteName === "kenong") {
          const decay = Math.exp(-dt * 1.4);
          const val = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.24 * dt)) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          const decay = Math.exp(-dt * 2.8);
          const barVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.76 * dt) * Math.exp(-dt * 3.5)) * decay * intensity * 0.25;
          sL += barVal * 0.5 * (1 - pan);
          sR += barVal * 0.5 * (1 + pan);
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedGamolanScene4Uri = encodeWavBase64(left, right, sampleRate);
  return cachedGamolanScene4Uri;
}

// Scene 5: Dedicated Translational Geometry Track (35.5 seconds)
export function getGamolanScene5Uri(): string {
  if (cachedGamolanScene5Uri) return cachedGamolanScene5Uri;

  const sampleRate = 22050;
  const duration = 35.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  const pattern: Array<[number, string, number, number]> = [
    // Intro translasi motif (0s - 7s)
    [0.1, "gong", 0.95, 0.0],
    [0.8, "d4", 0.7, -0.2],
    [1.6, "g4", 0.75, 0.2],
    [2.4, "a4", 0.8, -0.1],
    [3.2, "d5", 0.85, 0.2],
    [4.0, "b4", 0.75, -0.2],
    [4.8, "g4", 0.75, 0.1],
    [5.6, "d4", 0.7, -0.1],
    [6.4, "a4", 0.75, 0.2],

    // Vector v=(5,0) displacement (7.5s - 16s)
    [7.5, "kenong", 0.85, 0.0],
    [8.2, "d4", 0.75, -0.2],
    [9.0, "g4", 0.8, 0.2],
    [9.8, "a4", 0.85, -0.1],
    [10.6, "d5", 0.9, 0.2],
    [11.5, "e5", 0.95, -0.2],
    [12.4, "g5", 0.9, 0.1],
    [13.3, "d5", 0.85, -0.1],
    [14.2, "b4", 0.8, 0.2],
    [15.1, "a4", 0.75, -0.2],

    // Repetition & Pucuk Rebung row (16.5s - 25s)
    [16.5, "gong", 1.0, 0.0],
    [17.3, "d4", 0.75, -0.2],
    [18.1, "g4", 0.8, 0.2],
    [18.9, "a4", 0.85, -0.1],
    [19.7, "d5", 0.9, 0.2],
    [20.5, "e5", 0.9, -0.2],
    [21.4, "b4", 0.8, 0.1],
    [22.2, "a4", 0.8, -0.2],
    [23.1, "g4", 0.75, 0.1],
    [24.0, "d4", 0.7, -0.1],

    // Invariance & Vector Length (25.5s - 32s)
    [25.5, "kenong", 0.85, 0.0],
    [26.3, "g4", 0.8, 0.2],
    [27.1, "a4", 0.85, -0.2],
    [28.0, "d5", 0.9, 0.2],
    [28.9, "e5", 0.95, -0.2],
    [29.8, "d5", 0.85, 0.1],
    [30.7, "b4", 0.8, -0.1],
    [31.6, "a4", 0.75, 0.2],

    // Transition into mirror axis (32.5s - 35.5s)
    [32.8, "gong", 1.0, 0.0],
    [33.5, "d4", 0.75, -0.2],
    [34.2, "a4", 0.8, 0.2],
    [34.9, "d5", 0.85, 0.0],
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const drone = (Math.sin(2 * Math.PI * 146.83 * t) * 0.06 + Math.sin(2 * Math.PI * 220.0 * t) * 0.04) * Math.min(1, t * 0.5);
    let sL = drone;
    let sR = drone;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        if (noteName === "gong") {
          const decay = Math.exp(-dt * 0.5);
          const gongVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.6 * Math.sin(2 * Math.PI * f0 * 2.02 * dt)) * decay * intensity * 0.42;
          sL += gongVal;
          sR += gongVal;
        } else if (noteName === "kenong") {
          const decay = Math.exp(-dt * 1.4);
          const val = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.24 * dt)) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          const decay = Math.exp(-dt * 2.8);
          const barVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.76 * dt) * Math.exp(-dt * 3.5)) * decay * intensity * 0.25;
          sL += barVal * 0.5 * (1 - pan);
          sR += barVal * 0.5 * (1 + pan);
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedGamolanScene5Uri = encodeWavBase64(left, right, sampleRate);
  return cachedGamolanScene5Uri;
}

// Scene 6: Dedicated Reflection / Symmetrical Geometry Track (31.5 seconds)
export function getGamolanScene6Uri(): string {
  if (cachedGamolanScene6Uri) return cachedGamolanScene6Uri;

  const sampleRate = 22050;
  const duration = 31.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  // Symmetrical stereo echo pairs (left note followed by right reflection)
  const pattern: Array<[number, string, number, number]> = [
    // 0s - 7s: Half motif & Orange mirror axis appearance
    [0.1, "gong", 1.0, 0.0],
    [0.8, "d4", 0.7, -0.4],
    [1.2, "d4", 0.65, 0.4], // reflection response
    [2.0, "g4", 0.75, -0.3],
    [2.4, "g4", 0.7, 0.3],
    [3.2, "a4", 0.8, -0.35],
    [3.6, "a4", 0.75, 0.35],
    [4.6, "kenong", 0.85, 0.0],
    [5.4, "b4", 0.8, -0.3],
    [5.8, "b4", 0.75, 0.3],

    // 7s - 16s: Point P(x,y) -> P'(-x,y) displacement and equal distance
    [7.2, "gong", 0.95, 0.0],
    [8.0, "d5", 0.85, -0.4],
    [8.5, "d5", 0.8, 0.4],
    [9.5, "e5", 0.9, -0.3],
    [10.0, "e5", 0.85, 0.3],
    [11.0, "g5", 0.9, 0.0],
    [12.2, "kenong", 0.85, 0.0],
    [13.0, "d5", 0.85, -0.3],
    [13.5, "d5", 0.8, 0.3],
    [14.6, "b4", 0.75, -0.3],
    [15.1, "b4", 0.7, 0.3],

    // 16s - 24s: Gradual mirror formation of tree of life (pohon hayat)
    [16.2, "gong", 1.0, 0.0],
    [17.0, "g4", 0.75, -0.2],
    [17.4, "g4", 0.75, 0.2],
    [18.3, "a4", 0.8, -0.3],
    [18.7, "a4", 0.8, 0.3],
    [19.6, "d5", 0.85, -0.2],
    [20.0, "d5", 0.85, 0.2],
    [21.0, "e5", 0.9, -0.3],
    [21.5, "e5", 0.9, 0.3],
    [22.6, "g5", 0.9, 0.0],
    [23.5, "kenong", 0.85, 0.0],

    // 24s - 28s: Invariance of size, inverted orientation, axis of symmetry
    [24.5, "d5", 0.8, -0.3],
    [24.9, "d5", 0.8, 0.3],
    [25.8, "b4", 0.75, -0.2],
    [26.2, "b4", 0.75, 0.2],
    [27.0, "a4", 0.7, 0.0],
    [27.8, "g4", 0.75, 0.0],

    // 28s - 31.5s: Transition: mirror line fades into circular halo around origin O
    [28.8, "gong", 1.0, 0.0],
    [29.5, "d4", 0.7, -0.2],
    [29.9, "d4", 0.7, 0.2],
    [30.6, "a4", 0.75, 0.0],
    [31.1, "d5", 0.8, 0.0],
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const drone = (Math.sin(2 * Math.PI * 146.83 * t) * 0.06 + Math.sin(2 * Math.PI * 220.0 * t) * 0.04) * Math.min(1, t * 0.5);
    let sL = drone;
    let sR = drone;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        if (noteName === "gong") {
          const decay = Math.exp(-dt * 0.5);
          const gongVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.6 * Math.sin(2 * Math.PI * f0 * 2.02 * dt)) * decay * intensity * 0.42;
          sL += gongVal;
          sR += gongVal;
        } else if (noteName === "kenong") {
          const decay = Math.exp(-dt * 1.4);
          const val = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.24 * dt)) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          const decay = Math.exp(-dt * 2.8);
          const barVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.76 * dt) * Math.exp(-dt * 3.5)) * decay * intensity * 0.25;
          sL += barVal * 0.5 * (1 - pan);
          sR += barVal * 0.5 * (1 + pan);
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedGamolanScene6Uri = encodeWavBase64(left, right, sampleRate);
  return cachedGamolanScene6Uri;
}

// Scene 7: Dedicated Rotational Geometry Track (26.5 seconds)
export function getGamolanScene7Uri(): string {
  if (cachedGamolanScene7Uri) return cachedGamolanScene7Uri;

  const sampleRate = 22050;
  const duration = 26.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  // 8-beat cyclical rotational patterns simulating the 8 petals
  const pattern: Array<[number, string, number, number]> = [
    // Intro & Single Petal at O(0,0) (0s - 6s)
    [0.1, "gong", 1.0, 0.0],
    [0.8, "d4", 0.7, -0.2],
    [1.6, "g4", 0.75, 0.2],
    [2.5, "a4", 0.8, -0.1],
    [3.4, "d5", 0.85, 0.2],
    [4.4, "kenong", 0.85, 0.0],
    [5.2, "b4", 0.75, -0.2],

    // 8 Petal Rotations: 45 deg intervals (6s - 18s)
    [6.2, "g4", 0.75, -0.4],  // Petal 1 (0 deg)
    [7.5, "a4", 0.8, -0.3],   // Petal 2 (45 deg)
    [8.8, "b4", 0.8, -0.1],   // Petal 3 (90 deg)
    [10.1, "d5", 0.85, 0.1],  // Petal 4 (135 deg)
    [11.5, "e5", 0.9, 0.3],   // Petal 5 (180 deg)
    [12.8, "g5", 0.95, 0.4],  // Petal 6 (225 deg)
    [14.1, "d5", 0.85, 0.2],  // Petal 7 (270 deg)
    [15.4, "b4", 0.8, -0.1],  // Petal 8 (315 deg) -> Full 360 deg!
    [16.8, "gong", 1.0, 0.0], // Full rosette bloom!

    // Order-8 Symmetry & Invariance (18s - 23s)
    [17.8, "d4", 0.75, -0.2],
    [18.7, "g4", 0.8, 0.2],
    [19.6, "a4", 0.85, -0.1],
    [20.5, "d5", 0.9, 0.2],
    [21.5, "e5", 0.9, -0.2],
    [22.5, "kenong", 0.85, 0.0],

    // Transition to Center Shrink (23.5s - 26.5s)
    [23.5, "b4", 0.8, 0.1],
    [24.5, "a4", 0.75, -0.1],
    [25.5, "g4", 0.7, 0.0],
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const drone = (Math.sin(2 * Math.PI * 146.83 * t) * 0.06 + Math.sin(2 * Math.PI * 220.0 * t) * 0.04) * Math.min(1, t * 0.5);
    let sL = drone;
    let sR = drone;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        if (noteName === "gong") {
          const decay = Math.exp(-dt * 0.5);
          const gongVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.6 * Math.sin(2 * Math.PI * f0 * 2.02 * dt)) * decay * intensity * 0.42;
          sL += gongVal;
          sR += gongVal;
        } else if (noteName === "kenong") {
          const decay = Math.exp(-dt * 1.4);
          const val = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.24 * dt)) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          const decay = Math.exp(-dt * 2.8);
          const barVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.76 * dt) * Math.exp(-dt * 3.5)) * decay * intensity * 0.25;
          sL += barVal * 0.5 * (1 - pan);
          sR += barVal * 0.5 * (1 + pan);
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedGamolanScene7Uri = encodeWavBase64(left, right, sampleRate);
  return cachedGamolanScene7Uri;
}

// Scene 8: Dedicated Dilation Track (30.5 seconds)
export function getGamolanScene8Uri(): string {
  if (cachedGamolanScene8Uri) return cachedGamolanScene8Uri;

  const sampleRate = 22050;
  const duration = 30.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  const pattern: Array<[number, string, number, number]> = [
    // Initial Rhombus & Point P(0,4) (0s - 7s)
    [0.1, "gong", 1.0, 0.0],
    [0.8, "d4", 0.7, -0.2],
    [1.7, "g4", 0.75, 0.2],
    [2.6, "a4", 0.8, -0.1],
    [3.5, "d5", 0.85, 0.2],
    [4.6, "kenong", 0.85, 0.0],
    [5.5, "b4", 0.8, -0.2],
    [6.5, "a4", 0.75, 0.1],

    // Dilation scaling k = 0.75 step 1 (7.5s - 15s)
    [7.5, "gong", 0.95, 0.0],
    [8.4, "e5", 0.9, -0.2],
    [9.4, "d5", 0.85, 0.2],
    [10.4, "b4", 0.8, -0.1],
    [11.5, "a4", 0.75, 0.2],
    [12.6, "kenong", 0.85, 0.0],
    [13.6, "g4", 0.8, -0.2],
    [14.6, "d4", 0.7, 0.1],

    // Nested layers k = 0.75^2 and k = 0.75^3 (15.5s - 23s)
    [15.5, "gong", 1.0, 0.0],
    [16.4, "g5", 0.95, 0.2],
    [17.3, "e5", 0.9, -0.2],
    [18.3, "d5", 0.85, 0.1],
    [19.3, "b4", 0.8, -0.2],
    [20.3, "kenong", 0.85, 0.0],
    [21.3, "a4", 0.8, 0.2],
    [22.3, "g4", 0.75, -0.1],

    // Formula & Area scaling k^2 (23.5s - 27s)
    [23.5, "d5", 0.85, 0.2],
    [24.5, "e5", 0.9, -0.2],
    [25.5, "d5", 0.85, 0.1],
    [26.5, "b4", 0.75, -0.1],

    // Transition to alternating pucuk rebung (27.5s - 30.5s)
    [27.5, "gong", 1.0, 0.0],
    [28.4, "d4", 0.75, -0.2],
    [29.3, "a4", 0.8, 0.2],
    [30.0, "d5", 0.85, 0.0],
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const drone = (Math.sin(2 * Math.PI * 146.83 * t) * 0.06 + Math.sin(2 * Math.PI * 220.0 * t) * 0.04) * Math.min(1, t * 0.5);
    let sL = drone;
    let sR = drone;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        if (noteName === "gong") {
          const decay = Math.exp(-dt * 0.5);
          const gongVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.6 * Math.sin(2 * Math.PI * f0 * 2.02 * dt)) * decay * intensity * 0.42;
          sL += gongVal;
          sR += gongVal;
        } else if (noteName === "kenong") {
          const decay = Math.exp(-dt * 1.4);
          const val = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.24 * dt)) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          const decay = Math.exp(-dt * 2.8);
          const barVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.76 * dt) * Math.exp(-dt * 3.5)) * decay * intensity * 0.25;
          sL += barVal * 0.5 * (1 - pan);
          sR += barVal * 0.5 * (1 + pan);
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedGamolanScene8Uri = encodeWavBase64(left, right, sampleRate);
  return cachedGamolanScene8Uri;
}

// Scene 9: Dedicated Glide Reflection Track (32.5 seconds)
export function getGamolanScene9Uri(): string {
  if (cachedGamolanScene9Uri) return cachedGamolanScene9Uri;

  const sampleRate = 22050;
  const duration = 32.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  // Stepped alternating cadence: Refleksi (left) then Translasi (right)
  const pattern: Array<[number, string, number, number]> = [
    [0.1, "gong", 1.0, 0.0],
    [0.8, "d4", 0.7, -0.3],
    [1.6, "g4", 0.75, 0.3],
    [2.5, "a4", 0.8, -0.2],
    [3.4, "d5", 0.85, 0.2],
    [4.4, "kenong", 0.85, 0.0],

    // Sequential Transformation 1: Refleksi across midline (5s - 12s)
    [5.4, "d4", 0.75, -0.4],
    [6.4, "d4", 0.75, 0.4], // reflection mirror response
    [7.5, "g4", 0.8, -0.3],
    [8.5, "g4", 0.8, 0.3],
    [9.6, "a4", 0.85, -0.2],
    [10.8, "d5", 0.9, 0.2],
    [12.0, "kenong", 0.85, 0.0],

    // Sequential Transformation 2: Translasi along midline (12.5s - 20s)
    [12.8, "d4", 0.75, 0.3],
    [13.8, "g4", 0.8, 0.3],
    [14.8, "a4", 0.85, 0.2],
    [15.8, "d5", 0.9, 0.2],
    [16.8, "e5", 0.95, -0.2],
    [17.8, "g5", 0.9, 0.0],
    [18.8, "d5", 0.85, -0.2],
    [20.0, "gong", 1.0, 0.0],

    // Frieze Pattern & 7 Types (20.5s - 28s)
    [21.0, "d4", 0.75, -0.3],
    [22.0, "g4", 0.8, 0.3],
    [23.0, "a4", 0.85, -0.2],
    [24.0, "d5", 0.9, 0.2],
    [25.2, "e5", 0.95, -0.2],
    [26.4, "b4", 0.8, 0.2],
    [27.6, "kenong", 0.85, 0.0],

    // Outro transition into 4 panels (28.5s - 32.5s)
    [28.8, "d4", 0.75, -0.2],
    [29.8, "g4", 0.8, 0.2],
    [30.8, "a4", 0.8, 0.0],
    [31.8, "d5", 0.85, 0.0],
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const drone = (Math.sin(2 * Math.PI * 146.83 * t) * 0.06 + Math.sin(2 * Math.PI * 220.0 * t) * 0.04) * Math.min(1, t * 0.5);
    let sL = drone;
    let sR = drone;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        if (noteName === "gong") {
          const decay = Math.exp(-dt * 0.5);
          const gongVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.6 * Math.sin(2 * Math.PI * f0 * 2.02 * dt)) * decay * intensity * 0.42;
          sL += gongVal;
          sR += gongVal;
        } else if (noteName === "kenong") {
          const decay = Math.exp(-dt * 1.4);
          const val = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.24 * dt)) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          const decay = Math.exp(-dt * 2.8);
          const barVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.76 * dt) * Math.exp(-dt * 3.5)) * decay * intensity * 0.25;
          sL += barVal * 0.5 * (1 - pan);
          sR += barVal * 0.5 * (1 + pan);
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedGamolanScene9Uri = encodeWavBase64(left, right, sampleRate);
  return cachedGamolanScene9Uri;
}

// Scene 10: Dedicated Summary / 4 Panels Track (17.5 seconds)
export function getGamolanScene10Uri(): string {
  if (cachedGamolanScene10Uri) return cachedGamolanScene10Uri;

  const sampleRate = 22050;
  const duration = 17.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  // 4 rapid, clear affirmative chimes for the 4 transformation panels
  const pattern: Array<[number, string, number, number]> = [
    [0.1, "gong", 1.0, 0.0],
    [0.8, "d4", 0.7, -0.3],   // Panel 1: Translasi
    [2.2, "kenong", 0.8, -0.3],
    [3.5, "g4", 0.75, 0.3],   // Panel 2: Refleksi
    [4.8, "kenong", 0.8, 0.3],
    [6.2, "a4", 0.8, -0.2],   // Panel 3: Rotasi
    [7.5, "kenong", 0.85, -0.2],
    [9.0, "d5", 0.9, 0.2],    // Panel 4: Dilatasi
    [10.4, "gong", 1.0, 0.0], // Full summary lock!
    [11.5, "e5", 0.9, 0.0],
    [12.8, "g5", 0.95, 0.0],
    [14.2, "kenong", 0.85, 0.0],
    [15.5, "d5", 0.8, 0.0],
    [16.5, "a4", 0.75, 0.0],
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const drone = (Math.sin(2 * Math.PI * 146.83 * t) * 0.05 + Math.sin(2 * Math.PI * 220.0 * t) * 0.035);
    let sL = drone;
    let sR = drone;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        if (noteName === "gong") {
          const decay = Math.exp(-dt * 0.5);
          const gongVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.6 * Math.sin(2 * Math.PI * f0 * 2.02 * dt)) * decay * intensity * 0.42;
          sL += gongVal;
          sR += gongVal;
        } else if (noteName === "kenong") {
          const decay = Math.exp(-dt * 1.4);
          const val = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.24 * dt)) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          const decay = Math.exp(-dt * 2.8);
          const barVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.76 * dt) * Math.exp(-dt * 3.5)) * decay * intensity * 0.25;
          sL += barVal * 0.5 * (1 - pan);
          sR += barVal * 0.5 * (1 + pan);
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedGamolanScene10Uri = encodeWavBase64(left, right, sampleRate);
  return cachedGamolanScene10Uri;
}

// Scene 11: Dedicated PBL Interactive Challenge & AI Assistant Track (30.5 seconds)
export function getGamolanScene11Uri(): string {
  if (cachedGamolanScene11Uri) return cachedGamolanScene11Uri;

  const sampleRate = 22050;
  const duration = 30.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  const pattern: Array<[number, string, number, number]> = [
    [0.1, "gong", 1.0, 0.0],
    [0.9, "d4", 0.7, -0.2],
    [1.8, "g4", 0.75, 0.2],
    [2.8, "a4", 0.8, -0.1],
    [3.8, "d5", 0.85, 0.2],
    [5.0, "kenong", 0.85, 0.0],

    // PBL Challenge Steps reveal (6s - 18s)
    [6.2, "d4", 0.75, -0.3],
    [7.4, "g4", 0.8, 0.3],
    [8.6, "a4", 0.85, -0.2],
    [9.8, "d5", 0.9, 0.2],
    [11.2, "e5", 0.9, -0.2],
    [12.5, "g5", 0.95, 0.2],
    [14.0, "d5", 0.85, 0.0],
    [15.5, "b4", 0.8, -0.2],
    [17.0, "a4", 0.75, 0.2],

    // AI Assistant Feedback Box reveal (18.5s - 26s)
    [18.5, "gong", 1.0, 0.0],
    [19.5, "d5", 0.85, 0.2],
    [20.5, "e5", 0.9, -0.2],
    [21.8, "g5", 0.9, 0.1],
    [23.2, "d5", 0.85, -0.1],
    [24.5, "kenong", 0.85, 0.0],

    // Outro transition to gold embroidery (26.5s - 30.5s)
    [26.5, "b4", 0.8, 0.2],
    [27.8, "a4", 0.75, -0.2],
    [29.0, "g4", 0.7, 0.0],
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const drone = (Math.sin(2 * Math.PI * 146.83 * t) * 0.06 + Math.sin(2 * Math.PI * 220.0 * t) * 0.04) * Math.min(1, t * 0.5);
    let sL = drone;
    let sR = drone;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        if (noteName === "gong") {
          const decay = Math.exp(-dt * 0.5);
          const gongVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.6 * Math.sin(2 * Math.PI * f0 * 2.02 * dt)) * decay * intensity * 0.42;
          sL += gongVal;
          sR += gongVal;
        } else if (noteName === "kenong") {
          const decay = Math.exp(-dt * 1.4);
          const val = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.24 * dt)) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          const decay = Math.exp(-dt * 2.8);
          const barVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.76 * dt) * Math.exp(-dt * 3.5)) * decay * intensity * 0.25;
          sL += barVal * 0.5 * (1 - pan);
          sR += barVal * 0.5 * (1 + pan);
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedGamolanScene11Uri = encodeWavBase64(left, right, sampleRate);
  return cachedGamolanScene11Uri;
}

// Scene 12: Dedicated Cinematic Outro Track (12.5 seconds)
export function getGamolanScene12Uri(): string {
  if (cachedGamolanScene12Uri) return cachedGamolanScene12Uri;

  const sampleRate = 22050;
  const duration = 12.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  const pattern: Array<[number, string, number, number]> = [
    [0.1, "gong", 1.0, 0.0],
    [0.8, "d4", 0.75, -0.2],
    [1.6, "g4", 0.8, 0.2],
    [2.5, "a4", 0.85, -0.1],
    [3.5, "d5", 0.9, 0.2],
    [4.6, "e5", 0.95, -0.2],
    [5.8, "g5", 0.9, 0.1],
    [7.0, "kenong", 0.85, 0.0],
    [8.2, "d5", 0.8, -0.2],
    [9.5, "gong", 1.0, 0.0],
    [10.5, "d4", 0.7, 0.0],
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const drone = (Math.sin(2 * Math.PI * 146.83 * t) * 0.06 + Math.sin(2 * Math.PI * 220.0 * t) * 0.04) * Math.min(1, t * 0.5);
    let sL = drone;
    let sR = drone;

    pattern.forEach(([time, noteName, intensity, pan]) => {
      if (t >= time) {
        const dt = t - time;
        const f0 = notes[noteName];
        if (noteName === "gong") {
          const decay = Math.exp(-dt * 0.5);
          const gongVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.6 * Math.sin(2 * Math.PI * f0 * 2.02 * dt)) * decay * intensity * 0.42;
          sL += gongVal;
          sR += gongVal;
        } else if (noteName === "kenong") {
          const decay = Math.exp(-dt * 1.4);
          const val = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.24 * dt)) * decay * intensity * 0.35;
          sL += val;
          sR += val;
        } else {
          const decay = Math.exp(-dt * 2.8);
          const barVal = (Math.sin(2 * Math.PI * f0 * dt) + 0.5 * Math.sin(2 * Math.PI * f0 * 2.76 * dt) * Math.exp(-dt * 3.5)) * decay * intensity * 0.25;
          sL += barVal * 0.5 * (1 - pan);
          sR += barVal * 0.5 * (1 + pan);
        }
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedGamolanScene12Uri = encodeWavBase64(left, right, sampleRate);
  return cachedGamolanScene12Uri;
}

export function getSparkleAudioUri(): string {
  if (cachedSparkleUri) return cachedSparkleUri;

  const sampleRate = 22050;
  const duration = 2.2;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  const freqs = [1046.5, 1318.5, 1567.98, 2093.0, 2637.0, 3135.96];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let sL = 0;
    let sR = 0;

    freqs.forEach((f, idx) => {
      const startTime = idx * 0.1;
      if (t >= startTime) {
        const dt = t - startTime;
        const env = Math.exp(-dt * 4.8);
        const val = (Math.sin(2 * Math.PI * f * dt) + 0.4 * Math.sin(2 * Math.PI * f * 2.02 * dt)) * env * 0.22;
        const pan = (idx / (freqs.length - 1)) * 0.8 - 0.4;
        sL += val * (0.5 - pan * 0.5);
        sR += val * (0.5 + pan * 0.5);
      }
    });

    left[i] = sL;
    right[i] = sR;
  }

  cachedSparkleUri = encodeWavBase64(left, right, sampleRate);
  return cachedSparkleUri;
}

export function getWhooshAudioUri(): string {
  if (cachedWhooshUri) return cachedWhooshUri;

  const sampleRate = 22050;
  const duration = 1.8;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  let b0 = 0, b1 = 0;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;
    const env = Math.sin(progress * Math.PI) ** 2;
    const cutoff = 200 + 1400 * Math.sin(progress * Math.PI);
    const alpha = (2 * Math.PI * cutoff / sampleRate) / (1 + (2 * Math.PI * cutoff / sampleRate));

    const noise = (Math.sin(i * 12.9898 + 78.233) * 43758.5453 % 1) * 2 - 1;
    const rumble = Math.sin(2 * Math.PI * 80 * t) * 0.4;

    b0 += alpha * ((noise + rumble) - b0);
    b1 += alpha * (b0 - b1);

    const val = b1 * env * 0.6;
    left[i] = val;
    right[i] = val;
  }

  cachedWhooshUri = encodeWavBase64(left, right, sampleRate);
  return cachedWhooshUri;
}

export function getStitchSfxUri(): string {
  if (cachedStitchUri) return cachedStitchUri;

  const sampleRate = 22050;
  const duration = 3.0;
  const totalSamples = Math.floor(sampleRate * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  const stitchTimes = [0.2, 0.65, 1.1, 1.6, 2.1, 2.55];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let s = 0;

    stitchTimes.forEach((st) => {
      if (t >= st && t < st + 0.15) {
        const dt = t - st;
        const click = Math.exp(-dt * 70) * (Math.sin(2 * Math.PI * 1800 * dt) + 0.5 * (Math.random() * 2 - 1));
        const silkPull = Math.exp(-dt * 25) * Math.sin(2 * Math.PI * 650 * dt) * 0.4;
        s += (click + silkPull) * 0.28;
      }
    });

    left[i] = s;
    right[i] = s;
  }

  cachedStitchUri = encodeWavBase64(left, right, sampleRate);
  return cachedStitchUri;
}
