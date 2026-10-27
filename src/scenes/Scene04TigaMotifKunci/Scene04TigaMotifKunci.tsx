// src/scenes/Scene04TigaMotifKunci/Scene04TigaMotifKunci.tsx
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
  getGamolanScene4Uri,
  getSparkleAudioUri,
  getWhooshAudioUri,
} from "../../utils/audioSynth";
import { MotifMorphDisplay } from "./MotifMorphDisplay";
import { MotifShowcaseCard } from "./MotifShowcaseCard";

const SCENE_04_CUES: SubtitleCue[] = [
  {
    id: "s4-cue-1",
    startFrame: 20,
    endFrame: 185,
    text: "Kita akan memakai tiga motif tapis. Pucuk rebung, segitiga bertingkat yang melambangkan kekuatan yang tumbuh.",
    highlightWords: ["tiga", "motif", "tapis.", "Pucuk", "rebung,", "kekuatan"],
  },
  {
    id: "s4-cue-2",
    startFrame: 190,
    endFrame: 375,
    text: "Belah ketupat, yang sering tersusun bersarang.",
    highlightWords: ["Belah", "ketupat,", "tersusun", "bersarang."],
  },
  {
    id: "s4-cue-3",
    startFrame: 380,
    endFrame: 540,
    text: "Dan bunga bintang, yang kelopaknya mengelilingi satu pusat.",
    highlightWords: ["bunga", "bintang,", "kelopaknya", "satu", "pusat."],
  },
];

export const Scene04TigaMotifKunci: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Audio tracks
  const gamolanMusic = useMemo(() => getGamolanScene4Uri(), []);
  const sparkleSfx = useMemo(() => getSparkleAudioUri(), []);
  const whooshSfx = useMemo(() => getWhooshAudioUri(), []);

  // Camera breathing & gentle scale
  const cameraScale = interpolate(
    frame,
    [0, 185, 375, 540, 600],
    [1.0, 1.03, 1.02, 1.05, 1.14],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.3, 0, 0.2, 1),
    }
  );

  // Volume envelope
  const bgmVolume = interpolate(
    frame,
    [0, 25, 560, 600],
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
      {/* Background Gamolan Music for Scene 4 */}
      <Audio src={gamolanMusic} volume={bgmVolume} />

      {/* Sparkle on motif reveals */}
      {((frame >= 10 && frame <= 45) ||
        (frame >= 185 && frame <= 215) ||
        (frame >= 375 && frame <= 405)) && (
        <Audio src={sparkleSfx} volume={0.65} />
      )}

      {/* Whoosh on morph transitions and final outro */}
      {((frame >= 180 && frame <= 205) ||
        (frame >= 370 && frame <= 395) ||
        (frame >= 535 && frame <= 565)) && (
        <Audio src={whooshSfx} volume={0.75} />
      )}

      {/* 1. Deep Woven Fabric Canvas */}
      <FabricBackground glowIntensity={1.1} />

      {/* 2. Main 2.5D Focal Layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${cameraScale})`,
          transformOrigin: "540px 960px",
          willChange: "transform",
        }}
      >
        {/* Central Morphing Display of the 3 Motifs */}
        <div style={{ position: "absolute", top: 480 }}>
          <MotifMorphDisplay currentFrame={frame} />
        </div>

        {/* Floating 2.5D Gold Particles */}
        <GoldenParticles count={38} active={true} />
      </div>

      {/* 3. Top Safe Area Header Badge */}
      <HeaderBadge
        sceneNumber="ADEGAN 04"
        category="TIGA MOTIF KUNCI"
        conceptTitle="Karakteristik Geometris Motif Tapis"
        startFrame={0}
      />

      {/* 4. Active Motif Info Card */}
      <MotifShowcaseCard currentFrame={frame} />

      {/* 5. Subtitle Bar with Synchronized Indonesian Narration (Bottom Safe Area) */}
      <SubtitleBar customCues={SCENE_04_CUES} />

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
