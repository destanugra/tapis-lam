// src/scenes/Scene03PertanyaanPemantik/Scene03PertanyaanPemantik.tsx
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
  getGamolanScene3Uri,
  getSparkleAudioUri,
  getWhooshAudioUri,
} from "../../utils/audioSynth";
import { MorphToGeometry } from "./MorphToGeometry";
import { QuestionBanner } from "./QuestionBanner";
import { TranslasiDemo } from "./TranslasiDemo";

const SCENE_03_CUES: SubtitleCue[] = [
  {
    id: "s3-cue-1",
    startFrame: 25,
    endFrame: 215,
    text: "Bagaimana para penyulam membuat pola berulang serapi ini, tanpa penggaris digital dan tanpa komputer?",
    highlightWords: ["penyulam", "pola", "berulang", "serapi", "tanpa", "komputer?"],
  },
  {
    id: "s3-cue-2",
    startFrame: 220,
    endFrame: 405,
    text: "Jawabannya ada pada geometri transformasi.",
    highlightWords: ["Jawabannya", "geometri", "transformasi."],
  },
];

export const Scene03PertanyaanPemantik: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Audio tracks
  const gamolanMusic = useMemo(() => getGamolanScene3Uri(), []);
  const sparkleSfx = useMemo(() => getSparkleAudioUri(), []);
  const whooshSfx = useMemo(() => getWhooshAudioUri(), []);

  // Morph progress from cultural motif to mathematical geometry (Frames 180 to 280)
  const morphProgress = interpolate(frame, [180, 270], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });

  // Translasi demo opacity (Fades out when morphing begins)
  const translasiOpacity = interpolate(frame, [170, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Transition to 3 motif slots (Frames 360 to 420)
  const transitionToThreeSlots = interpolate(frame, [360, 420], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  // Camera subtle push-in
  const cameraScale = interpolate(
    frame,
    [0, 180, 220, 360, 420],
    [1.0, 1.04, 1.04, 1.08, 1.15],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.3, 0, 0.2, 1),
    }
  );

  // Volume envelope
  const bgmVolume = interpolate(
    frame,
    [0, 25, 380, 420],
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
      {/* Background Gamolan Track for Scene 3 */}
      <Audio src={gamolanMusic} volume={bgmVolume} />

      {/* Sparkle on conceptual revelation */}
      {frame >= 215 && frame <= 250 && (
        <Audio src={sparkleSfx} volume={0.7} />
      )}

      {/* Whoosh on coordinate axes growth and final transition */}
      {((frame >= 180 && frame <= 215) || (frame >= 360 && frame <= 395)) && (
        <Audio src={whooshSfx} volume={0.75} />
      )}

      {/* 1. Deep Woven Fabric Canvas */}
      <FabricBackground glowIntensity={frame > 220 ? 1.25 : 0.9} />

      {/* 2. Main Visual Center Container */}
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
        {/* Phase A: Single Motif & Translation Demo (Frames 0 to 210) */}
        {translasiOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              top: 760,
              left: 40,
              opacity: translasiOpacity,
            }}
          >
            <TranslasiDemo opacity={translasiOpacity} />
          </div>
        )}

        {/* Phase B: Morphing to Geometric Triangle & Coordinate Axes (Frames 180 to 420) */}
        {morphProgress > 0 && (
          <div
            style={{
              position: "absolute",
              top: 600,
              left: 40,
            }}
          >
            <MorphToGeometry
              progress={morphProgress}
              transitionToThreeSlots={transitionToThreeSlots}
            />
          </div>
        )}

        {/* Floating 2.5D Gold Particles */}
        <GoldenParticles count={35} active={true} />
      </div>

      {/* 3. Header Scene Badge (Top Safe Area) */}
      <HeaderBadge
        sceneNumber="ADEGAN 03"
        category="PERTANYAAN PEMANTIK"
        conceptTitle="Rasionalisasi Matematika Tradisi"
        startFrame={0}
      />

      {/* 4. Question Banner (Large Prominent Typography) */}
      <QuestionBanner startFrame={35} endFrame={215} />

      {/* 5. Subtitle Bar with Synchronized Indonesian Narration (Bottom Safe Area) */}
      <SubtitleBar customCues={SCENE_03_CUES} />

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
