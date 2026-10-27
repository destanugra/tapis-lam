// src/scenes/Scene11TantanganPBL/Scene11TantanganPBL.tsx
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
  getGamolanScene11Uri,
  getSparkleAudioUri,
  getWhooshAudioUri,
} from "../../utils/audioSynth";
import { AIAssistantFeedbackPanel } from "./AIAssistantFeedbackPanel";
import { ChallengeStage } from "./ChallengeStage";
import { PBLInstructionsCard } from "./PBLInstructionsCard";

const SCENE_11_CUES: SubtitleCue[] = [
  {
    id: "s11-cue-1",
    startFrame: 20,
    endFrame: 280,
    text: "Sekarang giliranmu. Rancang satu lajur tapis baru menggunakan minimal dua jenis transformasi geometri.",
    highlightWords: ["giliranmu.", "Rancang", "lajur", "tapis", "baru", "minimal", "dua", "transformasi", "geometri."],
  },
  {
    id: "s11-cue-2",
    startFrame: 290,
    endFrame: 540,
    text: "Tentukan koordinat awalnya, hitung bayangannya, dan jelaskan pola pita yang terbentuk.",
    highlightWords: ["koordinat", "awalnya,", "hitung", "bayangannya,", "pola", "pita"],
  },
  {
    id: "s11-cue-3",
    startFrame: 550,
    endFrame: 870,
    text: "Gunakan bantuan asisten AI untuk memvalidasi koordinat dan menemukan filosofi budayanya.",
    highlightWords: ["asisten", "AI", "memvalidasi", "koordinat", "filosofi", "budayanya."],
  },
];

export const Scene11TantanganPBL: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Audio tracks
  const gamolanMusic = useMemo(() => getGamolanScene11Uri(), []);
  const sparkleSfx = useMemo(() => getSparkleAudioUri(), []);
  const whooshSfx = useMemo(() => getWhooshAudioUri(), []);

  // Background music volume envelope
  const bgmVolume = interpolate(
    frame,
    [0, 25, 860, 900],
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
      {/* Background Gamolan Music for Scene 11 */}
      <Audio src={gamolanMusic} volume={bgmVolume} />

      {/* SFX: Sparkle on step reveals */}
      {((frame >= 30 && frame <= 60) ||
        (frame >= 540 && frame <= 570)) && (
        <Audio src={sparkleSfx} volume={0.7} />
      )}

      {/* SFX: Whoosh on hints & outro transition */}
      {((frame >= 140 && frame <= 170) ||
        (frame >= 840 && frame <= 880)) && (
        <Audio src={whooshSfx} volume={0.75} />
      )}

      {/* 1. Deep Woven Indigo Fabric Canvas */}
      <FabricBackground glowIntensity={1.2} />

      {/* 2. Top Safe Area Header Badge */}
      <HeaderBadge
        sceneNumber="ADEGAN 11"
        category="STUDI KASUS & PBL"
        conceptTitle="Tantangan Desain Lajur Tapis"
        startFrame={0}
      />

      {/* 3. Instructions Card (Top Section) */}
      <PBLInstructionsCard currentFrame={frame} />

      {/* 4. Central Large Coordinate Challenge Stage */}
      <div
        style={{
          position: "absolute",
          top: 590,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ChallengeStage currentFrame={frame} />
        <GoldenParticles count={30} active={true} />
      </div>

      {/* 5. AI Assistant Learning Feedback Panel (Bottom Section) */}
      <AIAssistantFeedbackPanel currentFrame={frame} />

      {/* 6. Synchronized Mobile Subtitle Bar with High Contrast */}
      <SubtitleBar customCues={SCENE_11_CUES} />

      {/* 7. Edge Vignette Shadow */}
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
