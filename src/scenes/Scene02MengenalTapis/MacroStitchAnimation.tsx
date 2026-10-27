// src/scenes/Scene02MengenalTapis/MacroStitchAnimation.tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface MacroStitchAnimationProps {
  progress?: number; // 0 to 1
}

export const MacroStitchAnimation: React.FC<MacroStitchAnimationProps> = ({
  progress = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Continuous needle oscillation and couching stitch cycle
  const stitchCount = 8;
  const activeStitchIndex = Math.min(
    stitchCount - 1,
    Math.floor(progress * stitchCount)
  );

  // Moving sheen along the gold thread
  const sheenPos = (frame * 4) % 1200;

  return (
    <div
      style={{
        position: "relative",
        width: 860,
        height: 600,
        borderRadius: 28,
        overflow: "hidden",
        background: "linear-gradient(145deg, #070D1E 0%, #03060E 100%)",
        border: `2px solid rgba(229, 169, 60, 0.6)`,
        boxShadow: `0 24px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(229, 169, 60, 0.25)`,
      }}
    >
      <svg
        viewBox="0 0 860 600"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Macro Fabric Weave (Enlarged) */}
          <pattern
            id="macroWeave"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <rect width="32" height="32" fill="#0A1124" />
            {/* Warp threads */}
            <rect x="2" y="0" width="12" height="32" fill="#111D3B" rx="3" />
            <rect x="18" y="0" width="12" height="32" fill="#0D1730" rx="3" />
            {/* Weft threads */}
            <rect x="0" y="2" width="32" height="12" fill="#142347" rx="3" fillOpacity="0.75" />
            <rect x="0" y="18" width="32" height="12" fill="#0F1B36" rx="3" fillOpacity="0.75" />
          </pattern>

          {/* Heavy Gold Thread Gradient (Cylindrical metallic 3D sheen) */}
          <linearGradient id="heavyGoldThread" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="55%" stopColor="#D97706" />
            <stop offset="85%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Golden Sheen Glint */}
          <linearGradient id="sheenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Macro Textile Canvas */}
        <rect width="860" height="600" fill="url(#macroWeave)" />

        {/* 2. Drawn Guide Track (Chalk trace of geometric motif) */}
        <path
          d="M 60 480 Q 240 440 430 300 T 800 120"
          fill="none"
          stroke="#14B8A6"
          strokeWidth="3"
          strokeDasharray="8 6"
          strokeOpacity="0.6"
        />

        {/* 3. Heavy Golden Thread (Benang Emas Tapis) laying down along track */}
        <path
          d="M 60 480 Q 240 440 430 300 T 800 120"
          fill="none"
          stroke="url(#heavyGoldThread)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - progress)}
          filter="drop-shadow(0 12px 14px rgba(0,0,0,0.85))"
        />

        {/* Thread Specular Core Highlight */}
        <path
          d="M 60 480 Q 240 440 430 300 T 800 120"
          fill="none"
          stroke="#FFFDF0"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - progress)}
          opacity={0.8}
        />

        {/* 4. Couching Stitches (Teknik Cucuk: Fine silk holding stitches pinning down the gold thread) */}
        {[
          { x: 110, y: 462, rot: 35 },
          { x: 195, y: 432, rot: 32 },
          { x: 285, y: 390, rot: 42 },
          { x: 375, y: 335, rot: 50 },
          { x: 465, y: 275, rot: 45 },
          { x: 555, y: 225, rot: 38 },
          { x: 645, y: 180, rot: 35 },
          { x: 735, y: 142, rot: 32 },
        ].map((stitch, idx) => {
          const isStitched = idx <= activeStitchIndex;
          if (!isStitched) return null;

          return (
            <g
              key={idx}
              transform={`translate(${stitch.x}, ${stitch.y}) rotate(${stitch.rot})`}
            >
              {/* Shadow under couching stitch */}
              <line
                x1="-6"
                y1="-22"
                x2="-6"
                y2="22"
                stroke="#000"
                strokeWidth="7"
                strokeOpacity="0.7"
              />
              {/* Fine silk holding stitch across heavy gold thread */}
              <line
                x1="0"
                y1="-22"
                x2="0"
                y2="22"
                stroke="#FDE047"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="-20"
                x2="0"
                y2="20"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Entry and exit needle puncture dots in cloth */}
              <circle cx="0" cy="-22" r="3" fill="#040711" />
              <circle cx="0" cy="22" r="3" fill="#040711" />
            </g>
          );
        })}

        {/* 5. Needle Piercing Action (Animated at current active stitch) */}
        {progress < 0.98 && (
          <g transform={`translate(${110 + progress * 620}, ${460 - progress * 320})`}>
            {/* Needle shaft */}
            <line
              x1="60"
              y1="-110"
              x2="0"
              y2="-8"
              stroke="#E2E8F0"
              strokeWidth="5"
              strokeLinecap="round"
              filter="drop-shadow(4px 10px 8px rgba(0,0,0,0.7))"
            />
            {/* Needle tip glint */}
            <circle cx="0" cy="-8" r="4" fill="#FFFFFF" />
            {/* Needle eye & silk thread loop */}
            <circle cx="56" cy="-105" r="3" fill="#000" />
            <path
              d="M 56 -105 Q 120 -150 160 -120"
              fill="none"
              stroke="#FDE047"
              strokeWidth="2.5"
            />
          </g>
        )}
      </svg>

      {/* Macro Label Badge */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 24,
          padding: "8px 18px",
          borderRadius: 20,
          background: "rgba(7, 13, 30, 0.88)",
          border: `1px solid ${THEME_COLORS.gold.primary}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: THEME_COLORS.gold.light,
            boxShadow: `0 0 8px ${THEME_COLORS.gold.primary}`,
          }}
        />
        <span
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: THEME_COLORS.white.pure,
            textTransform: "uppercase",
          }}
        >
          TAMPILAN MAKRO: TEKNIK SULAM CUCUK
        </span>
      </div>
    </div>
  );
};
