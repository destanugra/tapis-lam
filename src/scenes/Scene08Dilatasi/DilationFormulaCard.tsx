// src/scenes/Scene08Dilatasi/DilationFormulaCard.tsx
import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, SAFE_AREAS, THEME_COLORS } from "../../constants/theme";

interface DilationFormulaCardProps {
  currentFrame: number;
}

export const DilationFormulaCard: React.FC<DilationFormulaCardProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: currentFrame - 35,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const cardOpacity = interpolate(
    currentFrame,
    [25, 55, 820, 880],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Highlighting steps:
  // Step 1: Definition & k = 0.75 (frames 0 - 280)
  // Step 2: Point P(0,4) -> P'(0,3) & length/area ratios (frames 280 - 620)
  // Step 3: Concentric nested rhombuses (frames 620 - 900)
  const isStep2 = currentFrame >= 280 && currentFrame < 620;
  const isStep3 = currentFrame >= 620;

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
          border: `1.5px solid ${isStep2 ? THEME_COLORS.teal.light : THEME_COLORS.gold.primary}`,
          borderRadius: 20,
          padding: "20px 28px",
          boxShadow: isStep2
            ? "0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(20, 184, 166, 0.35)"
            : "0 12px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(229, 169, 60, 0.2)",
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
                backgroundColor: THEME_COLORS.teal.light,
                boxShadow: `0 0 10px ${THEME_COLORS.teal.light}`,
              }}
            />
            <span
              style={{
                fontFamily: FONTS.sans,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 2,
                color: THEME_COLORS.teal.light,
                textTransform: "uppercase",
              }}
            >
              Dilatasi Terhadap Pusat O(0,0)
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
            Faktor Skala k = 0,75
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
          <div style={{ fontFamily: FONTS.mono, fontSize: 24, fontWeight: 800, color: THEME_COLORS.gold.light }}>
            D_{`[O, k]`}(x, y) = (kx, ky)
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 16,
              fontWeight: 700,
              color: THEME_COLORS.teal.light,
              backgroundColor: "rgba(20, 184, 166, 0.15)",
              padding: "4px 12px",
              borderRadius: 6,
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            P(0, 4) → P'(0, 3)
          </div>
        </div>

        {/* Length and Area Scaling Ratios */}
        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              fontFamily: FONTS.mono,
              fontSize: 14,
              padding: "8px 12px",
              borderRadius: 8,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span style={{ color: THEME_COLORS.white.muted, fontSize: 12 }}>Panjang Sisi:</span>
            <span style={{ color: THEME_COLORS.teal.light, fontWeight: "bold" }}>
              s' = 0,75 × s_awal
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              fontFamily: FONTS.mono,
              fontSize: 14,
              padding: "8px 12px",
              borderRadius: 8,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span style={{ color: THEME_COLORS.white.muted, fontSize: 12 }}>Luas Bidang:</span>
            <span style={{ color: THEME_COLORS.gold.light, fontWeight: "bold" }}>
              L' = 0,75² × L_awal = 0,5625 L
            </span>
          </div>
        </div>

        {/* Cultural Philosophy */}
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
          <span>🔷</span>
          <span>
            {isStep3
              ? "Pengecilan berulang menghasilkan motif belah ketupat bersarang (Sasab) yang anggun dan sebangun."
              : "Bentuk tetap sebangun; setiap titik menyusut proporsional menuju pusat O."}
          </span>
        </div>
      </div>
    </div>
  );
};
