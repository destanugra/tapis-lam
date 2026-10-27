// src/components/common/HeaderBadge.tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, SAFE_AREAS, THEME_COLORS } from "../../constants/theme";

interface HeaderBadgeProps {
  sceneNumber?: string;
  category?: string;
  conceptTitle?: string;
  startFrame?: number;
}

export const HeaderBadge: React.FC<HeaderBadgeProps> = ({
  sceneNumber = "ADEGAN 01",
  category = "PENGENALAN POLA BUDAYA",
  conceptTitle = "Eksplorasi Pola Tapis Lampung",
  startFrame = 45,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const opacity = interpolate(frame - startFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: SAFE_AREAS.top,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity,
        transform: `translateY(${(1 - entrance) * -30}px)`,
        zIndex: 50,
      }}
    >
      {/* Top pill badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 22px",
          borderRadius: 30,
          background: "rgba(10, 18, 38, 0.85)",
          border: `1.5px solid ${THEME_COLORS.gold.primary}`,
          boxShadow: `0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px ${THEME_COLORS.gold.glow}`,
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Diamond gold icon */}
        <div
          style={{
            width: 10,
            height: 10,
            transform: "rotate(45deg)",
            backgroundColor: THEME_COLORS.gold.primary,
            boxShadow: `0 0 8px ${THEME_COLORS.gold.light}`,
          }}
        />

        <span
          style={{
            fontFamily: FONTS.sans,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.22em",
            color: THEME_COLORS.gold.light,
            textTransform: "uppercase",
          }}
        >
          {sceneNumber}
        </span>

        <span
          style={{
            color: "rgba(255, 255, 255, 0.4)",
            fontSize: 20,
          }}
        >
          |
        </span>

        <span
          style={{
            fontFamily: FONTS.sans,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: THEME_COLORS.white.soft,
            textTransform: "uppercase",
          }}
        >
          {category}
        </span>
      </div>

      {/* Sub concept line */}
      {conceptTitle && (
        <div
          style={{
            marginTop: 10,
            fontFamily: FONTS.title,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: THEME_COLORS.white.muted,
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          {conceptTitle}
        </div>
      )}
    </div>
  );
};
