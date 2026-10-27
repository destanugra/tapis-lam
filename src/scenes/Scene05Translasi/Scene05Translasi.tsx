// src/scenes/Scene05Translasi/Scene05Translasi.tsx
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
  getGamolanScene5Uri,
  getSparkleAudioUri,
  getWhooshAudioUri,
} from "../../utils/audioSynth";
import { CartesianTranslationPlane } from "./CartesianTranslationPlane";
import { TranslationFormulaCard } from "./TranslationFormulaCard";

const SCENE_05_CUES: SubtitleCue[] = [
  {
    id: "s5-cue-1",
    startFrame: 20,
    endFrame: 240,
    text: "Pertama, translasi atau pergeseran. Bayangkan sebuah motif dasar, misalnya segitiga pucuk rebung dengan koordinat tertentu.",
    highlightWords: ["Pertama,", "translasi", "pergeseran.", "segitiga", "pucuk", "rebung", "koordinat"],
  },
  {
    id: "s5-cue-2",
    startFrame: 250,
    endFrame: 520,
    text: "Ketika motif ini digeser sejauh lima satuan ke kanan tanpa diputar dan tanpa diubah ukurannya, setiap titik berpindah dengan jarak dan arah yang sama.",
    highlightWords: ["lima", "satuan", "ke", "kanan", "tanpa", "diputar", "jarak", "arah", "sama."],
  },
  {
    id: "s5-cue-3",
    startFrame: 530,
    endFrame: 820,
    text: "Jika pergeseran ini diulang terus-menerus sepanjang garis lurus, terbentuklah lajur pembatas yang kita lihat pada kain tapis.",
    highlightWords: ["diulang", "terus-menerus", "garis", "lurus,", "lajur", "pembatas", "kain", "tapis."],
  },
  {
    id: "s5-cue-4",
    startFrame: 830,
    endFrame: 1010,
    text: "Inilah translasi: memindahkan setiap titik dengan vektor yang konstan.",
    highlightWords: ["Inilah", "translasi:", "memindahkan", "setiap", "titik", "vektor", "konstan."],
  },
];

export const Scene05Translasi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Audio tracks
  const gamolanMusic = useMemo(() => getGamolanScene5Uri(), []);
  const sparkleSfx = useMemo(() => getSparkleAudioUri(), []);
  const whooshSfx = useMemo(() => getWhooshAudioUri(), []);

  // Camera tracking motion
  // Camera moves smoothly, then glides upward in the outro
  const cameraTranslateY = interpolate(
    frame,
    [0, 820, 1050],
    [0, 0, -220],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.3, 0, 0.2, 1),
    }
  );

  const cameraScale = interpolate(
    frame,
    [0, 200, 520, 820, 1050],
    [1.0, 1.02, 0.96, 0.98, 1.08],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Background music volume envelope
  const bgmVolume = interpolate(
    frame,
    [0, 25, 1000, 1050],
    [0.72, 0.88, 0.88, 0.72],
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

      {/* SFX: Whoosh during vector travel */}
      {frame >= 185 && frame <= 215 && (
        <Audio src={whooshSfx} volume={0.7} />
      )}

      {/* SFX: Sparkle on arrival & solid gold solidification */}
      {frame >= 360 && frame <= 400 && (
        <Audio src={sparkleSfx} volume={0.8} />
      )}

      {/* SFX: Outro whoosh moving up */}
      {frame >= 870 && frame <= 910 && (
        <Audio src={whooshSfx} volume={0.75} />
      )}

      {/* 1. Deep Woven Fabric Texture Canvas */}
      <FabricBackground glowIntensity={1.15} />

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
          transform: `translateY(${cameraTranslateY}px) scale(${cameraScale})`,
          transformOrigin: "540px 800px",
          willChange: "transform",
        }}
      >
        {/* Central Coordinate & Vector Animation Stage */}
        <div style={{ position: "absolute", top: 400 }}>
          <CartesianTranslationPlane currentFrame={frame} />
        </div>

        {/* Floating 2.5D Golden Dust Particles */}
        <GoldenParticles count={42} active={true} />
      </div>

      {/* 3. Top Safe Area Header Badge */}
      <HeaderBadge
        sceneNumber="ADEGAN 05"
        category="GEOMETRI TRANSFORMASI"
        conceptTitle="Translasi Vektor & Lajur Tapis"
        startFrame={0}
      />

      {/* 4. Bottom Safe Area Interactive Formula Card */}
      <TranslationFormulaCard currentFrame={frame} />

      {/* 5. Synchronized Mobile Subtitle Bar with High Contrast */}
      <SubtitleBar customCues={SCENE_05_CUES} />

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
