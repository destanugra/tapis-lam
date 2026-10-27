// src/components/motifs/PucukRebung.tsx
import React from "react";
import { THEME_COLORS } from "../../constants/theme";

interface PucukRebungProps {
  width?: number;
  height?: number;
  drawProgress?: number; // 0 to 1 for thread drawing animation
  fillOpacity?: number;
  glow?: boolean;
  inverted?: boolean;
}

export const PucukRebung: React.FC<PucukRebungProps> = ({
  width = 280,
  height = 360,
  drawProgress = 1,
  fillOpacity = 0.85,
  glow = true,
  inverted = false,
}) => {
  // Base coordinates normalized inside 200 x 280 viewBox
  // An apex at (100, 10), stepped chevron tiers leading down to (10, 260) and (190, 260)
  const strokeColor = THEME_COLORS.gold.primary;
  const strokeLight = THEME_COLORS.gold.light;
  const maroonFill = THEME_COLORS.maroon.primary;

  return (
    <div
      style={{
        width,
        height,
        display: "inline-block",
        transform: inverted ? "rotate(180deg)" : undefined,
        filter: glow
          ? `drop-shadow(0 0 16px ${THEME_COLORS.gold.glow}) drop-shadow(0 4px 12px rgba(0,0,0,0.8))`
          : "drop-shadow(0 4px 8px rgba(0,0,0,0.7))",
      }}
    >
      <svg
        viewBox="0 0 200 280"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Metallic gold gradient */}
          <linearGradient id="pucukGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>

          {/* Embroidery hatch pattern */}
          <pattern
            id="rebungHatch"
            width="6"
            height="6"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              stroke="#F59E0B"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />
          </pattern>
        </defs>

        {/* 1. Traditional Maroon Fabric Foundation */}
        <path
          d="M 100 15
             L 125 55 L 115 55 L 140 100 L 128 100 L 160 160 L 145 160 L 180 230 L 165 230 L 190 265
             L 10 265
             L 35 230 L 20 230 L 55 160 L 40 160 L 72 100 L 60 100 L 85 55 L 75 55 Z"
          fill={maroonFill}
          fillOpacity={fillOpacity * 0.9}
        />

        {/* 2. Dense Gold Embroidery Hatching */}
        <path
          d="M 100 25
             L 120 60 L 112 60 L 132 105 L 122 105 L 150 165 L 138 165 L 170 235 L 158 235 L 180 260
             L 20 260
             L 42 235 L 30 235 L 62 165 L 50 165 L 78 105 L 68 105 L 88 60 L 80 60 Z"
          fill="url(#rebungHatch)"
          fillOpacity={fillOpacity}
        />

        {/* 3. Stepped Chevron Outline (Gigi Rebung) with drawProgress */}
        <path
          d="M 100 15
             L 125 55 L 115 55 L 140 100 L 128 100 L 160 160 L 145 160 L 180 230 L 165 230 L 190 265
             L 10 265
             L 35 230 L 20 230 L 55 160 L 40 160 L 72 100 L 60 100 L 85 55 L 75 55 Z"
          fill="none"
          stroke="url(#pucukGoldGrad)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="1200"
          strokeDashoffset={1200 * (1 - drawProgress)}
        />

        {/* 4. Inner Concentric Triangles (Chevron Ribs) */}
        <path
          d="M 100 75 L 135 150 L 65 150 Z"
          fill="none"
          stroke={strokeLight}
          strokeWidth="2.2"
          strokeDasharray="400"
          strokeDashoffset={400 * (1 - drawProgress)}
        />
        <path
          d="M 100 120 L 155 220 L 45 220 Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeDasharray="600"
          strokeDashoffset={600 * (1 - drawProgress)}
        />

        {/* 5. Center Vertical Spine with Gold Diamond Beads */}
        <line
          x1="100"
          y1="25"
          x2="100"
          y2="260"
          stroke={strokeLight}
          strokeWidth="2.5"
          strokeDasharray="300"
          strokeDashoffset={300 * (1 - drawProgress)}
        />

        {/* Gold Diamond Beads along spine */}
        {[35, 75, 120, 165, 215].map((y, idx) => (
          <rect
            key={idx}
            x="96"
            y={y - 4}
            width="8"
            height="8"
            transform={`rotate(45 100 ${y})`}
            fill="#FFFBEB"
            stroke="#B45309"
            strokeWidth="1"
            opacity={drawProgress > 0.5 ? 1 : 0}
          />
        ))}

        {/* Crown finial orb at apex */}
        <circle
          cx="100"
          cy="15"
          r="4.5"
          fill="#FFFBEB"
          stroke="#F59E0B"
          strokeWidth="1.5"
          opacity={drawProgress > 0.3 ? 1 : 0}
        />
      </svg>
    </div>
  );
};
