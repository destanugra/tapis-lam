// src/components/motifs/TapisBorder.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { THEME_COLORS } from "../../constants/theme";

interface TapisBorderProps {
  drawProgress?: number;
  glow?: boolean;
}

export const TapisBorder: React.FC<TapisBorderProps> = ({
  drawProgress = 1,
  glow = true,
}) => {
  const borderWidth = 48;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {/* Left Vertical Lajur */}
      <div
        style={{
          position: "absolute",
          left: 18,
          top: 0,
          bottom: 0,
          width: borderWidth,
          filter: glow
            ? `drop-shadow(0 0 12px ${THEME_COLORS.gold.glow})`
            : undefined,
        }}
      >
        <svg width={borderWidth} height="1920" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="lajurGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            <pattern
              id="zigzagPatternL"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 6 0 L 24 18 L 6 36"
                fill="none"
                stroke="#FDE047"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="24" cy="18" r="2.5" fill="#FFFBEB" />
              <circle cx="6" cy="18" r="2" fill="#D97706" />
            </pattern>
          </defs>

          {/* Maroon velvet ribbon */}
          <rect
            x="4"
            y="0"
            width={borderWidth - 8}
            height="1920"
            fill="#581825"
            fillOpacity={0.82 * drawProgress}
          />

          {/* Inner Zigzag Stitching */}
          <rect
            x="6"
            y="0"
            width={borderWidth - 12}
            height="1920"
            fill="url(#zigzagPatternL)"
            opacity={drawProgress}
          />

          {/* Left guideline */}
          <line
            x1="4"
            y1="0"
            x2="4"
            y2="1920"
            stroke="url(#lajurGoldGrad)"
            strokeWidth="2.5"
            strokeDasharray="1920"
            strokeDashoffset={1920 * (1 - drawProgress)}
          />

          {/* Right guideline */}
          <line
            x1={borderWidth - 4}
            y1="0"
            x2={borderWidth - 4}
            y2="1920"
            stroke="url(#lajurGoldGrad)"
            strokeWidth="2.5"
            strokeDasharray="1920"
            strokeDashoffset={1920 * (1 - drawProgress)}
          />
        </svg>
      </div>

      {/* Right Vertical Lajur (Mirrored) */}
      <div
        style={{
          position: "absolute",
          right: 18,
          top: 0,
          bottom: 0,
          width: borderWidth,
          filter: glow
            ? `drop-shadow(0 0 12px ${THEME_COLORS.gold.glow})`
            : undefined,
        }}
      >
        <svg width={borderWidth} height="1920" style={{ overflow: "visible" }}>
          <pattern
            id="zigzagPatternR"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30 0 L 12 18 L 30 36"
              fill="none"
              stroke="#FDE047"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="18" r="2.5" fill="#FFFBEB" />
            <circle cx="30" cy="18" r="2" fill="#D97706" />
          </pattern>

          {/* Maroon velvet ribbon */}
          <rect
            x="4"
            y="0"
            width={borderWidth - 8}
            height="1920"
            fill="#581825"
            fillOpacity={0.82 * drawProgress}
          />

          {/* Inner Zigzag Stitching */}
          <rect
            x="6"
            y="0"
            width={borderWidth - 12}
            height="1920"
            fill="url(#zigzagPatternR)"
            opacity={drawProgress}
          />

          {/* Left guideline */}
          <line
            x1="4"
            y1="0"
            x2="4"
            y2="1920"
            stroke="url(#lajurGoldGrad)"
            strokeWidth="2.5"
            strokeDasharray="1920"
            strokeDashoffset={1920 * (1 - drawProgress)}
          />

          {/* Right guideline */}
          <line
            x1={borderWidth - 4}
            y1="0"
            x2={borderWidth - 4}
            y2="1920"
            stroke="url(#lajurGoldGrad)"
            strokeWidth="2.5"
            strokeDasharray="1920"
            strokeDashoffset={1920 * (1 - drawProgress)}
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
