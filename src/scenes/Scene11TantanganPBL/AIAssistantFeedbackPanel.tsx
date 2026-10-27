// src/scenes/Scene11TantanganPBL/AIAssistantFeedbackPanel.tsx
import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, SAFE_AREAS, THEME_COLORS } from "../../constants/theme";

interface AIAssistantFeedbackPanelProps {
  currentFrame: number;
}

export const AIAssistantFeedbackPanel: React.FC<AIAssistantFeedbackPanelProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // Entrance spring (frames 540+)
  const entrance = spring({
    frame: currentFrame - 540,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const panelOpacity = interpolate(
    currentFrame,
    [530, 560, 850, 890],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (panelOpacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 1110,
        left: SAFE_AREAS.horizontal,
        width: SAFE_AREAS.contentWidth,
        opacity: panelOpacity,
        transform: `translateY(${(1 - entrance) * 35}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        zIndex: 25,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, rgba(8, 20, 44, 0.96) 0%, rgba(4, 10, 24, 0.98) 100%)",
          border: `1.5px solid ${THEME_COLORS.teal.light}`,
          borderRadius: 20,
          padding: "18px 24px",
          boxShadow: "0 14px 40px rgba(0, 0, 0, 0.75), 0 0 25px rgba(20, 184, 166, 0.4)",
          backdropFilter: "blur(18px)",
        }}
      >
        {/* Header with AI Pill */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🤖</span>
            <span
              style={{
                fontFamily: FONTS.sans,
                fontSize: 15,
                fontWeight: 800,
                color: THEME_COLORS.teal.light,
                letterSpacing: 1.5,
              }}
            >
              ASISTEN AI PEMBELAJARAN
            </span>
          </div>

          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              color: THEME_COLORS.white.muted,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              padding: "3px 10px",
              borderRadius: 6,
            }}
          >
            Mitra Evaluasi & Refleksi
          </div>
        </div>

        {/* Example Student Query & AI Evaluation */}
        <div
          style={{
            backgroundColor: "rgba(4, 7, 17, 0.6)",
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ fontFamily: FONTS.sans, fontSize: 13, color: THEME_COLORS.white.muted }}>
            <strong style={{ color: THEME_COLORS.gold.light }}>Rancangan Tim:</strong> Komposisi Translasi T(5,0) diikuti Refleksi Sumbu X.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              fontFamily: FONTS.sans,
              fontSize: 13,
              color: THEME_COLORS.teal.light,
              backgroundColor: "rgba(20, 184, 166, 0.12)",
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid rgba(20, 184, 166, 0.25)",
            }}
          >
            <span style={{ fontSize: 16 }}>✅</span>
            <span>
              <strong>Umpan Balik AI:</strong> Perhitungan koordinat tepat! Terbentuk pola pita Refleksi Geser (Glide Reflection). Makna tunas rebung melambangkan kepemimpinan yang kokoh.
            </span>
          </div>
        </div>

        {/* Human Agency Note */}
        <div
          style={{
            marginTop: 6,
            fontFamily: FONTS.sans,
            fontSize: 12,
            fontStyle: "italic",
            color: THEME_COLORS.white.muted,
            textAlign: "center",
          }}
        >
          *AI adalah pendamping visual untuk memverifikasi penalaran matematis kelompokmu.
        </div>
      </div>
    </div>
  );
};
