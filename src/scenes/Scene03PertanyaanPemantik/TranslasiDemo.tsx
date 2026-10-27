// src/scenes/Scene03PertanyaanPemantik/TranslasiDemo.tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PucukRebung } from "../../components/motifs/PucukRebung";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface TranslasiDemoProps {
  progress?: number; // 0 to 1
  opacity?: number;
}

export const TranslasiDemo: React.FC<TranslasiDemoProps> = ({
  progress = 0,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Translation step offset in pixels
  const stepX = 260;

  // Staggered translation clone 1 (moving right)
  const clone1Spring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Clone 2 (moving left)
  const clone2Spring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const arrowOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: 1000,
        height: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      {/* 1. Translation Vector Arrow & Distance Guide */}
      <svg
        width="1000"
        height="600"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          opacity: arrowOpacity,
        }}
      >
        <defs>
          <linearGradient id="vectorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="1" />
          </linearGradient>

          <marker
            id="arrowHead"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#2DD4BF" />
          </marker>
        </defs>

        {/* Translation Vector Arrow along X axis */}
        <line
          x1="500"
          y1="510"
          x2={500 + stepX * clone1Spring}
          y2="510"
          stroke="url(#vectorGrad)"
          strokeWidth="3.5"
          markerEnd="url(#arrowHead)"
          filter="drop-shadow(0 0 8px #14B8A6)"
        />

        {/* Vector Label: v = (Δx, 0) */}
        <text
          x={500 + (stepX * clone1Spring) / 2}
          y="490"
          textAnchor="middle"
          fill="#5EEAD4"
          fontFamily={FONTS.mono}
          fontSize="22"
          fontWeight="bold"
          filter="drop-shadow(0 2px 6px rgba(0,0,0,0.9))"
        >
          vektor translasi T(Δx, 0)
        </text>

        {/* Dotted alignment baseline */}
        <line
          x1="120"
          y1="510"
          x2="880"
          y2="510"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
      </svg>

      {/* 2. Clone Left (Translated by -stepX) */}
      {frame >= 55 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: `translateX(calc(-50% - ${stepX * clone2Spring}px))`,
            opacity: 0.65 * clone2Spring,
            filter: "drop-shadow(0 0 12px rgba(20, 184, 166, 0.5))",
          }}
        >
          <PucukRebung
            width={240}
            height={300}
            drawProgress={1}
            glow={false}
          />
        </div>
      )}

      {/* 3. Original Master Motif in the Center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <PucukRebung
          width={280}
          height={350}
          drawProgress={1}
          glow={true}
        />
      </div>

      {/* 4. Clone Right (Translated by +stepX) */}
      {frame >= 25 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: `translateX(calc(-50% + ${stepX * clone1Spring}px))`,
            opacity: 0.75 * clone1Spring,
            filter: "drop-shadow(0 0 14px rgba(20, 184, 166, 0.6))",
          }}
        >
          <PucukRebung
            width={240}
            height={300}
            drawProgress={1}
            glow={false}
          />
        </div>
      )}
    </div>
  );
};
