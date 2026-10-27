// src/scenes/Scene10Rangkuman/SummaryFourPanels.tsx
import React from "react";
import { Easing, interpolate, spring, useVideoConfig } from "remotion";
import { BelahKetupat } from "../../components/motifs/BelahKetupat";
import { BintangDelapan } from "../../components/motifs/BintangDelapan";
import { PohonHayat } from "../../components/motifs/PohonHayat";
import { PucukRebung } from "../../components/motifs/PucukRebung";
import { FONTS, SAFE_AREAS, THEME_COLORS } from "../../constants/theme";

interface SummaryFourPanelsProps {
  currentFrame: number;
}

export const SummaryFourPanels: React.FC<SummaryFourPanelsProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // Staggered entrance for the 4 panels
  const entrance1 = spring({ frame: currentFrame - 10, fps, config: { damping: 14, stiffness: 100 } });
  const entrance2 = spring({ frame: currentFrame - 40, fps, config: { damping: 14, stiffness: 100 } });
  const entrance3 = spring({ frame: currentFrame - 70, fps, config: { damping: 14, stiffness: 100 } });
  const entrance4 = spring({ frame: currentFrame - 100, fps, config: { damping: 14, stiffness: 100 } });

  // Outro convergence: 4 panels merge into center empty field (frames 430 - 510)
  const convergeProg = interpolate(
    currentFrame,
    [430, 495],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.4, 0, 0.1, 1) }
  );

  // Micro-animations within each panel:
  // 1. Translasi micro-slide
  const transShiftX = interpolate(
    Math.sin((currentFrame / 20) * Math.PI),
    [-1, 1],
    [-20, 20]
  );

  // 2. Refleksi micro-flip
  const refleksiFlip = interpolate(
    Math.sin((currentFrame / 22) * Math.PI),
    [-1, 1],
    [0.7, 1.0]
  );

  // 3. Rotasi micro-spin
  const rotAngle = (currentFrame * 1.5) % 360;

  // 4. Dilatasi micro-scale
  const dilScale = interpolate(
    Math.sin((currentFrame / 24) * Math.PI),
    [-1, 1],
    [0.72, 1.0]
  );

  const panelsData = [
    {
      id: "panel-translasi",
      title: "1. TRANSLASI",
      subtitle: "Menggeser",
      formula: "T(a,b) : (x+a, y+b)",
      property: "Ukuran & Bentuk Tetap (Isometri)",
      color: THEME_COLORS.teal.light,
      borderColor: THEME_COLORS.teal.primary,
      entrance: entrance1,
      targetY: 0,
      renderPreview: () => (
        <div style={{ transform: `translateX(${transShiftX}px)` }}>
          <PucukRebung width={80} height={100} drawProgress={1} glow={false} />
        </div>
      ),
    },
    {
      id: "panel-refleksi",
      title: "2. REFLEKSI",
      subtitle: "Mencerminkan",
      formula: "Mᵧ : (-x, y)",
      property: "Ukuran Tetap, Orientasi Terbalik",
      color: THEME_COLORS.orange.light,
      borderColor: THEME_COLORS.orange.primary,
      entrance: entrance2,
      targetY: 195,
      renderPreview: () => (
        <div style={{ opacity: refleksiFlip }}>
          <PohonHayat width={90} height={105} drawProgress={1} reflectionProgress={refleksiFlip} glow={false} />
        </div>
      ),
    },
    {
      id: "panel-rotasi",
      title: "3. ROTASI",
      subtitle: "Memutar",
      formula: "R(O, 45°) : 45° × 8 = 360°",
      property: "Ukuran Tetap, Pusat O(0,0)",
      color: THEME_COLORS.gold.light,
      borderColor: THEME_COLORS.gold.primary,
      entrance: entrance3,
      targetY: 390,
      renderPreview: () => (
        <div style={{ transform: `rotate(${rotAngle}deg)` }}>
          <BintangDelapan size={95} drawProgress={1} glow={false} />
        </div>
      ),
    },
    {
      id: "panel-dilatasi",
      title: "4. DILATASI",
      subtitle: "Mengubah Ukuran",
      formula: "D_{[O, k]} : (kx, ky)",
      property: "Bentuk Tetap Sebangun, Ukuran Berubah",
      color: "#93C5FD",
      borderColor: "#3B82F6",
      entrance: entrance4,
      targetY: 585,
      renderPreview: () => (
        <div style={{ transform: `scale(${dilScale})` }}>
          <BelahKetupat width={95} height={95} drawProgress={1} glow={false} />
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: SAFE_AREAS.contentWidth,
        height: 820,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {panelsData.map((p, idx) => {
        // Calculate position during convergence
        const currentY = p.targetY * (1 - convergeProg) + 290 * convergeProg;
        const currentScale = (0.9 + p.entrance * 0.1) * (1 - convergeProg * 0.85);
        const currentOpacity = p.entrance * (1 - convergeProg);

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              top: currentY,
              left: 0,
              width: "100%",
              height: 175,
              opacity: currentOpacity,
              transform: `scale(${currentScale})`,
              background: "linear-gradient(135deg, rgba(13, 23, 48, 0.94) 0%, rgba(7, 13, 30, 0.96) 100%)",
              border: `1.5px solid ${p.borderColor}`,
              borderRadius: 20,
              padding: "16px 24px",
              boxShadow: `0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px ${p.borderColor}33`,
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              willChange: "transform, opacity, top",
            }}
          >
            {/* Left: Info & Formulas */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "70%" }}>
              {/* Title & Action */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 18,
                    fontWeight: 800,
                    color: p.color,
                    letterSpacing: 1.5,
                  }}
                >
                  {p.title}
                </span>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 13,
                    fontWeight: 700,
                    color: THEME_COLORS.white.pure,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    padding: "3px 10px",
                    borderRadius: 6,
                  }}
                >
                  {p.subtitle}
                </span>
              </div>

              {/* Formula Badge */}
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 17,
                  fontWeight: 700,
                  color: THEME_COLORS.gold.light,
                  backgroundColor: "rgba(4, 7, 17, 0.65)",
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "inline-block",
                  width: "fit-content",
                }}
              >
                {p.formula}
              </div>

              {/* Invariance property */}
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 13,
                  fontWeight: 600,
                  color: THEME_COLORS.white.muted,
                }}
              >
                {p.property}
              </div>
            </div>

            {/* Right: Micro Motion Graphics Preview Stage */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 14,
                backgroundColor: "rgba(4, 7, 17, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {p.renderPreview()}
            </div>
          </div>
        );
      })}

      {/* CENTER CONVERGENCE SPARKLE (Outro frames 430+) */}
      {convergeProg > 0 && (
        <div
          style={{
            position: "absolute",
            top: 360,
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: convergeProg,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 140 * convergeProg,
              height: 140 * convergeProg,
              borderRadius: "50%",
              backgroundColor: "rgba(229, 169, 60, 0.2)",
              border: `2px solid ${THEME_COLORS.gold.light}`,
              boxShadow: "0 0 50px rgba(229, 169, 60, 0.8)",
            }}
          />
        </div>
      )}
    </div>
  );
};
