// src/scenes/Scene08Dilatasi/DilationStage.tsx
import React from "react";
import { Easing, interpolate, spring, useVideoConfig } from "remotion";
import { PucukRebung } from "../../components/motifs/PucukRebung";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface DilationStageProps {
  currentFrame: number;
}

export const DilationStage: React.FC<DilationStageProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // Grid Coordinate Constants
  const CX = 400;
  const CY = 400;
  const UNIT = 58; // pixels per unit

  // STAGE 1: Entrance of initial Rhombus and axes (frames 0 - 60)
  const entrance = spring({
    frame: currentFrame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // STAGE 2: Motion of P(0,4) -> P'(0,3) with k = 0.75 (frames 90 - 240)
  const dilateProg1 = interpolate(
    currentFrame,
    [90, 220],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.35, 0, 0.15, 1) }
  );

  // STAGE 3: Layer 2 k = 0.75^2 = 0.5625 (frames 260 - 420)
  const dilateProg2 = interpolate(
    currentFrame,
    [260, 390],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.35, 0, 0.15, 1) }
  );

  // STAGE 4: Layer 3 k = 0.75^3 = 0.42 (frames 430 - 580)
  const dilateProg3 = interpolate(
    currentFrame,
    [430, 560],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.35, 0, 0.15, 1) }
  );

  // STAGE 5: Outro transition to alternating Pucuk Rebung (frames 700 - 900)
  const outroProg = interpolate(
    currentFrame,
    [700, 860],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.4, 0, 0.1, 1) }
  );

  // Current interpolated position of Point P along Y-axis
  // At frame 0: y = 4 -> Y_pixel = CY - 4 * UNIT
  // At frame 220: y = 3 -> Y_pixel = CY - 3 * UNIT
  const currP_Y = CY - (4 - 1 * dilateProg1) * UNIT;

  // Helper to generate rhombus points string
  const getRhombusPoints = (scaleK: number) => {
    const rx = 3 * UNIT * scaleK;
    const ry = 4 * UNIT * scaleK;
    return `${CX},${CY - ry} ${CX + rx},${CY} ${CX},${CY + ry} ${CX - rx},${CY}`;
  };

  return (
    <div
      style={{
        position: "relative",
        width: 800,
        height: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 800 800"
        width="800"
        height="800"
        style={{
          overflow: "visible",
          filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.8))",
        }}
      >
        <defs>
          <filter id="dil-glow-teal" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="dil-glow-gold" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <marker
            id="radial-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 2 L 8 5 L 0 8 z" fill={THEME_COLORS.teal.light} />
          </marker>
        </defs>

        {/* 1. COORDINATE GRID & AXES */}
        <g opacity={entrance * (1 - outroProg * 0.85)}>
          {/* Subtle grid lines */}
          {[-4, -3, -2, -1, 1, 2, 3, 4].map((u) => (
            <React.Fragment key={`grid-${u}`}>
              <line
                x1={CX + u * UNIT}
                y1={CY - 4.5 * UNIT}
                x2={CX + u * UNIT}
                y2={CY + 4.5 * UNIT}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1={CX - 4.5 * UNIT}
                y1={CY + u * UNIT}
                x2={CX + 4.5 * UNIT}
                y2={CY + u * UNIT}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </React.Fragment>
          ))}

          {/* X Axis */}
          <line
            x1={CX - 4.5 * UNIT}
            y1={CY}
            x2={CX + 4.5 * UNIT}
            y2={CY}
            stroke="#94A3B8"
            strokeWidth="2.5"
          />
          <text
            x={CX + 4.5 * UNIT + 18}
            y={CY + 6}
            fill="#CBD5E1"
            fontFamily={FONTS.mono}
            fontSize="16"
            fontWeight="bold"
          >
            X
          </text>

          {/* Y Axis */}
          <line
            x1={CX}
            y1={CY + 4.5 * UNIT}
            x2={CX}
            y2={CY - 4.5 * UNIT}
            stroke="#94A3B8"
            strokeWidth="2.5"
          />
          <text
            x={CX - 24}
            y={CY - 4.5 * UNIT + 14}
            fill="#CBD5E1"
            fontFamily={FONTS.mono}
            fontSize="16"
            fontWeight="bold"
          >
            Y
          </text>

          {/* Y-axis tick marks: 1, 2, 3, 4 */}
          {[1, 2, 3, 4].map((num) => (
            <text
              key={`ytick-${num}`}
              x={CX - 14}
              y={CY - num * UNIT + 5}
              fill={num === 3 || num === 4 ? THEME_COLORS.gold.light : "rgba(255,255,255,0.6)"}
              fontFamily={FONTS.mono}
              fontSize="15"
              fontWeight={num === 3 || num === 4 ? "bold" : "normal"}
              textAnchor="end"
            >
              {num}
            </text>
          ))}

          {/* Center Origin O(0,0) */}
          <circle cx={CX} cy={CY} r="8" fill="#FFF" stroke={THEME_COLORS.gold.primary} strokeWidth="2.5" />
          <text
            x={CX + 14}
            y={CY + 22}
            fill="#FFF"
            fontFamily={FONTS.mono}
            fontSize="16"
            fontWeight="bold"
          >
            O(0,0)
          </text>
        </g>

        {/* 2. RADIAL GUIDELINES FROM O(0,0) TO EACH VERTEX */}
        <g opacity={entrance * (1 - outroProg)}>
          {/* Radial line to Top (Y+) */}
          <line
            x1={CX}
            y1={CY}
            x2={CX}
            y2={CY - 4.2 * UNIT}
            stroke={THEME_COLORS.teal.light}
            strokeWidth="2"
            strokeDasharray="6 4"
            markerEnd="url(#radial-arrow)"
          />
          {/* Radial line to Right (X+) */}
          <line
            x1={CX}
            y1={CY}
            x2={CX + 3.4 * UNIT}
            y2={CY}
            stroke={THEME_COLORS.teal.light}
            strokeWidth="2"
            strokeDasharray="6 4"
            markerEnd="url(#radial-arrow)"
          />
          {/* Radial line to Bottom (Y-) */}
          <line
            x1={CX}
            y1={CY}
            x2={CX}
            y2={CY + 4.2 * UNIT}
            stroke={THEME_COLORS.teal.light}
            strokeWidth="2"
            strokeDasharray="6 4"
            markerEnd="url(#radial-arrow)"
          />
          {/* Radial line to Left (X-) */}
          <line
            x1={CX}
            y1={CY}
            x2={CX - 3.4 * UNIT}
            y2={CY}
            stroke={THEME_COLORS.teal.light}
            strokeWidth="2"
            strokeDasharray="6 4"
            markerEnd="url(#radial-arrow)"
          />
        </g>

        {/* 3. NESTED CONCENTRIC RHOMBUSES (SASAB) */}
        <g opacity={1 - outroProg}>
          {/* Outer Rhombus (k = 1.0) */}
          <polygon
            points={getRhombusPoints(1.0)}
            fill="rgba(245, 158, 11, 0.18)"
            stroke={THEME_COLORS.gold.light}
            strokeWidth="3.5"
            strokeLinejoin="round"
            filter="url(#dil-glow-gold)"
          />

          {/* Nested Rhombus 1 (k = 0.75) */}
          {dilateProg1 > 0 && (
            <polygon
              points={getRhombusPoints(1.0 - 0.25 * dilateProg1)}
              fill="rgba(20, 184, 166, 0.25)"
              stroke={THEME_COLORS.teal.light}
              strokeWidth="3"
              strokeLinejoin="round"
              filter="url(#dil-glow-teal)"
            />
          )}

          {/* Nested Rhombus 2 (k = 0.75^2 = 0.5625) */}
          {dilateProg2 > 0 && (
            <polygon
              points={getRhombusPoints(0.75 - 0.1875 * dilateProg2)}
              fill="rgba(245, 158, 11, 0.28)"
              stroke={THEME_COLORS.gold.primary}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          )}

          {/* Nested Rhombus 3 (k = 0.75^3 = 0.42) */}
          {dilateProg3 > 0 && (
            <polygon
              points={getRhombusPoints(0.5625 - 0.14 * dilateProg3)}
              fill="rgba(255, 253, 240, 0.5)"
              stroke="#FFF"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          )}
        </g>

        {/* 4. POINT P(0,4) & MOVING BAYANGAN P'(0,3) */}
        {outroProg < 0.9 && (
          <g opacity={1 - outroProg}>
            {/* Point P(0,4) Node */}
            <circle cx={CX} cy={CY - 4 * UNIT} r="7" fill="#FFF" stroke={THEME_COLORS.gold.primary} strokeWidth="2.5" />
            <text
              x={CX + 14}
              y={CY - 4 * UNIT + 4}
              fill={THEME_COLORS.gold.light}
              fontFamily={FONTS.mono}
              fontSize="17"
              fontWeight="bold"
            >
              P(0, 4)
            </text>

            {/* Moving Point P' along Y-axis */}
            {dilateProg1 > 0 && (
              <g>
                <circle cx={CX} cy={currP_Y} r="8" fill="#FFF" stroke={THEME_COLORS.teal.primary} strokeWidth="3" filter="url(#dil-glow-teal)" />
                {dilateProg1 > 0.8 && (
                  <text
                    x={CX + 14}
                    y={currP_Y + 5}
                    fill={THEME_COLORS.teal.light}
                    fontFamily={FONTS.mono}
                    fontSize="17"
                    fontWeight="bold"
                  >
                    P'(0, 3)
                  </text>
                )}
              </g>
            )}

            {/* Side ratio badge along top edge */}
            {dilateProg1 > 0.5 && (
              <g transform={`translate(${CX - 1.5 * UNIT}, ${CY - 2 * UNIT})`}>
                <rect
                  x="-32"
                  y="-12"
                  width="64"
                  height="24"
                  rx="6"
                  fill="rgba(7, 13, 30, 0.9)"
                  stroke={THEME_COLORS.teal.primary}
                  strokeWidth="1.2"
                />
                <text
                  x="0"
                  y="4"
                  fill={THEME_COLORS.teal.light}
                  fontFamily={FONTS.mono}
                  fontSize="13"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  k = 0,75
                </text>
              </g>
            )}
          </g>
        )}
      </svg>

      {/* 5. OUTRO: TRANSITION TO ALTERNATING PUCUK REBUNG ROW (frames 700 - 900) */}
      {outroProg > 0 && (
        <div
          style={{
            position: "absolute",
            top: 240,
            left: 0,
            width: 800,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 18,
            opacity: outroProg,
            pointerEvents: "none",
          }}
        >
          {[-1, 0, 1, 2].map((idx) => {
            const isUpsideDown = idx % 2 !== 0;
            return (
              <div
                key={`alt-pucuk-${idx}`}
                style={{
                  transform: `scale(${0.65 + outroProg * 0.1}) ${isUpsideDown ? "rotate(180deg)" : ""}`,
                  filter: "drop-shadow(0 0 16px rgba(229,169,60,0.5))",
                }}
              >
                <PucukRebung width={190} height={240} drawProgress={1} glow={true} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
