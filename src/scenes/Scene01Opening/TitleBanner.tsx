// src/scenes/Scene01Opening/TitleBanner.tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface TitleBannerProps {
  startFrame?: number;
}

export const TitleBanner: React.FC<TitleBannerProps> = ({ startFrame = 80 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = frame - startFrame;

  // Title 1: "GEOMETRI TRANSFORMASI" entrance
  const titleSpring = spring({
    frame: progress,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  const titleOpacity = interpolate(progress, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title 2: "Pada Pola Tapis Lampung" entrance (delayed by 18 frames)
  const subtitleSpring = spring({
    frame: progress - 18,
    fps,
    config: { damping: 16, stiffness: 85 },
  });

  const subtitleOpacity = interpolate(progress - 18, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Moving specular shimmer highlight across the golden letters
  const shimmerPos = interpolate(
    (frame - startFrame) % 90,
    [0, 90],
    [-100, 200]
  );

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 290,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      {/* 1. Main Title: GEOMETRI TRANSFORMASI */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleSpring) * 28}px) scale(${0.9 + titleSpring * 0.1})`,
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: FONTS.title,
            fontSize: 58,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            background: `linear-gradient(135deg, #FFFDF0 0%, #FDE047 30%, #E5A93C 60%, #B45309 85%, #FFFBEB 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 6px 18px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 25px ${THEME_COLORS.gold.glow})`,
            position: "relative",
          }}
        >
          GEOMETRI TRANSFORMASI
        </h1>
      </div>

      {/* Decorative Ornate Golden Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginTop: 14,
          marginBottom: 12,
          opacity: Math.min(titleOpacity, subtitleOpacity),
          width: "100%",
          maxWidth: 600,
        }}
      >
        {/* Left hairline */}
        <div
          style={{
            flex: 1,
            height: 1.5,
            background: "linear-gradient(90deg, rgba(229,169,60,0) 0%, rgba(229,169,60,0.85) 100%)",
          }}
        />

        {/* Center Golden Diamond Motif Trio */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              transform: "rotate(45deg)",
              backgroundColor: THEME_COLORS.gold.light,
              boxShadow: `0 0 8px ${THEME_COLORS.gold.primary}`,
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              transform: "rotate(45deg)",
              backgroundColor: THEME_COLORS.gold.primary,
              boxShadow: `0 0 12px ${THEME_COLORS.gold.light}`,
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              transform: "rotate(45deg)",
              backgroundColor: THEME_COLORS.gold.light,
              boxShadow: `0 0 8px ${THEME_COLORS.gold.primary}`,
            }}
          />
        </div>

        {/* Right hairline */}
        <div
          style={{
            flex: 1,
            height: 1.5,
            background: "linear-gradient(270deg, rgba(229,169,60,0) 0%, rgba(229,169,60,0.85) 100%)",
          }}
        />
      </div>

      {/* 2. Subtitle: Pada Pola Tapis Lampung */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${(1 - subtitleSpring) * 20}px)`,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: FONTS.title,
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: "0.2em",
            color: "#FFFDF0",
            textTransform: "uppercase",
            textShadow: `0 4px 14px rgba(0,0,0,0.95), 0 0 16px ${THEME_COLORS.gold.glow}`,
          }}
        >
          Pada Pola Tapis Lampung
        </h2>
      </div>
    </div>
  );
};
