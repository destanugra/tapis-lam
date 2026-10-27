// src/scenes/Scene08Dilatasi/Scene08Dilatasi.tsx
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
  getGamolanScene8Uri,
  getSparkleAudioUri,
  getWhooshAudioUri,
} from "../../utils/audioSynth";
import { DilationFormulaCard } from "./DilationFormulaCard";
import { DilationStage } from "./DilationStage";

const SCENE_08_CUES: SubtitleCue[] = [
  {
    id: "s8-cue-1",
    startFrame: 20,
    endFrame: 240,
    text: "Keempat, dilatasi atau perkalian. Belah ketupat diperkecil terhadap pusat O dengan faktor skala nol koma tujuh lima.",
    highlightWords: ["Keempat,", "dilatasi", "perkalian.", "Belah", "ketupat", "pusat", "O", "faktor", "skala", "0,75."],
  },
  {
    id: "s8-cue-2",
    startFrame: 250,
    endFrame: 520,
    text: "Setiap titik x koma y berpindah ke k x koma k y. Bentuknya tetap sebangun.",
    highlightWords: ["titik", "x", "koma", "y", "k", "x", "koma", "k", "y.", "sebangun."],
  },
  {
    id: "s8-cue-3",
    startFrame: 530,
    endFrame: 750,
    text: "Panjang sisinya menjadi k kali, dan luasnya menjadi k kuadrat kali.",
    highlightWords: ["Panjang", "sisinya", "k", "kali,", "luasnya", "k", "kuadrat", "kali."],
  },
  {
    id: "s8-cue-4",
    startFrame: 760,
    endFrame: 880,
    text: "Inilah rahasia belah ketupat bersarang pada tapis.",
    highlightWords: ["rahasia", "belah", "ketupat", "bersarang", "tapis."],
  },
];

export const Scene08Dilatasi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Audio tracks
  const gamolanMusic = useMemo(() => getGamolanScene8Uri(), []);
  const sparkleSfx = useMemo(() => getSparkleAudioUri(), []);
  const whooshSfx = useMemo(() => getWhooshAudioUri(), []);

  // Camera breathing
  const cameraScale = interpolate(
    frame,
    [0, 220, 500, 720, 900],
    [1.0, 1.03, 0.98, 1.02, 1.1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.3, 0, 0.2, 1),
    }
  );

  // Background music volume envelope
  const bgmVolume = interpolate(
    frame,
    [0, 25, 850, 900],
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
      {/* Background Gamolan Music for Scene 8 */}
      <Audio src={gamolanMusic} volume={bgmVolume} />

      {/* SFX: Sparkle when P reaches P'(0,3) */}
      {frame >= 200 && frame <= 240 && (
        <Audio src={sparkleSfx} volume={0.75} />
      )}

      {/* SFX: Sparkle when nested Sasab layers lock in */}
      {frame >= 540 && frame <= 580 && (
        <Audio src={sparkleSfx} volume={0.8} />
      )}

      {/* SFX: Whoosh on outro transition to alternating Pucuk Rebung */}
      {frame >= 710 && frame <= 750 && (
        <Audio src={whooshSfx} volume={0.75} />
      )}

      {/* 1. Deep Woven Indigo Fabric Canvas */}
      <FabricBackground glowIntensity={1.2} />

      {/* 2. Main 2.5D Animated Dilation Stage */}
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
        {/* Central Rhombus Dilation & Guidelines Stage */}
        <div style={{ position: "absolute", top: 400 }}>
          <DilationStage currentFrame={frame} />
        </div>

        {/* Floating 2.5D Golden Particles */}
        <GoldenParticles count={38} active={true} />
      </div>

      {/* 3. Top Safe Area Header Badge */}
      <HeaderBadge
        sceneNumber="ADEGAN 08"
        category="GEOMETRI TRANSFORMASI"
        conceptTitle="Dilatasi Skala & Belah Ketupat Bersarang"
        startFrame={0}
      />

      {/* 4. Bottom Safe Area Interactive Formula Card */}
      <DilationFormulaCard currentFrame={frame} />

      {/* 5. Synchronized Mobile Subtitle Bar with High Contrast */}
      <SubtitleBar customCues={SCENE_08_CUES} />

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
