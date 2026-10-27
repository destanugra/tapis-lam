// src/scenes/Scene06Refleksi/ReflectionMirrorStage.tsx
import React from "react";
import { Easing, interpolate, spring, useVideoConfig } from "remotion";
import { PohonHayat } from "../../components/motifs/PohonHayat";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface ReflectionMirrorStageProps {
  currentFrame: number;
}

export const ReflectionMirrorStage: React.FC<ReflectionMirrorStageProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // STAGE 1: Half motif & Orange mirror line entrance (frames 0 - 60)
  const mirrorEntrance = spring({
    frame: currentFrame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Mirror line pulse
  const mirrorLineGlow = interpolate(
    Math.sin((currentFrame / 15) * Math.PI),
    [-1, 1],
    [0.7, 1.0]
  );

  // STAGE 2: Point P(x,y) reveal (frames 60 - 180)
  const pointPProg = interpolate(
    currentFrame,
    [60, 110],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // STAGE 3: Point P trajectory moving to P'(-x,y) (frames 180 - 380)
  const trajectoryProg = interpolate(
    currentFrame,
    [180, 340],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.35, 0, 0.15, 1) }
  );

  // STAGE 4: Gradual reflection of the entire left half (frames 380 - 680)
  const fullReflectionProg = interpolate(
    currentFrame,
    [380, 620],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0, 0.2, 1) }
  );

  // STAGE 5: Outro transition - mirror line dissolves into circular halo around center O (frames 760 - 930)
  const transitionToCircleProg = interpolate(
    currentFrame,
    [760, 910],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0, 0.1, 1) }
  );

  // Center coordinate of stage
  const CX = 400; // Mirror line X
  const CY = 380; // Motif center Y
  const POINT_DIST = 160; // d = 160px
  const POINT_Y = 260; // Branch apex Y

  // Moving position of the point during reflection animation
  // Starts at CX + POINT_DIST, moves to CX - POINT_DIST
  const currentPtX = CX + POINT_DIST * (1 - 2 * trajectoryProg);

  return (
    <div
      style={{
        position: "relative",
        width: 800,
        height: 760,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 800 760"
        width="800"
        height="760"
        style={{
          overflow: "visible",
          filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.8))",
        }}
      >
        <defs>
          <filter id="mirror-glow" x="-40%" y="-20%" width="180%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="point-sparkle" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. CENTRAL MIRROR AXIS (Vertical Line transitioning to Origin Circle) */}
        {transitionToCircleProg < 0.98 && (
          <g opacity={mirrorEntrance * (1 - transitionToCircleProg * 0.75)}>
            {/* Mirror line main beam */}
            <line
              x1={CX}
              y1={40 + transitionToCircleProg * 240}
              x2={CX}
              y2={720 - transitionToCircleProg * 240}
              stroke={THEME_COLORS.orange.primary}
              strokeWidth={4.5 * mirrorLineGlow}
              filter="url(#mirror-glow)"
            />

            {/* Mirror line labels */}
            <g transform={`translate(${CX}, 30)`}>
              <text
                x="0"
                y="0"
                fill={THEME_COLORS.orange.light}
                fontFamily={FONTS.mono}
                fontSize="16"
                fontWeight="800"
                textAnchor="middle"
                letterSpacing="1"
              >
                Garis Cermin (Sumbu Y)
              </text>
            </g>
          </g>
        )}

        {/* 2. TRANSITION: EXPANDING CIRCULAR ROTATION HALO AROUND ORIGIN O */}
        {transitionToCircleProg > 0 && (
          <g opacity={transitionToCircleProg}>
            {/* Pulsing origin circle */}
            <circle
              cx={CX}
              cy={CY}
              r={180 * transitionToCircleProg}
              fill="none"
              stroke={THEME_COLORS.orange.primary}
              strokeWidth="3.5"
              strokeDasharray="8 8"
              filter="url(#mirror-glow)"
              style={{
                transform: `rotate(${transitionToCircleProg * 180}deg)`,
                transformOrigin: `${CX}px ${CY}px`,
              }}
            />
            <circle
              cx={CX}
              cy={CY}
              r={240 * transitionToCircleProg}
              fill="none"
              stroke={THEME_COLORS.teal.light}
              strokeWidth="2"
              strokeDasharray="12 6"
              filter="url(#mirror-glow)"
            />

            {/* Glowing Origin Point Indicator */}
            <circle cx={CX} cy={CY} r="12" fill="#FFF" filter="url(#point-sparkle)" />
            <text
              x={CX}
              y={CY - 22}
              fill="#FFF"
              fontFamily={FONTS.mono}
              fontSize="20"
              fontWeight="bold"
              textAnchor="middle"
            >
              Titik Pusat O(0,0)
            </text>
          </g>
        )}

        {/* 3. PERPENDICULAR DISTANCE GUIDELINES (d and d') */}
        {pointPProg > 0 && (
          <g opacity={pointPProg * (1 - transitionToCircleProg)}>
            {/* Right Guideline: P(x,y) to Mirror */}
            <line
              x1={CX}
              y1={POINT_Y}
              x2={CX + POINT_DIST}
              y2={POINT_Y}
              stroke={THEME_COLORS.orange.light}
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
            {/* Perpendicular Right Angle symbol on mirror */}
            <polyline
              points={`${CX},${POINT_Y - 14} ${CX + 14},${POINT_Y - 14} ${CX + 14},${POINT_Y}`}
              fill="none"
              stroke={THEME_COLORS.orange.light}
              strokeWidth="2"
            />

            {/* Right Distance Bracket & Label "d" */}
            <g transform={`translate(${CX + POINT_DIST / 2}, ${POINT_Y - 18})`}>
              <rect
                x="-24"
                y="-13"
                width="48"
                height="22"
                rx="6"
                fill="rgba(7, 13, 30, 0.9)"
                stroke={THEME_COLORS.orange.primary}
                strokeWidth="1.2"
              />
              <text
                x="0"
                y="3"
                fill={THEME_COLORS.orange.light}
                fontFamily={FONTS.mono}
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
              >
                d
              </text>
            </g>

            {/* Left Guideline: Mirror to P'(-x,y) */}
            {trajectoryProg > 0.05 && (
              <>
                <line
                  x1={CX}
                  y1={POINT_Y}
                  x2={CX - POINT_DIST * trajectoryProg}
                  y2={POINT_Y}
                  stroke={THEME_COLORS.teal.light}
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                {/* Left Distance Bracket & Label "d" when reached */}
                {trajectoryProg > 0.9 && (
                  <g transform={`translate(${CX - POINT_DIST / 2}, ${POINT_Y - 18})`}>
                    <rect
                      x="-24"
                      y="-13"
                      width="48"
                      height="22"
                      rx="6"
                      fill="rgba(7, 13, 30, 0.9)"
                      stroke={THEME_COLORS.teal.primary}
                      strokeWidth="1.2"
                    />
                    <text
                      x="0"
                      y="3"
                      fill={THEME_COLORS.teal.light}
                      fontFamily={FONTS.mono}
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      d
                    </text>
                  </g>
                )}
              </>
            )}

            {/* Point P(x,y) Node */}
            <circle cx={CX + POINT_DIST} cy={POINT_Y} r="8" fill="#FFF" stroke={THEME_COLORS.gold.primary} strokeWidth="3" />
            <text
              x={CX + POINT_DIST + 18}
              y={POINT_Y + 6}
              fill={THEME_COLORS.gold.light}
              fontFamily={FONTS.mono}
              fontSize="18"
              fontWeight="bold"
            >
              P(x, y)
            </text>

            {/* Moving Point Spark along reflection trajectory */}
            {trajectoryProg > 0 && trajectoryProg < 1 && (
              <circle
                cx={currentPtX}
                cy={POINT_Y}
                r="10"
                fill="#FFF"
                filter="url(#point-sparkle)"
              />
            )}

            {/* Bayangan Node P'(-x,y) */}
            {trajectoryProg > 0.9 && (
              <g>
                <circle cx={CX - POINT_DIST} cy={POINT_Y} r="8" fill="#FFF" stroke={THEME_COLORS.teal.primary} strokeWidth="3" />
                <text
                  x={CX - POINT_DIST - 18}
                  y={POINT_Y + 6}
                  fill={THEME_COLORS.teal.light}
                  fontFamily={FONTS.mono}
                  fontSize="18"
                  fontWeight="bold"
                  textAnchor="end"
                >
                  P'(-x, y)
                </text>
              </g>
            )}
          </g>
        )}
      </svg>

      {/* 4. POHON HAYAT MOTIF LAYER */}
      {/* Aligned so its trunk matches CX = 400 exactly */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 100,
          pointerEvents: "none",
        }}
      >
        <PohonHayat
          width={600}
          height={700}
          side="both"
          drawProgress={mirrorEntrance}
          reflectionProgress={fullReflectionProg}
          glow={true}
        />
      </div>
    </div>
  );
};
