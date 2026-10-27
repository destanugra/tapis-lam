// src/scenes/Scene09RefleksiGeser/Scene09RefleksiGeser.tsx
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
  getGamolanScene9Uri,
  getSparkleAudioUri,
  getWhooshAudioUri,
} from "../../utils/audioSynth";
import { GlideReflectionFormulaCard } from "./GlideReflectionFormulaCard";
import { GlideReflectionStage } from "./GlideReflectionStage";

const SCENE_09_CUES: SubtitleCue[] = [
  {
    id: "s9-cue-1",
    startFrame: 20,
    endFrame: 240,
    text: "Transformasi juga dapat digabungkan. Cerminkan pucuk rebung terhadap garis tengah lajur, lalu geser sepanjang garis itu.",
    highlightWords: ["Transformasi", "digabungkan.", "Cerminkan", "pucuk", "rebung", "garis", "tengah", "geser"],
  },
  {
    id: "s9-cue-2",
    startFrame: 250,
    endFrame: 540,
    text: "Gabungan ini disebut refleksi geser, dan menghasilkan pola berselang atas bawah yang sering kita temui pada tapis.",
    highlightWords: ["refleksi", "geser,", "pola", "berselang", "atas", "bawah", "tapis."],
  },
  {
    id: "s9-cue-3",
    startFrame: 550,
    endFrame: 750,
    text: "Satu lajur tapis dapat digolongkan menurut transformasi yang mempertahankannya.",
    highlightWords: ["Satu", "lajur", "tapis", "transformasi", "mempertahankannya."],
  },
  {
    id: "s9-cue-4",
    startFrame: 760,
    endFrame: 930,
    text: "Hanya ada tujuh jenis pola pita seperti ini.",
    highlightWords: ["tujuh", "jenis", "pola", "pita"],
  },
];

export const Scene09RefleksiGeser: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Audio tracks
  const gamolanMusic = useMemo(() => getGamolanScene9Uri(), []);
  const sparkleSfx = useMemo(() => getSparkleAudioUri(), []);
  const whooshSfx = useMemo(() => getWhooshAudioUri(), []);

  // Camera subtle breathing
  const cameraScale = interpolate(
    frame,
    [0, 240, 520, 760, 960],
    [1.0, 1.02, 0.98, 1.03, 1.08],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.3, 0, 0.2, 1),
    }
  );

  // Background music volume envelope
  const bgmVolume = interpolate(
    frame,
    [0, 25, 910, 960],
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
      {/* Background Gamolan Music for Scene 9 */}
      <Audio src={gamolanMusic} volume={bgmVolume} />

      {/* SFX: Sparkle on Refleksi completion */}
      {frame >= 200 && frame <= 235 && (
        <Audio src={sparkleSfx} volume={0.7} />
      )}

      {/* SFX: Sparkle on Translasi arrival */}
      {frame >= 370 && frame <= 410 && (
        <Audio src={sparkleSfx} volume={0.75} />
      )}

      {/* SFX: Whoosh on outro upward shift */}
      {frame >= 760 && frame <= 800 && (
        <Audio src={whooshSfx} volume={0.75} />
      )}

      {/* 1. Deep Woven Indigo Fabric Canvas */}
      <FabricBackground glowIntensity={1.2} />

      {/* 2. Main 2.5D Animated Glide Reflection Stage */}
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
        {/* Central Glide Reflection Animation Stage */}
        <div style={{ position: "absolute", top: 400 }}>
          <GlideReflectionStage currentFrame={frame} />
        </div>

        {/* Floating 2.5D Golden Particles */}
        <GoldenParticles count={38} active={true} />
      </div>

      {/* 3. Top Safe Area Header Badge */}
      <HeaderBadge
        sceneNumber="ADEGAN 09"
        category="KOMPOSISI TRANSFORMASI"
        conceptTitle="Refleksi Geser & Pola Pita"
        startFrame={0}
      />

      {/* 4. Bottom Safe Area Interactive Formula Card */}
      <GlideReflectionFormulaCard currentFrame={frame} />

      {/* 5. Synchronized Mobile Subtitle Bar with High Contrast */}
      <SubtitleBar customCues={SCENE_09_CUES} />

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
