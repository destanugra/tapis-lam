// src/components/motifs/BelahKetupat.tsx
import React from "react";
import { THEME_COLORS } from "../../constants/theme";

interface BelahKetupatProps {
  width?: number;
  height?: number;
  drawProgress?: number;
  glow?: boolean;
}

export const BelahKetupat: React.FC<BelahKetupatProps> = ({
  width = 240,
  height = 240,
  drawProgress = 1,
  glow = true,
}) => {
  const c = 120; // center
  const r1 = 100; // outer diamond radius
  const r2 = 72;  // middle diamond
  const r3 = 45;  // inner diamond
  const r4 = 20;  // innermost core

  return (
    <div
      style={{
        width,
        height,
        display: "inline-block",
        filter: glow
          ? `drop-shadow(0 0 16px ${THEME_COLORS.gold.glow}) drop-shadow(0 4px 10px rgba(0,0,0,0.8))`
          : "drop-shadow(0 4px 8px rgba(0,0,0,0.7))",
      }}
    >
      <svg
        viewBox="0 0 240 240"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="ketupatGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="30%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>

          <pattern
            id="ketupatHatch"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="4" x2="8" y2="4" stroke="#D97706" strokeWidth="1" strokeOpacity="0.7" />
            <line x1="4" y1="0" x2="4" y2="8" stroke="#D97706" strokeWidth="1" strokeOpacity="0.7" />
          </pattern>
        </defs>

        {/* 1. Outer Diamond Velvet Background */}
        <polygon
          points={`${c},${c - r1} ${c + r1},${c} ${c},${c + r1} ${c - r1},${c}`}
          fill="#581825"
          fillOpacity={0.88 * drawProgress}
        />

        {/* Outer Diamond Outline */}
        <polygon
          points={`${c},${c - r1} ${c + r1},${c} ${c},${c + r1} ${c - r1},${c}`}
          fill="none"
          stroke="url(#ketupatGold)"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeDasharray="600"
          strokeDashoffset={600 * (1 - drawProgress)}
        />

        {/* 2. Middle Nested Diamond */}
        <polygon
          points={`${c},${c - r2} ${c + r2},${c} ${c},${c + r2} ${c - r2},${c}`}
          fill="url(#ketupatHatch)"
          stroke="#FDE047"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeDasharray="450"
          strokeDashoffset={450 * (1 - drawProgress)}
        />

        {/* 3. Inner Nested Diamond */}
        <polygon
          points={`${c},${c - r3} ${c + r3},${c} ${c},${c + r3} ${c - r3},${c}`}
          fill="#701A28"
          stroke="url(#ketupatGold)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeDasharray="300"
          strokeDashoffset={300 * (1 - drawProgress)}
        />

        {/* 4. Core Golden Diamond */}
        <polygon
          points={`${c},${c - r4} ${c + r4},${c} ${c},${c + r4} ${c - r4},${c}`}
          fill="#FFFDF0"
          stroke="#B45309"
          strokeWidth="1.8"
          opacity={drawProgress > 0.4 ? 1 : 0}
        />

        {/* Symmetrical Corner Accent Hooks (Sulur Kait) */}
        {[
          { x: c, y: c - r1 - 8 },
          { x: c + r1 + 8, y: c },
          { x: c, y: c + r1 + 8 },
          { x: c - r1 - 8, y: c },
        ].map((pt, idx) => (
          <circle
            key={idx}
            cx={pt.x}
            cy={pt.y}
            r={4.5}
            fill="#FFFBEB"
            stroke="#D97706"
            strokeWidth="1.5"
            opacity={drawProgress > 0.6 ? 1 : 0}
          />
        ))}
      </svg>
    </div>
  );
};
