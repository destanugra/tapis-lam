// src/scenes/Scene05Translasi/TranslationFormulaCard.tsx
import React from "react";
import { Easing, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, SAFE_AREAS, THEME_COLORS } from "../../constants/theme";

interface TranslationFormulaCardProps {
  currentFrame: number;
}

export const TranslationFormulaCard: React.FC<TranslationFormulaCardProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame: currentFrame - 40,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Fade out towards outro transition
  const cardOpacity = interpolate(
    currentFrame,
    [30, 60, 960, 1010],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Active step highlight
  // Step 1: Definition (frames 60 - 320)
  // Step 2: Vector calculation (frames 320 - 680)
  // Step 3: Repeated lajur application (frames 680 - 1000)
  const isStep1 = currentFrame < 320;
  const isStep2 = currentFrame >= 320 && currentFrame < 680;
  const isStep3 = currentFrame >= 680;

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
      {/* Formula Glassmorphic Box */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(13, 23, 48, 0.94) 0%, rgba(7, 13, 30, 0.96) 100%)",
          border: `1.5px solid ${isStep2 ? THEME_COLORS.teal.primary : "rgba(229, 169, 60, 0.35)"}`,
          borderRadius: 20,
          padding: "20px 28px",
          boxShadow: isStep2
            ? "0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(20, 184, 166, 0.35)"
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
                backgroundColor: isStep2 ? THEME_COLORS.teal.light : THEME_COLORS.gold.primary,
                boxShadow: `0 0 10px ${isStep2 ? THEME_COLORS.teal.light : THEME_COLORS.gold.primary}`,
              }}
            />
            <span
              style={{
                fontFamily: FONTS.sans,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 2,
                color: isStep2 ? THEME_COLORS.teal.light : THEME_COLORS.gold.primary,
                textTransform: "uppercase",
              }}
            >
              {isStep3 ? "Aplikasi Lajur Tapis" : isStep2 ? "Transformasi Vektor Titik" : "Definisi Geometri"}
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
            Vektor: <span style={{ color: THEME_COLORS.teal.light, fontWeight: "bold" }}>v⃗ = (5, 0)</span>
          </div>
        </div>

        {/* Primary Formula Row */}
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
            T(a,b) : (x, y) → (x + a, y + b)
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
            Isometri (Ukuran Tetap)
          </div>
        </div>

        {/* Dynamic Concrete Step Display */}
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Point A */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: FONTS.mono,
              fontSize: 17,
              padding: "6px 12px",
              borderRadius: 8,
              backgroundColor: isStep2 ? "rgba(20, 184, 166, 0.1)" : "transparent",
              color: THEME_COLORS.white.pure,
            }}
          >
            <span>
              Titik <strong style={{ color: THEME_COLORS.gold.light }}>A(0, 0)</strong>
            </span>
            <span style={{ color: THEME_COLORS.teal.light }}>
              → A'(0 + 5, 0 + 0) = <strong style={{ color: "#FFF" }}>(5, 0)</strong>
            </span>
          </div>

          {/* Point B */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: FONTS.mono,
              fontSize: 17,
              padding: "6px 12px",
              borderRadius: 8,
              backgroundColor: isStep2 ? "rgba(20, 184, 166, 0.1)" : "transparent",
              color: THEME_COLORS.white.pure,
            }}
          >
            <span>
              Titik <strong style={{ color: THEME_COLORS.gold.light }}>B(4, 0)</strong>
            </span>
            <span style={{ color: THEME_COLORS.teal.light }}>
              → B'(4 + 5, 0 + 0) = <strong style={{ color: "#FFF" }}>(9, 0)</strong>
            </span>
          </div>

          {/* Point C */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: FONTS.mono,
              fontSize: 17,
              padding: "6px 12px",
              borderRadius: 8,
              backgroundColor: isStep2 ? "rgba(20, 184, 166, 0.1)" : "transparent",
              color: THEME_COLORS.white.pure,
            }}
          >
            <span>
              Titik <strong style={{ color: THEME_COLORS.gold.light }}>C(2, 6)</strong>
            </span>
            <span style={{ color: THEME_COLORS.teal.light }}>
              → C'(2 + 5, 6 + 0) = <strong style={{ color: "#FFF" }}>(7, 6)</strong>
            </span>
          </div>
        </div>

        {/* Footer note on Repetition forming Lajur */}
        {isStep3 && (
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
              Translasi berulang k kali: <strong>T_k = (x + 5k, y)</strong> menghasilkan deretan simetris lajur motif Pucuk Rebung pada kain tapis!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
