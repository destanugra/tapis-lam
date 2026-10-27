// src/scenes/Scene09RefleksiGeser/GlideReflectionFormulaCard.tsx
import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, SAFE_AREAS, THEME_COLORS } from "../../constants/theme";

interface GlideReflectionFormulaCardProps {
  currentFrame: number;
}

export const GlideReflectionFormulaCard: React.FC<GlideReflectionFormulaCardProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: currentFrame - 30,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const cardOpacity = interpolate(
    currentFrame,
    [25, 55, 880, 940],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Sequence stages:
  // Stage 1: Refleksi (frames 0 - 280)
  // Stage 2: Translasi setelah Refleksi (frames 280 - 580)
  // Stage 3: Pola Pita 7 Jenis (frames 580 - 960)
  const isStage2 = currentFrame >= 280 && currentFrame < 580;
  const isStage3 = currentFrame >= 580;

  if (cardOpacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 1200,
        left: SAFE_AREAS.horizontal,
        width: SAFE_AREAS.contentWidth,
        opacity: cardOpacity,
        transform: `translateY(${(1 - entrance) * 35}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        zIndex: 20,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, rgba(13, 23, 48, 0.94) 0%, rgba(7, 13, 30, 0.96) 100%)",
          border: `1.5px solid ${isStage2 ? THEME_COLORS.teal.light : THEME_COLORS.orange.primary}`,
          borderRadius: 20,
          padding: "20px 28px",
          boxShadow: isStage2
            ? "0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(20, 184, 166, 0.35)"
            : "0 12px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(249, 115, 22, 0.2)",
          backdropFilter: "blur(16px)",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Header row with badges */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: THEME_COLORS.orange.light,
                boxShadow: `0 0 10px ${THEME_COLORS.orange.light}`,
              }}
            />
            <span
              style={{
                fontFamily: FONTS.sans,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 2,
                color: THEME_COLORS.orange.light,
                textTransform: "uppercase",
              }}
            >
              Komposisi Transformasi
            </span>
          </div>

          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              color: THEME_COLORS.gold.light,
              backgroundColor: "rgba(229, 169, 60, 0.15)",
              padding: "4px 12px",
              borderRadius: 8,
              border: `1px solid ${THEME_COLORS.gold.primary}`,
              fontWeight: "bold",
            }}
          >
            Pola Pita (Frieze Pattern)
          </div>
        </div>

        {/* Primary Screen Formula Box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(4, 7, 17, 0.65)",
            padding: "12px 20px",
            borderRadius: 12,
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div style={{ fontFamily: FONTS.mono, fontSize: 23, fontWeight: 800, color: THEME_COLORS.gold.light }}>
            Refleksi + Translasi = Refleksi Geser
          </div>
        </div>

        {/* Mathematical Composition Operator */}
        <div
          style={{
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: FONTS.mono,
            fontSize: 16,
            padding: "8px 14px",
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <span style={{ color: THEME_COLORS.white.pure }}>
            Operator Komposisi: <strong style={{ color: THEME_COLORS.teal.light }}>G = Tᵥ ∘ Mₘ</strong>
          </span>
          <span style={{ color: THEME_COLORS.orange.light, fontSize: 13 }}>
            (Refleksi dahulu → lalu Geser)
          </span>
        </div>

        {/* 7 Frieze Patterns Note */}
        <div
          style={{
            marginTop: 10,
            padding: "8px 14px",
            backgroundColor: "rgba(229, 169, 60, 0.12)",
            borderRadius: 8,
            border: "1px solid rgba(229, 169, 60, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: FONTS.sans,
            fontSize: 13,
            color: THEME_COLORS.gold.light,
          }}
        >
          <span>🏺</span>
          <span>
            {isStage3
              ? "Dalam teori grup matematika, hanya ada 7 jenis pola pita (frieze group) di dunia, dan semuanya hadir pada ornamen kain tapis Lampung!"
              : "Menghasilkan pola berselang atas-bawah yang simetris dan dinamis."}
          </span>
        </div>
      </div>
    </div>
  );
};
