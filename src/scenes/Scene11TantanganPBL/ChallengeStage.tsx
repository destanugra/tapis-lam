// src/scenes/Scene11TantanganPBL/ChallengeStage.tsx
import React from "react";
import { Easing, interpolate, spring, useVideoConfig } from "remotion";
import { PucukRebung } from "../../components/motifs/PucukRebung";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface ChallengeStageProps {
  currentFrame: number;
}

export const ChallengeStage: React.FC<ChallengeStageProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame: currentFrame - 5,
    fps,
    config: { damping: 15, stiffness: 95 },
  });

  // Outro transition (frames 840–900)
  const outroProg = interpolate(
    currentFrame,
    [840, 895],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Ghost 1: Translasi suggestion (frames 140 - 360)
  const ghost1Opacity = interpolate(
    currentFrame,
    [140, 180, 310, 350],
    [0, 0.75, 0.75, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ghost1ShiftX = interpolate(
    currentFrame,
    [140, 220],
    [0, 140],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0, 0, 1) }
  );

  // Ghost 2: Refleksi suggestion (frames 330 - 540)
  const ghost2Opacity = interpolate(
    currentFrame,
    [330, 370, 490, 530],
    [0, 0.75, 0.75, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ghost2ReflectY = interpolate(
    currentFrame,
    [330, 400],
    [0, 160],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0, 0, 1) }
  );

  // Ghost 3: Rotasi suggestion (frames 510 - 720)
  const ghost3Opacity = interpolate(
    currentFrame,
    [510, 550, 670, 710],
    [0, 0.75, 0.75, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ghost3Angle = interpolate(
    currentFrame,
    [510, 600],
    [0, 90],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0, 0, 1) }
  );

  // Stage dimensions
  const width = 800;
  const height = 480;
  const originX = width / 2;
  const originY = 280;
  const unitSize = 35;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        opacity: (1 - outroProg) * entrance,
        transform: `scale(${0.92 + entrance * 0.08})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          overflow: "visible",
          filter: "drop-shadow(0 15px 35px rgba(0, 0, 0, 0.8))",
        }}
      >
        <defs>
          {/* Subtle Grid Pattern */}
          <pattern id="challengeGrid" width={unitSize} height={unitSize} patternUnits="userSpaceOnUse">
            <path
              d={`M ${unitSize} 0 L 0 0 0 ${unitSize}`}
              fill="none"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="1"
            />
          </pattern>

          {/* Arrowhead teal */}
          <marker id="arrowTeal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill={THEME_COLORS.teal.light} />
          </marker>

          {/* Arrowhead orange */}
          <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill={THEME_COLORS.orange.light} />
          </marker>
        </defs>

        {/* Stage background box */}
        <rect
          x="10"
          y="10"
          width={width - 20}
          height={height - 20}
          rx="24"
          fill="rgba(8, 14, 32, 0.88)"
          stroke={THEME_COLORS.gold.muted}
          strokeWidth="1.5"
        />

        {/* Coordinate Grid */}
        <rect
          x="10"
          y="10"
          width={width - 20}
          height={height - 20}
          rx="24"
          fill="url(#challengeGrid)"
        />

        {/* Coordinate Axes */}
        {/* X Axis */}
        <line
          x1="30"
          y1={originY}
          x2={width - 30}
          y2={originY}
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="2"
        />
        <text
          x={width - 45}
          y={originY - 10}
          fill="rgba(255, 255, 255, 0.6)"
          fontFamily={FONTS.mono}
          fontSize="14"
          fontWeight="700"
        >
          X
        </text>

        {/* Y Axis */}
        <line
          x1={originX}
          y1="30"
          x2={originX}
          y2={height - 30}
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="2"
        />
        <text
          x={originX + 12}
          y="45"
          fill="rgba(255, 255, 255, 0.6)"
          fontFamily={FONTS.mono}
          fontSize="14"
          fontWeight="700"
        >
          Y
        </text>

        {/* Origin Label O(0,0) */}
        <circle cx={originX} cy={originY} r="4" fill={THEME_COLORS.gold.light} />
        <text
          x={originX - 18}
          y={originY + 20}
          fill={THEME_COLORS.gold.light}
          fontFamily={FONTS.mono}
          fontSize="13"
          fontWeight="bold"
        >
          O(0,0)
        </text>

        {/* --- GHOST 1: TRANSLASI DEMO HINT --- */}
        {ghost1Opacity > 0 && (
          <g opacity={ghost1Opacity}>
            {/* Vector Arrow */}
            <line
              x1={originX}
              y1={originY - 80}
              x2={originX + ghost1ShiftX}
              y2={originY - 80}
              stroke={THEME_COLORS.teal.light}
              strokeWidth="2.5"
              strokeDasharray="4 4"
              markerEnd="url(#arrowTeal)"
            />
            <text
              x={originX + ghost1ShiftX / 2 - 25}
              y={originY - 95}
              fill={THEME_COLORS.teal.light}
              fontFamily={FONTS.mono}
              fontSize="12"
              fontWeight="bold"
            >
              + Translasi?
            </text>
            <circle
              cx={originX + ghost1ShiftX}
              cy={originY - 80}
              r="28"
              fill="none"
              stroke={THEME_COLORS.teal.light}
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          </g>
        )}

        {/* --- GHOST 2: REFLEKSI DEMO HINT --- */}
        {ghost2Opacity > 0 && (
          <g opacity={ghost2Opacity}>
            {/* Reflection Line */}
            <line
              x1={originX - 100}
              y1={originY + 20}
              x2={originX + 100}
              y2={originY + 20}
              stroke={THEME_COLORS.orange.light}
              strokeWidth="2"
              strokeDasharray="5 4"
            />
            <text
              x={originX + 110}
              y={originY + 24}
              fill={THEME_COLORS.orange.light}
              fontFamily={FONTS.mono}
              fontSize="11"
              fontWeight="bold"
            >
              Cermin
            </text>
            {/* Downward indicator */}
            <line
              x1={originX}
              y1={originY - 20}
              x2={originX}
              y2={originY - 20 + ghost2ReflectY}
              stroke={THEME_COLORS.orange.light}
              strokeWidth="2"
              strokeDasharray="3 3"
              markerEnd="url(#arrowOrange)"
            />
            <text
              x={originX + 12}
              y={originY + 90}
              fill={THEME_COLORS.orange.light}
              fontFamily={FONTS.mono}
              fontSize="12"
              fontWeight="bold"
            >
              + Refleksi?
            </text>
          </g>
        )}

        {/* --- GHOST 3: ROTASI DEMO HINT --- */}
        {ghost3Opacity > 0 && (
          <g opacity={ghost3Opacity}>
            <path
              d={`M ${originX + 70} ${originY - 80} A 70 70 0 0 1 ${originX} ${originY - 150}`}
              fill="none"
              stroke={THEME_COLORS.gold.light}
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#arrowTeal)"
            />
            <text
              x={originX + 80}
              y={originY - 120}
              fill={THEME_COLORS.gold.light}
              fontFamily={FONTS.mono}
              fontSize="12"
              fontWeight="bold"
            >
              + Rotasi θ?
            </text>
          </g>
        )}
      </svg>

      {/* BASE MOTIF: Pucuk Rebung at Center (Origin) */}
      <div
        style={{
          position: "absolute",
          top: originY - 130,
          left: originX - 60,
          width: 120,
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          filter: "drop-shadow(0 0 16px rgba(229, 169, 60, 0.7))",
        }}
      >
        <PucukRebung width={120} height={140} drawProgress={1} glow={true} />
      </div>

      {/* Ghost 1 Motif Preview (Translasi) */}
      {ghost1Opacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: originY - 130,
            left: originX - 60 + ghost1ShiftX,
            width: 120,
            height: 140,
            opacity: ghost1Opacity * 0.75,
            filter: "drop-shadow(0 0 10px rgba(20, 184, 166, 0.6))",
            pointerEvents: "none",
          }}
        >
          <PucukRebung width={120} height={140} drawProgress={1} glow={false} />
        </div>
      )}

      {/* Ghost 2 Motif Preview (Refleksi) */}
      {ghost2Opacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: originY - 130 + ghost2ReflectY,
            left: originX - 60,
            width: 120,
            height: 140,
            opacity: ghost2Opacity * 0.75,
            transform: "scaleY(-1)",
            filter: "drop-shadow(0 0 10px rgba(249, 115, 22, 0.6))",
            pointerEvents: "none",
          }}
        >
          <PucukRebung width={120} height={140} drawProgress={1} glow={false} />
        </div>
      )}

      {/* Ghost 3 Motif Preview (Rotasi) */}
      {ghost3Opacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: originY - 130,
            left: originX - 60,
            width: 120,
            height: 140,
            opacity: ghost3Opacity * 0.75,
            transform: `rotate(${ghost3Angle}deg)`,
            transformOrigin: "60px 130px",
            filter: "drop-shadow(0 0 10px rgba(229, 169, 60, 0.6))",
            pointerEvents: "none",
          }}
        >
          <PucukRebung width={120} height={140} drawProgress={1} glow={false} />
        </div>
      )}
    </div>
  );
};
