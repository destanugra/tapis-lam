// src/scenes/Scene01Opening/Scene01Opening.tsx
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
import { TapisBorder } from "../../components/motifs/TapisBorder";
import { TapisClothCenter } from "../../components/motifs/TapisClothCenter";
import {
  getGamolanAudioUri,
  getSparkleAudioUri,
  getWhooshAudioUri,
} from "../../utils/audioSynth";
import { ThreadAnimation } from "./ThreadAnimation";
import { TitleBanner } from "./TitleBanner";

export const Scene01Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Lazy in-memory audio URIs
  const gamolanAudio = useMemo(() => getGamolanAudioUri(), []);
  const sparkleAudio = useMemo(() => getSparkleAudioUri(), []);
  const whooshAudio = useMemo(() => getWhooshAudioUri(), []);

  // 1. Thread Weaving Progress (Frames 15 to 160)
  const threadProgress = interpolate(frame, [15, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // 2. Motif Growth Progress (Frames 50 to 200)
  const motifProgress = interpolate(frame, [50, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  // 3. Lajur Border Stitching Progress (Frames 30 to 170)
  const borderProgress = interpolate(frame, [30, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. Camera 2.5D Movement:
  // - Phase A (Frames 0 to 330): Gentle cinematic push-in (scale 0.94 -> 1.06)
  // - Phase B (Frames 330 to 390): Deep zoom transition match-cut into center motif (scale 1.06 -> 3.4)
  const cameraScale = interpolate(
    frame,
    [0, 180, 330, 390],
    [0.94, 1.02, 1.06, 3.4],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    }
  );

  const cameraZ = interpolate(frame, [330, 390], [0, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.35, 0, 0.1, 1),
  });

  // Fade out title and UI towards the transition push (frames 340 to 375)
  const uiFadeOut = interpolate(frame, [340, 375], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Audio volume envelope
  const bgmVolume = interpolate(
    frame,
    [0, 30, 350, 390],
    [0, 0.85, 0.85, 0.65],
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
      {/* Background Audio Tracks */}
      <Audio src={gamolanAudio} volume={bgmVolume} />
      <Audio src={sparkleAudio} startFrom={0} volume={0.65} />
      {frame >= 320 && <Audio src={whooshAudio} volume={0.8} />}

      {/* 1. Deep Woven Cloth Texture & Atmosphere */}
      <FabricBackground glowIntensity={motifProgress > 0.5 ? 1.2 : 0.8} />

      {/* 2. Camera-Controlled Layer (2.5D Parallax Container) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          transform: `scale(${cameraScale}) translateZ(${cameraZ}px)`,
          transformOrigin: "540px 1050px", // zooms into the center motif
          willChange: "transform",
        }}
      >
        {/* Growing Thread Trajectories */}
        {frame < 260 && <ThreadAnimation progress={threadProgress} />}

        {/* Vertical Border Lajur */}
        <TapisBorder drawProgress={borderProgress} glow={true} />

        {/* Center Motif Masterpiece */}
        <div
          style={{
            position: "absolute",
            top: 500,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <TapisClothCenter
            progress={motifProgress}
            scale={1.05}
            showCoordinates={frame > 330}
          />
        </div>

        {/* Floating 2.5D Stardust Particles */}
        <GoldenParticles count={50} active={true} />
      </div>

      {/* 3. Header Scene Badge (Top Safe Area) */}
      <div style={{ opacity: uiFadeOut }}>
        <HeaderBadge
          sceneNumber="ADEGAN 01"
          category="PENGENALAN BUDAYA & MATEMATIKA"
          conceptTitle="Eksplorasi Pola Tapis Lampung"
          startFrame={45}
        />
      </div>

      {/* 4. Cinematic Grand Title Banner */}
      <div style={{ opacity: uiFadeOut }}>
        <TitleBanner startFrame={85} />
      </div>

      {/* 5. Subtitle Bar with Synchronized Indonesian Narration (Bottom Safe Area) */}
      <div style={{ opacity: uiFadeOut }}>
        <SubtitleBar />
      </div>

      {/* 6. Subtle Edge Vignette Overlay */}
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
