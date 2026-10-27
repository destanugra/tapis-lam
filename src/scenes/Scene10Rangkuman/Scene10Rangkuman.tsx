// src/scenes/Scene10Rangkuman/Scene10Rangkuman.tsx
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
  getGamolanScene10Uri,
  getSparkleAudioUri,
  getWhooshAudioUri,
} from "../../utils/audioSynth";
import { SummaryFourPanels } from "./SummaryFourPanels";

const SCENE_10_CUES: SubtitleCue[] = [
  {
    id: "s10-cue-1",
    startFrame: 15,
    endFrame: 280,
    text: "Mari kita rangkum. Translasi menggeser, refleksi mencerminkan, rotasi memutar, dan dilatasi mengubah ukuran.",
    highlightWords: ["rangkum.", "Translasi", "menggeser,", "refleksi", "mencerminkan,", "rotasi", "memutar,", "dilatasi", "ukuran."],
  },
  {
    id: "s10-cue-2",
    startFrame: 290,
    endFrame: 480,
    text: "Tiga yang pertama mempertahankan ukuran. Dilatasi mempertahankan bentuk.",
    highlightWords: ["Tiga", "pertama", "mempertahankan", "ukuran.", "Dilatasi", "bentuk."],
  },
];

export const Scene10Rangkuman: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Audio tracks
  const gamolanMusic = useMemo(() => getGamolanScene10Uri(), []);
  const sparkleSfx = useMemo(() => getSparkleAudioUri(), []);
  const whooshSfx = useMemo(() => getWhooshAudioUri(), []);

  // Background music volume envelope
  const bgmVolume = interpolate(
    frame,
    [0, 20, 470, 510],
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
      {/* Background Gamolan Music for Scene 10 */}
      <Audio src={gamolanMusic} volume={bgmVolume} />

      {/* SFX: Sparkles on panel entrances */}
      {((frame >= 10 && frame <= 40) ||
        (frame >= 70 && frame <= 100)) && (
        <Audio src={sparkleSfx} volume={0.65} />
      )}

      {/* SFX: Whoosh on outro convergence */}
      {frame >= 430 && frame <= 470 && (
        <Audio src={whooshSfx} volume={0.8} />
      )}

      {/* 1. Deep Woven Indigo Fabric Canvas */}
      <FabricBackground glowIntensity={1.25} />

      {/* 2. Main Vertical 4-Panel Summary Layer */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 0,
          width: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <SummaryFourPanels currentFrame={frame} />
        <GoldenParticles count={32} active={true} />
      </div>

      {/* 3. Top Safe Area Header Badge */}
      <HeaderBadge
        sceneNumber="ADEGAN 10"
        category="RANGKUMAN UTAMA"
        conceptTitle="Empat Transformasi Geometri Tapis"
        startFrame={0}
      />

      {/* 4. Synchronized Mobile Subtitle Bar with High Contrast */}
      <SubtitleBar customCues={SCENE_10_CUES} />

      {/* 5. Edge Vignette Shadow */}
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
