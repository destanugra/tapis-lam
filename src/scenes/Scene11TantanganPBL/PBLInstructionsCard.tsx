// src/scenes/Scene11TantanganPBL/PBLInstructionsCard.tsx
import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, SAFE_AREAS, THEME_COLORS } from "../../constants/theme";

interface PBLInstructionsCardProps {
  currentFrame: number;
}

export const PBLInstructionsCard: React.FC<PBLInstructionsCardProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: currentFrame - 20,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Outro transition
  const cardOpacity = interpolate(
    currentFrame,
    [15, 45, 840, 890],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Progressive reveal of the 4 challenge steps
  const step1Prog = spring({ frame: currentFrame - 45, fps, config: { damping: 14, stiffness: 110 } });
  const step2Prog = spring({ frame: currentFrame - 100, fps, config: { damping: 14, stiffness: 110 } });
  const step3Prog = spring({ frame: currentFrame - 160, fps, config: { damping: 14, stiffness: 110 } });
  const step4Prog = spring({ frame: currentFrame - 220, fps, config: { damping: 14, stiffness: 110 } });

  const steps = [
    { num: "1", text: "Tentukan koordinat motif dasar", prog: step1Prog, color: THEME_COLORS.gold.light },
    { num: "2", text: "Tuliskan transformasi & koordinat bayangannya", prog: step2Prog, color: THEME_COLORS.teal.light },
    { num: "3", text: "Jelaskan pola geometri yang terbentuk (Pola Pita)", prog: step3Prog, color: THEME_COLORS.orange.light },
    { num: "4", text: "Sampaikan makna budaya yang ingin direpresentasikan", prog: step4Prog, color: "#C084FC" },
  ];

  if (cardOpacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 240,
        left: SAFE_AREAS.horizontal,
        width: SAFE_AREAS.contentWidth,
        opacity: cardOpacity,
        transform: `translateY(${(1 - entrance) * 30}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        zIndex: 20,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, rgba(13, 23, 48, 0.94) 0%, rgba(7, 13, 30, 0.96) 100%)",
          border: `1.5px solid ${THEME_COLORS.gold.primary}`,
          borderRadius: 20,
          padding: "20px 26px",
          boxShadow: "0 14px 40px rgba(0, 0, 0, 0.7), 0 0 24px rgba(229, 169, 60, 0.25)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Header Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontFamily: FONTS.title,
                fontSize: 20,
                fontWeight: 900,
                color: THEME_COLORS.gold.light,
                letterSpacing: 2,
              }}
            >
              TANTANGAN UNTUKMU
            </span>
          </div>

          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              color: THEME_COLORS.teal.light,
              backgroundColor: "rgba(20, 184, 166, 0.15)",
              padding: "4px 10px",
              borderRadius: 6,
              border: `1px solid ${THEME_COLORS.teal.primary}`,
              fontWeight: "bold",
            }}
          >
            Problem-Based Learning
          </div>
        </div>

        {/* Challenge Mission Statement */}
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            fontWeight: 700,
            color: THEME_COLORS.white.pure,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "10px 16px",
            borderRadius: 10,
            borderLeft: `4px solid ${THEME_COLORS.gold.primary}`,
            marginBottom: 12,
          }}
        >
          “Rancang satu lajur Tapis baru dengan minimal dua transformasi geometri!”
        </div>

        {/* 4 Step Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {steps.map((st) => (
            <div
              key={st.num}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                opacity: st.prog,
                transform: `translateX(${(1 - st.prog) * 20}px)`,
                backgroundColor: "rgba(4, 7, 17, 0.5)",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  backgroundColor: "rgba(229, 169, 60, 0.2)",
                  border: `1.5px solid ${st.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONTS.mono,
                  fontSize: 14,
                  fontWeight: 800,
                  color: st.color,
                }}
              >
                {st.num}
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 14,
                  fontWeight: 600,
                  color: THEME_COLORS.white.soft,
                }}
              >
                {st.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
