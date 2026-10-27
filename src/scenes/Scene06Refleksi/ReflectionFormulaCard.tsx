// src/scenes/Scene06Refleksi/ReflectionFormulaCard.tsx
import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, SAFE_AREAS, THEME_COLORS } from "../../constants/theme";

interface ReflectionFormulaCardProps {
  currentFrame: number;
}

export const ReflectionFormulaCard: React.FC<ReflectionFormulaCardProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: currentFrame - 35,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const cardOpacity = interpolate(
    currentFrame,
    [25, 55, 850, 910],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Highlighting steps based on timeline:
  // Step 1 (frames 0 - 280): Concept of designing half the motif
  // Step 2 (frames 280 - 620): Coordinate formula My(x,y) = (-x,y) & equal distance d
  // Step 3 (frames 620 - 930): Bilateral symmetry & inverted orientation
  const isStep2 = currentFrame >= 280 && currentFrame < 620;
  const isStep3 = currentFrame >= 620;

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
          border: `1.5px solid ${isStep2 ? THEME_COLORS.orange.primary : "rgba(229, 169, 60, 0.35)"}`,
          borderRadius: 20,
          padding: "20px 28px",
          boxShadow: isStep2
            ? "0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(249, 115, 22, 0.35)"
            : "0 12px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(229, 169, 60, 0.15)",
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
                backgroundColor: THEME_COLORS.orange.primary,
                boxShadow: `0 0 10px ${THEME_COLORS.orange.primary}`,
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
              {isStep3 ? "Sumbu Simetri Bilateral" : isStep2 ? "Persamaan Titik Bayangan" : "Prinsip Cermin Separuh Motif"}
            </span>
          </div>

          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              color: THEME_COLORS.white.muted,
              backgroundColor: "rgba(255,255,255,0.06)",
              padding: "3px 10px",
              borderRadius: 6,
            }}
          >
            Garis Cermin: <span style={{ color: THEME_COLORS.orange.light, fontWeight: "bold" }}>Sumbu Y (x = 0)</span>
          </div>
        </div>

        {/* Primary Formula Box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(4, 7, 17, 0.65)",
            padding: "12px 18px",
            borderRadius: 12,
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div style={{ fontFamily: FONTS.mono, fontSize: 24, fontWeight: 700, color: THEME_COLORS.gold.light }}>
            Mᵧ(x, y) = (-x, y)
          </div>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 13,
              fontWeight: 600,
              color: THEME_COLORS.orange.light,
              backgroundColor: "rgba(249, 115, 22, 0.15)",
              padding: "4px 10px",
              borderRadius: 6,
              border: "1px solid rgba(249, 115, 22, 0.3)",
            }}
          >
            Orientasi Terbalik
          </div>
        </div>

        {/* Distance & Property Row */}
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Equal distance property */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: FONTS.mono,
              fontSize: 16,
              padding: "7px 12px",
              borderRadius: 8,
              backgroundColor: isStep2 ? "rgba(249, 115, 22, 0.12)" : "transparent",
              color: THEME_COLORS.white.pure,
            }}
          >
            <span>
              Jarak Titik ke Cermin: <strong style={{ color: THEME_COLORS.gold.light }}>d(P, cermin)</strong>
            </span>
            <span style={{ color: THEME_COLORS.orange.light, fontWeight: "bold" }}>
              = d(P', cermin) = |x|
            </span>
          </div>

          {/* Coordinate conversion example */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: FONTS.mono,
              fontSize: 16,
              padding: "7px 12px",
              borderRadius: 8,
              backgroundColor: isStep2 ? "rgba(249, 115, 22, 0.12)" : "transparent",
              color: THEME_COLORS.white.pure,
            }}
          >
            <span>
              Titik Asal: <strong style={{ color: THEME_COLORS.gold.light }}>P(x, y)</strong>
            </span>
            <span style={{ color: THEME_COLORS.teal.light }}>
              → Bayangan: <strong style={{ color: "#FFF" }}>P'(-x, y)</strong>
            </span>
          </div>
        </div>

        {/* Philosophy Note */}
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
          <span>⚖️</span>
          <span>
            {isStep3
              ? "Ukuran tetap sama (isometrik), menghasilkan keseimbangan kosmis pohon hayat yang sempurna."
              : "Cukup tenun separuh motif, refleksi terhadap sumbu simetri melengkapi keindahan kain tapis."}
          </span>
        </div>
      </div>
    </div>
  );
};
