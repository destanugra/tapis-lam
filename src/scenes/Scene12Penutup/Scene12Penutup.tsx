// src/scenes/Scene12Penutup/Scene12Penutup.tsx
import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
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
  getGamolanScene12Uri,
  getSparkleAudioUri,
} from "../../utils/audioSynth";
import { ClosingTitleCard } from "./ClosingTitleCard";
import { FullTapisClothReveal } from "./FullTapisClothReveal";

const SCENE_12_CUES: SubtitleCue[] = [
  {
    id: "s12-cue-1",
    startFrame: 15,
    endFrame: 190,
    text: "Dari sehelai kain tapis, kita belajar bahwa keindahan tradisi tercipta dari keteraturan matematika.",
    highlightWords: ["kain", "tapis,", "keindahan", "tradisi", "keteraturan", "matematika."],
  },
  {
    id: "s12-cue-2",
    startFrame: 200,
    endFrame: 330,
    text: "Lestarikan budaya, kuasai ilmu. Matematika hidup dalam warisan luhur bangsa.",
    highlightWords: ["Lestarikan", "budaya,", "kuasai", "ilmu.", "Matematika", "warisan", "luhur", "bangsa."],
  },
];

export const Scene12Penutup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Audio tracks
  const gamolanMusic = useMemo(() => getGamolanScene12Uri(), []);
  const sparkleSfx = useMemo(() => getSparkleAudioUri(), []);

  // Background music volume envelope with final fade to 0
  const bgmVolume = interpolate(
    frame,
    [0, 20, 300, 360],
    [0.75, 0.9, 0.9, 0.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Final graceful blackout overlay towards frame 360
  const blackoutOpacity = interpolate(
    frame,
    [320, 360],
    [0, 1],
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
      {/* Background Gamolan Music for Scene 12 */}
      <Audio src={gamolanMusic} volume={bgmVolume} />

      {/* SFX: Sparkle on title card reveal */}
      {frame >= 95 && frame <= 130 && (
        <Audio src={sparkleSfx} volume={0.7} />
      )}

      {/* 1. Deep Woven Indigo Fabric Canvas */}
      <FabricBackground glowIntensity={1.3} />

      {/* 2. Top Safe Area Header Badge */}
      <HeaderBadge
        sceneNumber="ADEGAN 12"
        category="PENUTUP & REFLEKSI"
        conceptTitle="Harmoni Matematika & Warisan Budaya"
        startFrame={0}
      />

      {/* 3. Central Cinematic Full Tapis Cloth Reveal with Slow Pull-out */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FullTapisClothReveal currentFrame={frame} />
        <GoldenParticles count={36} active={true} />
      </div>

      {/* 4. Institutional Closing Title Card */}
      <ClosingTitleCard currentFrame={frame} />

      {/* 5. Synchronized Mobile Subtitle Bar with High Contrast */}
      <SubtitleBar customCues={SCENE_12_CUES} />

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

      {/* 7. Final Cinematic Fade-to-Black */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#000000",
          opacity: blackoutOpacity,
          pointerEvents: "none",
          zIndex: 50,
        }}
      />
    </AbsoluteFill>
  );
};
