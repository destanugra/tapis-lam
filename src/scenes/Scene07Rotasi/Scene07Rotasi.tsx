// src/scenes/Scene07Rotasi/Scene07Rotasi.tsx
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
  getGamolanScene7Uri,
  getSparkleAudioUri,
  getWhooshAudioUri,
} from "../../utils/audioSynth";
import { RotationCircleStage } from "./RotationCircleStage";
import { RotationFormulaCard } from "./RotationFormulaCard";

const SCENE_07_CUES: SubtitleCue[] = [
  {
    id: "s7-cue-1",
    startFrame: 20,
    endFrame: 200,
    text: "Ketiga, rotasi atau perputaran. Ambil satu kelopak, lalu putar sebesar empat puluh lima derajat terhadap titik pusat O.",
    highlightWords: ["Ketiga,", "rotasi", "perputaran.", "kelopak,", "empat", "puluh", "lima", "derajat", "pusat", "O."],
  },
  {
    id: "s7-cue-2",
    startFrame: 210,
    endFrame: 450,
    text: "Ulangi delapan kali, dan terbentuklah bunga bintang.",
    highlightWords: ["delapan", "kali,", "terbentuklah", "bunga", "bintang."],
  },
  {
    id: "s7-cue-3",
    startFrame: 460,
    endFrame: 750,
    text: "Karena motif kembali ke bentuk semula setiap empat puluh lima derajat, bunga ini memiliki simetri putar orde delapan.",
    highlightWords: ["kembali", "ke", "bentuk", "semula", "simetri", "putar", "orde", "delapan."],
  },
];

export const Scene07Rotasi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Audio tracks
  const gamolanMusic = useMemo(() => getGamolanScene7Uri(), []);
  const sparkleSfx = useMemo(() => getSparkleAudioUri(), []);
  const whooshSfx = useMemo(() => getWhooshAudioUri(), []);

  // Camera moves closer and further subtly, keeping rotation center O(0,0) rock-solid
  const cameraScale = interpolate(
    frame,
    [0, 180, 420, 640, 780],
    [1.0, 1.06, 0.98, 1.04, 1.12],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.3, 0, 0.2, 1),
    }
  );

  // Background music volume envelope
  const bgmVolume = interpolate(
    frame,
    [0, 25, 730, 780],
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
      {/* Background Gamolan Music for Scene 7 */}
      <Audio src={gamolanMusic} volume={bgmVolume} />

      {/* SFX: Sparkle on 45 deg angle snap */}
      {frame >= 170 && frame <= 210 && (
        <Audio src={sparkleSfx} volume={0.7} />
      )}

      {/* SFX: Sparkle on full bloom */}
      {frame >= 480 && frame <= 520 && (
        <Audio src={sparkleSfx} volume={0.8} />
      )}

      {/* SFX: Whoosh on morph transition to Belah Ketupat */}
      {frame >= 640 && frame <= 680 && (
        <Audio src={whooshSfx} volume={0.75} />
      )}

      {/* 1. Deep Woven Indigo Fabric Canvas */}
      <FabricBackground glowIntensity={1.2} />

      {/* 2. Main 2.5D Animated Rotation Stage */}
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
        {/* Central 8-Point Rosette & Angle Arc Stage */}
        <div style={{ position: "absolute", top: 400 }}>
          <RotationCircleStage currentFrame={frame} />
        </div>

        {/* Floating 2.5D Golden Particles */}
        <GoldenParticles count={38} active={true} />
      </div>

      {/* 3. Top Safe Area Header Badge */}
      <HeaderBadge
        sceneNumber="ADEGAN 07"
        category="GEOMETRI TRANSFORMASI"
        conceptTitle="Rotasi 45° & Bunga Bintang"
        startFrame={0}
      />

      {/* 4. Bottom Safe Area Interactive Formula Card */}
      <RotationFormulaCard currentFrame={frame} />

      {/* 5. Synchronized Mobile Subtitle Bar with High Contrast */}
      <SubtitleBar customCues={SCENE_07_CUES} />

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
