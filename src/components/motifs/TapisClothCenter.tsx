// src/components/motifs/TapisClothCenter.tsx
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME_COLORS } from "../../constants/theme";
import { BelahKetupat } from "./BelahKetupat";
import { BintangDelapan } from "./BintangDelapan";
import { PucukRebung } from "./PucukRebung";

interface TapisClothCenterProps {
  progress?: number; // 0 to 1
  scale?: number;
  rotation?: number;
  showCoordinates?: boolean;
}

export const TapisClothCenter: React.FC<TapisClothCenterProps> = ({
  progress = 1,
  scale = 1,
  rotation = 0,
  showCoordinates = false,
}) => {
  const frame = useCurrentFrame();

  // Subtle continuous gleam angle
  const shimmerAngle = (frame * 1.5) % 360;

  // Staggered progress for internal components
  const rebungTopProg = interpolate(progress, [0.1, 0.75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rebungBottomProg = interpolate(progress, [0.2, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const starProg = interpolate(progress, [0, 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ketupatProg = interpolate(progress, [0.35, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: 800,
        height: 1100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: "center center",
      }}
    >
      {/* 1. Underlying Geometric Coordinate Grid (Subtle Hint for Math Connection) */}
      <svg
        width="800"
        height="1100"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          overflow: "visible",
          opacity: showCoordinates ? 0.6 : 0.25 * progress,
        }}
      >
        <defs>
          <linearGradient id="coordGradX" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0" />
            <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="coordGradY" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0" />
            <stop offset="50%" stopColor="#F97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Central Axes: X (Toska) & Y (Jingga) */}
        <line
          x1="50"
          y1="550"
          x2="750"
          y2="550"
          stroke="url(#coordGradX)"
          strokeWidth="1.8"
          strokeDasharray="6 4"
        />
        <line
          x1="400"
          y1="100"
          x2="400"
          y2="1000"
          stroke="url(#coordGradY)"
          strokeWidth="1.8"
          strokeDasharray="6 4"
        />

        {/* Diagonal symmetry guides (Reflection axes) */}
        <line
          x1="150"
          y1="300"
          x2="650"
          y2="800"
          stroke="#F59E0B"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="4 6"
        />
        <line
          x1="650"
          y1="300"
          x2="150"
          y2="800"
          stroke="#F59E0B"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="4 6"
        />

        {/* Outer concentric geometric circles */}
        <circle
          cx="400"
          cy="550"
          r="260"
          fill="none"
          stroke="#14B8A6"
          strokeWidth="1.2"
          strokeOpacity="0.35"
          strokeDasharray="8 8"
        />
        <circle
          cx="400"
          cy="550"
          r="360"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1.2"
          strokeOpacity="0.25"
          strokeDasharray="12 6"
        />
      </svg>

      {/* 2. Top Pucuk Rebung Motif */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <PucukRebung
          width={310}
          height={380}
          drawProgress={rebungTopProg}
          glow={true}
        />
      </div>

      {/* 3. Center Complex: Bunga Bintang Delapan & Belah Ketupat Bersarang */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
        }}
      >
        {/* Background Belah Ketupat */}
        <div style={{ position: "absolute" }}>
          <BelahKetupat
            width={480}
            height={480}
            drawProgress={ketupatProg}
            glow={true}
          />
        </div>

        {/* Foreground Bunga Bintang Delapan */}
        <div style={{ position: "relative", zIndex: 5 }}>
          <BintangDelapan
            size={360}
            drawProgress={starProg}
            rotation={Math.sin(frame * 0.015) * 4}
            glow={true}
          />
        </div>
      </div>

      {/* 4. Bottom Pucuk Rebung Motif (Inverted / Mirrored) */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <PucukRebung
          width={310}
          height={380}
          drawProgress={rebungBottomProg}
          inverted={true}
          glow={true}
        />
      </div>

      {/* 5. Left and Right Flanking Diamond Accents */}
      <div
        style={{
          position: "absolute",
          left: 50,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 15,
        }}
      >
        <BelahKetupat
          width={130}
          height={130}
          drawProgress={ketupatProg}
          glow={false}
        />
      </div>

      <div
        style={{
          position: "absolute",
          right: 50,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 15,
        }}
      >
        <BelahKetupat
          width={130}
          height={130}
          drawProgress={ketupatProg}
          glow={false}
        />
      </div>
    </div>
  );
};
