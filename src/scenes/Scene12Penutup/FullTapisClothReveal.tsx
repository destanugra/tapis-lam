// src/scenes/Scene12Penutup/FullTapisClothReveal.tsx
import React from "react";
import { Easing, interpolate, useVideoConfig } from "remotion";
import { BelahKetupat } from "../../components/motifs/BelahKetupat";
import { BintangDelapan } from "../../components/motifs/BintangDelapan";
import { PohonHayat } from "../../components/motifs/PohonHayat";
import { PucukRebung } from "../../components/motifs/PucukRebung";
import { THEME_COLORS } from "../../constants/theme";

interface FullTapisClothRevealProps {
  currentFrame: number;
}

export const FullTapisClothReveal: React.FC<FullTapisClothRevealProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // Slow pull-out camera effect (camera slowly pulls back from close-up embroidery to full woven cloth)
  const cameraScale = interpolate(
    currentFrame,
    [0, 300],
    [1.35, 0.92],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  // Geometry wireframe soft glow that transitions back into pure couched gold thread
  // Starts high, pulses softly, then gently settles into glowing golden textile
  const geometryGlow = interpolate(
    currentFrame,
    [0, 100, 240, 340],
    [1.0, 0.85, 0.5, 0.25],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Metallic gold thread sheen sweep across the cloth
  const shimmerX = interpolate(
    (currentFrame * 4) % 1200,
    [0, 1200],
    [-200, 1000]
  );

  // Vertical scrolling movement simulating the majestic viewing of the whole sarong length
  const scrollY = interpolate(
    currentFrame,
    [0, 360],
    [0, -180],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0, 0, 1) }
  );

  return (
    <div
      style={{
        position: "relative",
        width: 860,
        height: 1400,
        transform: `scale(${cameraScale}) translateY(${scrollY}px)`,
        transformOrigin: "430px 650px",
        willChange: "transform",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* 1. Deep Woven Tapis Border & Cloth Mat */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #090B1E 0%, #101030 50%, #07091A 100%)",
          border: `3px solid ${THEME_COLORS.gold.primary}`,
          borderRadius: 24,
          boxShadow: `0 25px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(229, 169, 60, 0.3)`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Subtle authentic woven cloth line texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.15,
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(229, 169, 60, 0.15) 3px,
              rgba(229, 169, 60, 0.15) 4px
            ), repeating-linear-gradient(
              90deg,
              transparent,
              transparent 4px,
              rgba(255, 255, 255, 0.08) 4px,
              rgba(255, 255, 255, 0.08) 5px
            )`,
            pointerEvents: "none",
          }}
        />

        {/* Outer Gold Border Lajur (Sasab) */}
        <div
          style={{
            position: "absolute",
            top: 20,
            bottom: 20,
            left: 24,
            right: 24,
            border: `2px dashed ${THEME_COLORS.gold.light}`,
            borderRadius: 16,
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />

        {/* Softly Glowing Geometry Coordinate Wireframe Overlay */}
        <svg
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            inset: 0,
            opacity: geometryGlow,
            pointerEvents: "none",
          }}
        >
          <defs>
            <linearGradient id="glowLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(20, 184, 166, 0.1)" />
              <stop offset="50%" stopColor="rgba(20, 184, 166, 0.6)" />
              <stop offset="100%" stopColor="rgba(20, 184, 166, 0.1)" />
            </linearGradient>
          </defs>

          {/* Vertical symmetry lines */}
          <line x1="286" y1="0" x2="286" y2="100%" stroke="url(#glowLineGrad)" strokeWidth="1.5" strokeDasharray="6 6" />
          <line x1="430" y1="0" x2="430" y2="100%" stroke="rgba(229, 169, 60, 0.5)" strokeWidth="2" strokeDasharray="8 6" />
          <line x1="574" y1="0" x2="574" y2="100%" stroke="url(#glowLineGrad)" strokeWidth="1.5" strokeDasharray="6 6" />

          {/* Horizontal transformation division lines */}
          {[160, 360, 560, 760, 960, 1160].map((y) => (
            <line
              key={y}
              x1="40"
              y1={y}
              x2="820"
              y2={y}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
          ))}
        </svg>

        {/* 3 Main Vertical Lajur (Columns) of Traditional Motifs */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            padding: "40px 30px",
            gap: 20,
            zIndex: 5,
          }}
        >
          {/* Column 1: Pucuk Rebung & Belah Ketupat Lajur */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
            <PucukRebung width={150} height={175} drawProgress={1} glow={true} />
            <BelahKetupat width={130} height={130} drawProgress={1} glow={false} />
            <PucukRebung width={150} height={175} drawProgress={1} glow={true} />
            <BelahKetupat width={130} height={130} drawProgress={1} glow={false} />
            <PucukRebung width={150} height={175} drawProgress={1} glow={true} />
          </div>

          {/* Column 2 (Center Masterpiece): Pohon Hayat & Bintang Delapan */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
            <BintangDelapan size={160} drawProgress={1} glow={true} />
            <PohonHayat width={220} height={250} drawProgress={1} reflectionProgress={1} glow={true} />
            <BintangDelapan size={160} drawProgress={1} glow={true} />
            <PohonHayat width={220} height={250} drawProgress={1} reflectionProgress={1} glow={true} />
          </div>

          {/* Column 3: Mirrored Pucuk Rebung & Belah Ketupat Lajur */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
            <PucukRebung width={150} height={175} drawProgress={1} glow={true} />
            <BelahKetupat width={130} height={130} drawProgress={1} glow={false} />
            <PucukRebung width={150} height={175} drawProgress={1} glow={true} />
            <BelahKetupat width={130} height={130} drawProgress={1} glow={false} />
            <PucukRebung width={150} height={175} drawProgress={1} glow={true} />
          </div>
        </div>

        {/* Couched Gold Thread Sheen Glint Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: shimmerX,
            width: 140,
            background: "linear-gradient(90deg, transparent 0%, rgba(255, 230, 160, 0.28) 50%, transparent 100%)",
            transform: "skewX(-25deg)",
            pointerEvents: "none",
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </div>
  );
};
