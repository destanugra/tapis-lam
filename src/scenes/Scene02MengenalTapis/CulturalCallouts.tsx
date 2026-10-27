// src/scenes/Scene02MengenalTapis/CulturalCallouts.tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface CulturalCalloutsProps {
  currentFrame: number;
}

interface CalloutItem {
  id: number;
  step: string;
  title: string;
  description: string;
  startFrame: number;
  endFrame: number;
  iconType: "fabric" | "gold" | "needle" | "pattern";
}

const CALLOUTS: CalloutItem[] = [
  {
    id: 1,
    step: "01 / 04",
    title: "Kain Sarung Tenun Khas Lampung",
    description: "Busana adat perempuan Lampung untuk upacara sakral dan kehormatan.",
    startFrame: 30,  // 00:01.0
    endFrame: 180,  // 00:06.0
    iconType: "fabric",
  },
  {
    id: 2,
    step: "02 / 04",
    title: "Sulaman Benang Emas & Perak",
    description: "Benang metalik diletakkan di atas kain tenun katun indigo gelap.",
    startFrame: 185, // 00:06.1
    endFrame: 380, // 00:12.6
    iconType: "gold",
  },
  {
    id: 3,
    step: "03 / 04",
    title: "Teknik Sulam Cucuk (Couching)",
    description: "Jahitan benang sutra halus menambat benang emas rapat mengikuti alur motif.",
    startFrame: 385, // 00:12.8
    endFrame: 540, // 00:18.0
    iconType: "needle",
  },
  {
    id: 4,
    step: "04 / 04",
    title: "Lajur Motif Berulang (Periodisitas)",
    description: "Kain tersusun atas lajur-lajur paralel dengan motif simetris yang diulang teratur.",
    startFrame: 545, // 00:18.1
    endFrame: 720, // 00:24.0
    iconType: "pattern",
  },
];

export const CulturalCallouts: React.FC<CulturalCalloutsProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // Find active callout
  const activeCallout = CALLOUTS.find(
    (c) => currentFrame >= c.startFrame && currentFrame <= c.endFrame
  );

  if (!activeCallout) return null;

  const progress = currentFrame - activeCallout.startFrame;
  const enterSpring = spring({
    frame: progress,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const exitOpacity = interpolate(
    currentFrame,
    [activeCallout.endFrame - 10, activeCallout.endFrame],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const opacity = Math.min(enterSpring, exitOpacity);

  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 64,
        right: 64,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        opacity,
        transform: `translateY(${(1 - enterSpring) * 18}px)`,
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          padding: "20px 28px",
          borderRadius: 22,
          background: "linear-gradient(135deg, rgba(8, 15, 34, 0.94) 0%, rgba(4, 7, 18, 0.96) 100%)",
          border: `1.5px solid ${THEME_COLORS.gold.primary}`,
          boxShadow: `0 14px 36px rgba(0, 0, 0, 0.8), 0 0 20px ${THEME_COLORS.gold.glow}`,
          backdropFilter: "blur(14px)",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Step indicator badge */}
        <div
          style={{
            padding: "8px 14px",
            borderRadius: 12,
            background: "rgba(229, 169, 60, 0.15)",
            border: `1px solid ${THEME_COLORS.gold.light}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 70,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 16,
              fontWeight: 800,
              color: THEME_COLORS.gold.light,
              letterSpacing: "0.08em",
            }}
          >
            {activeCallout.step}
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 27,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: THEME_COLORS.white.pure,
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            {activeCallout.title}
          </div>

          <div
            style={{
              marginTop: 4,
              fontFamily: FONTS.sans,
              fontSize: 19,
              fontWeight: 500,
              color: THEME_COLORS.white.muted,
              lineHeight: 1.35,
            }}
          >
            {activeCallout.description}
          </div>
        </div>

        {/* Traditional Gold Diamond Accent */}
        <div
          style={{
            width: 14,
            height: 14,
            transform: "rotate(45deg)",
            backgroundColor: THEME_COLORS.gold.primary,
            boxShadow: `0 0 10px ${THEME_COLORS.gold.light}`,
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
};
