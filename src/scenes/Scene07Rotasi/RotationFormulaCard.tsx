// src/scenes/Scene07Rotasi/RotationFormulaCard.tsx
import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, SAFE_AREAS, THEME_COLORS } from "../../constants/theme";

interface RotationFormulaCardProps {
  currentFrame: number;
}

export const RotationFormulaCard: React.FC<RotationFormulaCardProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: currentFrame - 30,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const cardOpacity = interpolate(
    currentFrame,
    [20, 50, 700, 760],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Highlighting steps:
  // Step 1: Petal rotation 45 deg (frames 0 - 240)
  // Step 2: 8-fold repetition (frames 240 - 520)
  // Step 3: Order 8 symmetry & 360 deg closure (frames 520 - 780)
  const isStep2 = currentFrame >= 240 && currentFrame < 520;
  const isStep3 = currentFrame >= 520;

  if (cardOpacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 1220,
        left: SAFE_AREAS.horizontal,
        width: SAFE_AREAS.contentWidth,
        opacity: cardOpacity,
        transform: `translateY(${(1 - entrance) * 35}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        zIndex: 20,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, rgba(13, 23, 48, 0.94) 0%, rgba(7, 13, 30, 0.96) 100%)",
          border: `1.5px solid ${isStep3 ? THEME_COLORS.gold.light : THEME_COLORS.orange.primary}`,
          borderRadius: 20,
          padding: "20px 28px",
          boxShadow: isStep3
            ? "0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(229, 169, 60, 0.35)"
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
              Rotasi Pusat O(0,0)
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
            Simetri Putar Orde 8
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
          <div style={{ fontFamily: FONTS.mono, fontSize: 26, fontWeight: 800, color: THEME_COLORS.gold.light }}>
            45° × 8 = 360°
          </div>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 13,
              fontWeight: 600,
              color: THEME_COLORS.teal.light,
              backgroundColor: "rgba(20, 184, 166, 0.15)",
              padding: "4px 10px",
              borderRadius: 6,
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            Satu Putaran Penuh
          </div>
        </div>

        {/* Dynamic Rotation Details */}
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: FONTS.mono,
              fontSize: 16,
              padding: "7px 12px",
              borderRadius: 8,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              color: THEME_COLORS.white.pure,
            }}
          >
            <span>
              Sudut Rotasi Dasar: <strong style={{ color: THEME_COLORS.orange.light }}>θ = 45° (π/4 rad)</strong>
            </span>
            <span style={{ color: THEME_COLORS.teal.light }}>
              Pusat Putar: <strong style={{ color: "#FFF" }}>O(0, 0)</strong>
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: FONTS.mono,
              fontSize: 15,
              padding: "7px 12px",
              borderRadius: 8,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              color: THEME_COLORS.white.pure,
            }}
          >
            <span>
              Matriks Rotasi: <strong style={{ color: THEME_COLORS.gold.light }}>R(O, 45°)</strong>
            </span>
            <span style={{ color: THEME_COLORS.white.muted }}>
              (x', y') = (x cos θ - y sin θ, x sin θ + y cos θ)
            </span>
          </div>
        </div>

        {/* Cultural Philosophy */}
        <div
          style={{
            marginTop: 12,
            padding: "10px 14px",
            backgroundColor: "rgba(229, 169, 60, 0.12)",
            borderRadius: 8,
            border: "1px solid rgba(229, 169, 60, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: FONTS.sans,
            fontSize: 14,
            color: THEME_COLORS.gold.light,
          }}
        >
          <span>✨</span>
          <span>
            Setiap putaran 45°, motif kembali menempati bingkainya secara presisi, melambangkan harmoni kosmis dan keseimbangan 8 penjuru mata angin.
          </span>
        </div>
      </div>
    </div>
  );
};
