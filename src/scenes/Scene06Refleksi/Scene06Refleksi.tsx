// src/scenes/Scene06Refleksi/Scene06Refleksi.tsx
import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FabricBackground } from "../../components/common/FabricBackground";
import { GoldenParticles } from "../../components/common/GoldenParticles";
import { HeaderBadge } from "../../components/common/HeaderBadge";
import { SubtitleBar } from "../../components/common/SubtitleBar";
import { SubtitleCue } from "../../types";
import {
  getGamolanScene6Uri,
  getSparkleAudioUri,
  getWhooshAudioUri,
} from "../../utils/audioSynth";
import { ReflectionFormulaCard } from "./ReflectionFormulaCard";
import { ReflectionMirrorStage } from "./ReflectionMirrorStage";

const SCENE_06_CUES: SubtitleCue[] = [
  {
    id: "s6-cue-1",
    startFrame: 20,
    endFrame: 230,
    text: "Kedua, refleksi atau pencerminan. Banyak motif tapis hanya perlu dirancang separuhnya.",
    highlightWords: ["Kedua,", "refleksi", "pencerminan.", "motif", "tapis", "separuhnya."],
  },
  {
    id: "s6-cue-2",
    startFrame: 240,
    endFrame: 470,
    text: "Separuh motif dicerminkan terhadap sebuah garis, dan motif menjadi utuh.",
    highlightWords: ["Separuh", "motif", "dicerminkan", "garis,", "utuh."],
  },
  {
    id: "s6-cue-3",
    startFrame: 480,
    endFrame: 720,
    text: "Pada pencerminan terhadap sumbu y, titik x koma y berpindah ke negatif x koma y.",
    highlightWords: ["sumbu", "y,", "titik", "x", "koma", "y", "negatif", "x", "koma", "y."],
  },
  {
    id: "s6-cue-4",
    startFrame: 730,
    endFrame: 900,
    text: "Ukuran tetap, tetapi orientasinya terbalik. Garis cermin ini disebut sumbu simetri.",
    highlightWords: ["Ukuran", "tetap,", "orientasinya", "terbalik.", "Garis", "cermin", "sumbu", "simetri."],
  },
];

export const Scene06Refleksi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Audio tracks
  const gamolanMusic = useMemo(() => getGamolanScene6Uri(), []);
  const sparkleSfx = useMemo(() => getSparkleAudioUri(), []);
  const whooshSfx = useMemo(() => getWhooshAudioUri(), []);

  // Camera subtle breathing
  const cameraScale = interpolate(
    frame,
    [0, 240, 480, 720, 930],
    [1.0, 1.02, 0.98, 1.03, 1.1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.3, 0, 0.2, 1),
    }
  );

  // Background music volume envelope
  const bgmVolume = interpolate(
    frame,
    [0, 25, 880, 930],
    [0.75, 0.88, 0.88, 0.72],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#040711",
        overflow: "hidden",
        perspective: 1200,
      }}
    >
      {/* Background Gamolan Music */}
      <Audio src={gamolanMusic} volume={bgmVolume} />

      {/* SFX: Sparkle when point P reaches P' */}
      {frame >= 320 && frame <= 360 && (
        <Audio src={sparkleSfx} volume={0.75} />
      )}

      {/* SFX: Sparkle when full mirror completes */}
      {frame >= 590 && frame <= 630 && (
        <Audio src={sparkleSfx} volume={0.8} />
      )}

      {/* SFX: Whoosh when mirror line dissolves into circular halo */}
      {frame >= 760 && frame <= 800 && (
        <Audio src={whooshSfx} volume={0.7} />
      )}

      {/* 1. Deep Woven Fabric Texture Canvas */}
      <FabricBackground glowIntensity={1.2} />

      {/* 2. Main 2.5D Animated Geometry Stage */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          transform: `scale(${cameraScale})`,
          transformOrigin: "540px 800px",
          willChange: "transform",
        }}
      >
        {/* Central Mirror & Pohon Hayat Animation Stage */}
        <div style={{ position: "absolute", top: 400 }}>
          <ReflectionMirrorStage currentFrame={frame} />
        </div>

        {/* Floating 2.5D Golden Dust Particles */}
        <GoldenParticles count={38} active={true} />
      </div>

      {/* 3. Top Safe Area Header Badge */}
      <HeaderBadge
        sceneNumber="ADEGAN 06"
        category="GEOMETRI TRANSFORMASI"
        conceptTitle="Refleksi & Sumbu Simetri Pohon Hayat"
        startFrame={0}
      />

      {/* 4. Bottom Safe Area Interactive Formula Card */}
      <ReflectionFormulaCard currentFrame={frame} />

      {/* 5. Synchronized Mobile Subtitle Bar with High Contrast */}
      <SubtitleBar customCues={SCENE_06_CUES} />

      {/* 6. Edge Vignette Shadow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          boxShadow: "inset 0 0 140px rgba(0, 0, 0, 0.85)",
        }}
      />
    </AbsoluteFill>
  );
};
