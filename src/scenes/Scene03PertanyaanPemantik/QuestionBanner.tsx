// src/scenes/Scene03PertanyaanPemantik/QuestionBanner.tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface QuestionBannerProps {
  startFrame?: number;
  endFrame?: number;
}

export const QuestionBanner: React.FC<QuestionBannerProps> = ({
  startFrame = 40,
  endFrame = 220,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > endFrame) return null;

  const progress = frame - startFrame;
  const enterSpring = spring({
    frame: progress,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const exitOpacity = interpolate(
    frame,
    [endFrame - 15, endFrame],
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
        left: 54,
        right: 54,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity,
        transform: `translateY(${(1 - enterSpring) * 24}px) scale(${0.94 + enterSpring * 0.06})`,
        zIndex: 55,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          padding: "36px 38px",
          borderRadius: 28,
          background: "linear-gradient(180deg, rgba(7, 13, 30, 0.94) 0%, rgba(3, 6, 15, 0.97) 100%)",
          border: `2px solid rgba(229, 169, 60, 0.65)`,
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(229, 169, 60, 0.28)`,
          backdropFilter: "blur(18px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Top Badge: PERTANYAAN PEMANTIK */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            padding: "6px 18px",
            borderRadius: 16,
            backgroundColor: "rgba(249, 115, 22, 0.15)",
            border: `1px solid ${THEME_COLORS.orange.primary}`,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              transform: "rotate(45deg)",
              backgroundColor: THEME_COLORS.orange.primary,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: THEME_COLORS.orange.light,
              textTransform: "uppercase",
            }}
          >
            REFLEKSI & INKUIRI
          </span>
        </div>

        {/* Big Prominent Question */}
        <h2
          style={{
            margin: 0,
            fontFamily: FONTS.title,
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.38,
            letterSpacing: "0.02em",
            color: "#FFFDF0",
            textShadow: `0 4px 18px rgba(0,0,0,0.95), 0 0 25px ${THEME_COLORS.gold.glow}`,
          }}
        >
          “Bagaimana penyulam membuat pola berulang{" "}
          <span
            style={{
              background: `linear-gradient(135deg, #FFF 0%, #FDE047 50%, #E5A93C 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "underline",
              textDecorationColor: THEME_COLORS.gold.primary,
              textUnderlineOffset: 8,
            }}
          >
            serapi ini
          </span>{" "}
          tanpa komputer?”
        </h2>

        {/* Sub-hint */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: 0.85,
          }}
        >
          <div style={{ width: 40, height: 1, backgroundColor: THEME_COLORS.gold.light }} />
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: THEME_COLORS.teal.light,
            }}
          >
            Tanpa Penggaris Digital • Tanpa Perangkat Lunak
          </span>
          <div style={{ width: 40, height: 1, backgroundColor: THEME_COLORS.gold.light }} />
        </div>
      </div>
    </div>
  );
};
