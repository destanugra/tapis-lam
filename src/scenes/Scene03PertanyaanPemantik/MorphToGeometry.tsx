// src/scenes/Scene03PertanyaanPemantik/MorphToGeometry.tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface MorphToGeometryProps {
  progress?: number; // 0 (cultural motif) to 1 (pure geometric triangle with coordinates)
  transitionToThreeSlots?: number; // 0 to 1 (axes repositioning for Scene 4)
}

export const MorphToGeometry: React.FC<MorphToGeometryProps> = ({
  progress = 0,
  transitionToThreeSlots = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Coordinate axes growth from bottom (starts at progress > 0.15)
  const axisGrowth = interpolate(progress, [0.15, 0.75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Vertices label pop
  const vertexPop = interpolate(progress, [0.55, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Revelation badge entrance (starts at progress > 0.6)
  const revelationSpring = spring({
    frame: frame - 220,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Coordinates of the geometric triangle in SVG (500, 400 is center)
  const cx = 500;
  const cy = 380;
  const apex = { x: cx, y: cy - 160 };
  const leftCorner = { x: cx - 140, y: cy + 130 };
  const rightCorner = { x: cx + 140, y: cy + 130 };

  // Axes shift during transition to Scene 4 slots
  const axisShiftY = transitionToThreeSlots * 120;

  return (
    <div
      style={{
        position: "relative",
        width: 1000,
        height: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 1000 800"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Axis gradients */}
          <linearGradient id="xAxisGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0" />
            <stop offset="20%" stopColor="#14B8A6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="yAxisGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0" />
            <stop offset="20%" stopColor="#F97316" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FB923C" stopOpacity="1" />
          </linearGradient>

          {/* Triangle neon fill */}
          <linearGradient id="triangleNeon" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E5A93C" stopOpacity="0.1" />
          </linearGradient>

          {/* Coordinate grid pattern */}
          <pattern
            id="cartesianGrid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* 1. Underlying Cartesian Grid */}
        <g opacity={axisGrowth * 0.7}>
          <rect x="100" y="80" width="800" height="640" fill="url(#cartesianGrid)" />
        </g>

        {/* 2. Coordinate Axes Growing from Bottom to Center */}
        {axisGrowth > 0 && (
          <g transform={`translate(0, ${axisShiftY})`}>
            {/* Horizontal X Axis (Toska) */}
            <line
              x1={cx - 380 * axisGrowth}
              y1={cy}
              x2={cx + 380 * axisGrowth}
              y2={cy}
              stroke="url(#xAxisGrad)"
              strokeWidth="3.5"
              filter="drop-shadow(0 0 8px rgba(20, 184, 166, 0.6))"
            />
            {/* X Axis Arrow Head */}
            {axisGrowth > 0.8 && (
              <polygon
                points={`${cx + 380},${cy} ${cx + 365},${cy - 8} ${cx + 365},${cy + 8}`}
                fill="#2DD4BF"
              />
            )}
            {/* X Axis Label */}
            {axisGrowth > 0.6 && (
              <text
                x={cx + 395}
                y={cy + 8}
                fill="#2DD4BF"
                fontFamily={FONTS.mono}
                fontSize="24"
                fontWeight="bold"
              >
                +X
              </text>
            )}

            {/* Vertical Y Axis (Jingga) Growing upward from bottom */}
            <line
              x1={cx}
              y1={cy + 360 * axisGrowth}
              x2={cx}
              y2={cy - 340 * axisGrowth}
              stroke="url(#yAxisGrad)"
              strokeWidth="3.5"
              filter="drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))"
            />
            {/* Y Axis Arrow Head */}
            {axisGrowth > 0.8 && (
              <polygon
                points={`${cx},${cy - 340} ${cx - 8},${cy - 325} ${cx + 8},${cy - 325}`}
                fill="#FB923C"
              />
            )}
            {/* Y Axis Label */}
            {axisGrowth > 0.6 && (
              <text
                x={cx + 16}
                y={cy - 335}
                fill="#FB923C"
                fontFamily={FONTS.mono}
                fontSize="24"
                fontWeight="bold"
              >
                +Y
              </text>
            )}

            {/* Origin Node (0,0) */}
            <circle cx={cx} cy={cy} r="6" fill="#FFF" />
            <text
              x={cx - 28}
              y={cy + 26}
              fill="#CBD5E1"
              fontFamily={FONTS.mono}
              fontSize="20"
            >
              (0,0)
            </text>
          </g>
        )}

        {/* 3. Pure Geometric Triangle (Morphed from Pucuk Rebung) */}
        <g opacity={progress}>
          {/* Neon Triangle Fill */}
          <polygon
            points={`${apex.x},${apex.y} ${rightCorner.x},${rightCorner.y} ${leftCorner.x},${leftCorner.y}`}
            fill="url(#triangleNeon)"
          />

          {/* Clean Vector Edges */}
          <polygon
            points={`${apex.x},${apex.y} ${rightCorner.x},${rightCorner.y} ${leftCorner.x},${leftCorner.y}`}
            fill="none"
            stroke={THEME_COLORS.gold.light}
            strokeWidth="4"
            strokeLinejoin="round"
            filter={`drop-shadow(0 0 16px ${THEME_COLORS.gold.glow})`}
          />

          {/* Angle sector arc at apex */}
          <path
            d={`M ${apex.x - 24} ${apex.y + 40} Q ${apex.x} ${apex.y + 48} ${apex.x + 24} ${apex.y + 40}`}
            fill="none"
            stroke="#5EEAD4"
            strokeWidth="2.5"
          />

          {/* Center symmetry altitude line (Spine of triangle) */}
          <line
            x1={apex.x}
            y1={apex.y}
            x2={cx}
            y2={rightCorner.y}
            stroke="#F97316"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </g>

        {/* 4. Glowing Mathematical Vertices & Coordinates */}
        {vertexPop > 0 && (
          <g opacity={vertexPop}>
            {/* Vertex A (Apex) */}
            <circle
              cx={apex.x}
              cy={apex.y}
              r="8"
              fill="#FFFDF0"
              stroke="#D97706"
              strokeWidth="2.5"
              filter="drop-shadow(0 0 10px #FFF)"
            />
            <text
              x={apex.x + 18}
              y={apex.y - 10}
              fill="#FFF"
              fontFamily={FONTS.mono}
              fontSize="24"
              fontWeight="bold"
            >
              A(0, y₁)
            </text>

            {/* Vertex B (Left corner) */}
            <circle
              cx={leftCorner.x}
              cy={leftCorner.y}
              r="8"
              fill="#FFFDF0"
              stroke="#D97706"
              strokeWidth="2.5"
              filter="drop-shadow(0 0 10px #FFF)"
            />
            <text
              x={leftCorner.x - 110}
              y={leftCorner.y + 30}
              fill="#FFF"
              fontFamily={FONTS.mono}
              fontSize="24"
              fontWeight="bold"
            >
              B(-x₂, y₂)
            </text>

            {/* Vertex C (Right corner) */}
            <circle
              cx={rightCorner.x}
              cy={rightCorner.y}
              r="8"
              fill="#FFFDF0"
              stroke="#D97706"
              strokeWidth="2.5"
              filter="drop-shadow(0 0 10px #FFF)"
            />
            <text
              x={rightCorner.x + 18}
              y={rightCorner.y + 30}
              fill="#FFF"
              fontFamily={FONTS.mono}
              fontSize="24"
              fontWeight="bold"
            >
              C(x₂, y₂)
            </text>
          </g>
        )}
      </svg>

      {/* 5. Triumphant Revelation Badge: "JAWABANNYA: GEOMETRI TRANSFORMASI" */}
      {frame >= 220 && (
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: revelationSpring,
            transform: `scale(${0.9 + revelationSpring * 0.1})`,
            pointerEvents: "none",
            zIndex: 60,
          }}
        >
          <div
            style={{
              padding: "16px 36px",
              borderRadius: 24,
              background: "linear-gradient(135deg, rgba(8, 15, 34, 0.96) 0%, rgba(4, 7, 18, 0.98) 100%)",
              border: `2px solid ${THEME_COLORS.teal.light}`,
              boxShadow: `0 16px 40px rgba(0, 0, 0, 0.9), 0 0 28px rgba(20, 184, 166, 0.35)`,
              backdropFilter: "blur(16px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.sans,
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "0.22em",
                color: THEME_COLORS.gold.light,
                textTransform: "uppercase",
              }}
            >
              JAWABAN KONSEPTUAL
            </span>

            <h3
              style={{
                margin: 0,
                fontFamily: FONTS.title,
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: "0.12em",
                color: "#FFFDF0",
                textTransform: "uppercase",
                textShadow: `0 0 20px ${THEME_COLORS.teal.glow}`,
              }}
            >
              GEOMETRI TRANSFORMASI
            </h3>

            {/* Formula Pill */}
            <div
              style={{
                marginTop: 6,
                padding: "6px 20px",
                borderRadius: 14,
                backgroundColor: "rgba(20, 184, 166, 0.15)",
                border: "1px solid rgba(45, 212, 191, 0.4)",
                fontFamily: FONTS.mono,
                fontSize: 20,
                fontWeight: 600,
                color: THEME_COLORS.teal.light,
              }}
            >
              P(x, y) ⎯⎯⎯→ P'(x', y')
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
