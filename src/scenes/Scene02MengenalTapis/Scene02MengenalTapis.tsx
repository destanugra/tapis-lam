// src/scenes/Scene02MengenalTapis/Scene02MengenalTapis.tsx
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
import { TapisRepeatingLajur } from "../../components/motifs/TapisRepeatingLajur";
import { SubtitleCue } from "../../types";
import {
  getGamolanScene2Uri,
  getStitchSfxUri,
  getWhooshAudioUri,
} from "../../utils/audioSynth";
import { CulturalCallouts } from "./CulturalCallouts";
import { MacroStitchAnimation } from "./MacroStitchAnimation";

const SCENE_02_CUES: SubtitleCue[] = [
  {
    id: "s2-cue-1",
    startFrame: 20,
    endFrame: 180,
    text: "Tapis adalah kain sarung tenun khas Lampung yang dikenakan perempuan dalam upacara adat.",
    highlightWords: ["kain", "sarung", "tenun", "Lampung", "upacara", "adat."],
  },
  {
    id: "s2-cue-2",
    startFrame: 185,
    endFrame: 380,
    text: "Motifnya disulam dengan benang emas atau perak menggunakan teknik sulam cucuk.",
    highlightWords: ["benang", "emas", "perak", "teknik", "sulam", "cucuk."],
  },
  {
    id: "s2-cue-3",
    startFrame: 385,
    endFrame: 540,
    text: "Perhatikan susunannya. Kain tersusun atas lajur-lajur...",
    highlightWords: ["susunannya.", "lajur-lajur..."],
  },
  {
    id: "s2-cue-4",
    startFrame: 545,
    endFrame: 730,
    text: "...dan setiap lajur berisi motif yang diulang dengan sangat teratur.",
    highlightWords: ["lajur", "motif", "diulang", "sangat", "teratur."],
  },
];

export const Scene02MengenalTapis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Audio tracks
  const gamolanMusic = useMemo(() => getGamolanScene2Uri(), []);
  const stitchSfx = useMemo(() => getStitchSfxUri(), []);
  const whooshSfx = useMemo(() => getWhooshAudioUri(), []);

  // 1. Camera Choreography across the 25-second scene:
  // - Phase 1 (0-110): Match-cut pull-out from Scene 1 zoom (3.2 -> 1.0)
  // - Phase 2 (110-300): Vertical glide down the lajur (Y: 0 -> -520)
  // - Phase 3 (300-480): Macro zoom on the stitch embroidery (Scale: 1.0 -> 1.35)
  // - Phase 4 (480-620): Horizontal pan showing repeating parallel columns (X: 0 -> -240 -> 0)
  // - Phase 5 (620-750): Deep zoom into single Pucuk Rebung (Scale: 1.0 -> 3.6, targeting Y: 790)

  // Camera Scale
  const cameraScale = interpolate(
    frame,
    [0, 110, 300, 370, 470, 490, 620, 750],
    [3.2, 1.0, 1.0, 1.38, 1.38, 1.0, 1.0, 3.8],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.35, 0.1, 0.2, 1),
    }
  );

  // Camera Vertical Pan (Y tracking)
  const cameraY = interpolate(
    frame,
    [0, 110, 140, 290, 370, 470, 620, 750],
    [-200, 0, 0, -480, -320, -320, -180, -350],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.3, 0, 0.2, 1),
    }
  );

  // Camera Horizontal Pan (X tracking for repeating columns)
  const cameraX = interpolate(
    frame,
    [480, 540, 610, 640],
    [0, 180, -120, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.3, 0, 0.2, 1),
    }
  );

  // Macro overlay visibility during Phase 3 (Frames 310 to 475)
  const macroOpacity = interpolate(
    frame,
    [310, 340, 450, 475],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const macroProgress = interpolate(frame, [330, 450], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Repeating lajur highlight box during Phase 4 (Frames 480 to 620)
  const showLajurHighlight = frame >= 480 && frame <= 620;

  // Single Pucuk Rebung target highlight and geometric transition (Frames 620 to 750)
  const showPucukHighlight = frame >= 615;
  const geometricMode = interpolate(frame, [650, 745], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  // UI fade out on final transition push (Frames 710 to 750)
  const uiFadeOut = interpolate(frame, [705, 740], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Volume envelope
  const bgmVolume = interpolate(
    frame,
    [0, 20, 710, 750],
    [0.75, 0.85, 0.85, 0.7],
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
      {/* Background Gamolan Music & SFX */}
      <Audio src={gamolanMusic} volume={bgmVolume} />

      {/* Sewing / Stitch SFX when demonstrating couching technique */}
      {frame >= 330 && frame <= 440 && (
        <Audio src={stitchSfx} volume={0.65} />
      )}

      {/* Whoosh on major camera movements */}
      {(frame >= 105 && frame <= 140) || (frame >= 625 && frame <= 660) ? (
        <Audio src={whooshSfx} volume={0.7} />
      ) : null}

      {/* 1. Underlying Woven Fabric & Ambient Lighting */}
      <FabricBackground glowIntensity={1.0} />

      {/* 2. Main 2.5D Camera Canvas */}
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
          transform: `scale(${cameraScale}) translate(${cameraX}px, ${cameraY}px)`,
          transformOrigin: "540px 960px",
          willChange: "transform",
        }}
      >
        {/* Repeating Lajur Cloth Surface */}
        <div style={{ transform: "translate(-160px, -340px)" }}>
          <TapisRepeatingLajur
            glow={true}
            highlightLajur={showLajurHighlight}
            highlightPucuk={showPucukHighlight}
            geometricMode={geometricMode}
          />
        </div>

        {/* Floating Golden Particles */}
        <GoldenParticles count={40} active={true} />
      </div>

      {/* 3. Macro Stitch Popup Layer (Appears during "Teknik Sulam Cucuk") */}
      {macroOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: macroOpacity,
            transform: `scale(${0.9 + macroOpacity * 0.1})`,
            zIndex: 45,
            pointerEvents: "none",
          }}
        >
          <MacroStitchAnimation progress={macroProgress} />
        </div>
      )}

      {/* 4. Top Safe Area Header Badge */}
      <div style={{ opacity: uiFadeOut }}>
        <HeaderBadge
          sceneNumber="ADEGAN 02"
          category="KONTEKS BUDAYA & TEKSTIL"
          conceptTitle="Mengenal Kain Tapis Lampung"
          startFrame={0}
        />
      </div>

      {/* 5. Cultural Feature Callout Badges (01 to 04) */}
      <div style={{ opacity: uiFadeOut }}>
        <CulturalCallouts currentFrame={frame} />
      </div>

      {/* 6. Subtitle Bar with Synchronized Indonesian Narration */}
      <div style={{ opacity: uiFadeOut }}>
        <SubtitleBar customCues={SCENE_02_CUES} />
      </div>

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
