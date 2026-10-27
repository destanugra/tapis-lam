// src/scenes/Scene12Penutup/ClosingTitleCard.tsx
import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, SAFE_AREAS, THEME_COLORS } from "../../constants/theme";

interface ClosingTitleCardProps {
  currentFrame: number;
}

export const ClosingTitleCard: React.FC<ClosingTitleCardProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // Entrance spring (starts at frame 100)
  const entrance = spring({
    frame: currentFrame - 100,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Opacity envelope: fades in around frame 90, holds strong, fades out near frame 340-360
  const cardOpacity = interpolate(
    currentFrame,
    [90, 130, 310, 355],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (cardOpacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 1140,
        left: SAFE_AREAS.horizontal,
        width: SAFE_AREAS.contentWidth,
        opacity: cardOpacity,
        transform: `translateY(${(1 - entrance) * 35}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 30,
      }}
    >
      <div
        style={{
          width: "100%",
          background: "linear-gradient(135deg, rgba(7, 13, 30, 0.95) 0%, rgba(3, 7, 18, 0.97) 100%)",
          border: `2px solid ${THEME_COLORS.gold.primary}`,
          borderRadius: 24,
          padding: "28px 32px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.85), 0 0 35px rgba(229, 169, 60, 0.35)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 10,
        }}
      >
        {/* Decorative Golden Divider Ribbon */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", justifyContent: "center" }}>
          <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, transparent, ${THEME_COLORS.gold.light})` }} />
          <span style={{ color: THEME_COLORS.gold.light, fontSize: 16 }}>✦</span>
          <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, ${THEME_COLORS.gold.light}, transparent)` }} />
        </div>

        {/* Primary Title: Matematika dalam Warisan Budaya */}
        <div
          style={{
            fontFamily: FONTS.title,
            fontSize: 27,
            fontWeight: 900,
            color: THEME_COLORS.gold.light,
            letterSpacing: 2.2,
            textTransform: "uppercase",
            textShadow: "0 0 20px rgba(229, 169, 60, 0.5)",
          }}
        >
          Matematika dalam Warisan Budaya
        </div>

        {/* Subtitle / Topic Badge */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 14,
            fontWeight: 700,
            color: THEME_COLORS.teal.light,
            backgroundColor: "rgba(20, 184, 166, 0.12)",
            padding: "5px 16px",
            borderRadius: 8,
            border: `1px solid ${THEME_COLORS.teal.primary}`,
            letterSpacing: 1.2,
          }}
        >
          Etnomatematika Transformasi Geometri Kain Tapis Lampung
        </div>

        {/* Institutional Affiliation: Universitas Muhammadiyah Kotabumi */}
        <div
          style={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 20,
              fontWeight: 800,
              color: THEME_COLORS.white.pure,
              letterSpacing: 1.5,
            }}
          >
            Universitas Muhammadiyah Kotabumi
          </div>

          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 13,
              fontWeight: 500,
              color: THEME_COLORS.white.muted,
              letterSpacing: 0.8,
            }}
          >
            Fakultas Keguruan dan Ilmu Pendidikan • Program Studi Pendidikan Matematika
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", justifyContent: "center", marginTop: 4 }}>
          <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, transparent, ${THEME_COLORS.teal.light})` }} />
          <span style={{ color: THEME_COLORS.teal.light, fontSize: 13 }}>◆</span>
          <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, ${THEME_COLORS.teal.light}, transparent)` }} />
        </div>
      </div>
    </div>
  );
};
