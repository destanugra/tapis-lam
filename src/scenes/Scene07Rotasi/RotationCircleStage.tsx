// src/scenes/Scene07Rotasi/RotationCircleStage.tsx
import React from "react";
import { Easing, interpolate, spring, useVideoConfig } from "remotion";
import { BelahKetupat } from "../../components/motifs/BelahKetupat";
import { BintangDelapan } from "../../components/motifs/BintangDelapan";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface RotationCircleStageProps {
  currentFrame: number;
}

export const RotationCircleStage: React.FC<RotationCircleStageProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // STAGE 1: Center O(0,0) and initial radial grid entrance (frames 0 - 60)
  const gridEntrance = spring({
    frame: currentFrame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // STAGE 2: Angle arc sweep 0 to 45 deg (frames 80 - 210)
  const angleArcProg = interpolate(
    currentFrame,
    [80, 190],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0, 0.15, 1) }
  );
  const currentAngle = angleArcProg * 45;

  // STAGE 3: Sequential petal emergence (frames 210 - 500)
  // 8 petals at indices 0, 1, 2, 3, 4, 5, 6, 7
  const petalProgresses = [0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
    if (idx === 0) return 1; // Petal 0 is present from start
    if (idx === 1) return angleArcProg; // Petal 1 forms via angle rotation
    const start = 210 + (idx - 2) * 36;
    const end = start + 30;
    return interpolate(
      currentFrame,
      [start, end],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0.8, 0.2, 1) }
    );
  });

  // Full rosette bloom glow (frames 500 - 640)
  const fullBloomProg = interpolate(
    currentFrame,
    [480, 530],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // STAGE 4: Outro transition - Bunga bintang mengecil menuju pusat, berubah menjadi belah ketupat (frames 640 - 780)
  const shrinkProg = interpolate(
    currentFrame,
    [640, 750],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.4, 0, 0.1, 1) }
  );

  const starScale = 1 - shrinkProg * 0.55;
  const starOpacity = 1 - shrinkProg;
  const rhombusOpacity = shrinkProg;

  // SVG Geometry Constants
  const CX = 400;
  const CY = 400;
  const RADIUS = 280;

  // Function to create an SVG arc path
  const createArcPath = (startAngleDeg: number, endAngleDeg: number, r: number) => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = CX + r * Math.cos(toRad(startAngleDeg));
    const y1 = CY + r * Math.sin(toRad(startAngleDeg));
    const x2 = CX + r * Math.cos(toRad(endAngleDeg));
    const y2 = CY + r * Math.sin(toRad(endAngleDeg));
    const largeArcFlag = endAngleDeg - startAngleDeg <= 180 ? "0" : "1";
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
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
          <filter id="rot-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <marker
            id="arc-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill={THEME_COLORS.orange.light} />
          </marker>
        </defs>

        {/* 1. RADIAL COORDINATE AXES (8 Sectors of 45 deg) */}
        <g opacity={gridEntrance * (1 - shrinkProg * 0.8)}>
          {/* Concentric Reference Rings */}
          <circle
            cx={CX}
            cy={CY}
            r="160"
            fill="none"
            stroke="rgba(229, 169, 60, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <circle
            cx={CX}
            cy={CY}
            r="280"
            fill="none"
            stroke="rgba(20, 184, 166, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
          />

          {/* 8 Radial Direction Lines */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x2 = CX + RADIUS * Math.cos(rad);
            const y2 = CY + RADIUS * Math.sin(rad);
            return (
              <g key={`radial-${deg}`}>
                <line
                  x1={CX}
                  y1={CY}
                  x2={x2}
                  y2={y2}
                  stroke={deg === 0 || deg === 45 ? THEME_COLORS.orange.primary : "rgba(255, 255, 255, 0.25)"}
                  strokeWidth={deg === 0 || deg === 45 ? 2.5 : 1}
                  strokeDasharray={deg % 90 === 0 ? "none" : "5 5"}
                />
                {/* Degree Label on perimeter */}
                <text
                  x={CX + (RADIUS + 28) * Math.cos(rad)}
                  y={CY + (RADIUS + 28) * Math.sin(rad) + 5}
                  fill={deg === 0 || deg === 45 ? THEME_COLORS.orange.light : "rgba(255, 255, 255, 0.55)"}
                  fontFamily={FONTS.mono}
                  fontSize="14"
                  fontWeight={deg === 0 || deg === 45 ? "bold" : "normal"}
                  textAnchor="middle"
                >
                  {deg}°
                </text>
              </g>
            );
          })}
        </g>

        {/* 2. ANGULAR ROTATION ARC (0° to 45°) */}
        {angleArcProg > 0 && shrinkProg < 0.9 && (
          <g opacity={Math.min(1, angleArcProg * 1.5)}>
            <path
              d={createArcPath(0, Math.max(1, currentAngle), 180)}
              fill="none"
              stroke={THEME_COLORS.orange.light}
              strokeWidth="3.5"
              markerEnd={angleArcProg > 0.2 ? "url(#arc-arrow)" : undefined}
              filter="url(#rot-glow)"
            />
            {/* Angle Badge */}
            <g transform={`translate(${CX + 215 * Math.cos((22.5 * Math.PI) / 180)}, ${CY + 215 * Math.sin((22.5 * Math.PI) / 180)})`}>
              <rect
                x="-28"
                y="-14"
                width="56"
                height="26"
                rx="6"
                fill="rgba(7, 13, 30, 0.95)"
                stroke={THEME_COLORS.orange.primary}
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="4"
                fill={THEME_COLORS.orange.light}
                fontFamily={FONTS.mono}
                fontSize="15"
                fontWeight="800"
                textAnchor="middle"
              >
                +45°
              </text>
            </g>
          </g>
        )}

        {/* 3. CENTER POINT O(0,0) */}
        <g>
          <circle
            cx={CX}
            cy={CY}
            r="12"
            fill="#FFF"
            stroke={THEME_COLORS.orange.primary}
            strokeWidth="3"
            filter="url(#rot-glow)"
          />
          <text
            x={CX}
            y={CY + 36}
            fill="#FFF"
            fontFamily={FONTS.mono}
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
          >
            O(0,0)
          </text>
        </g>
      </svg>

      {/* 4. ACTIVE 8-POINT FLOWER ROSETTE (Scales & morphs to Belah Ketupat at Outro) */}
      {starOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 150,
            left: 150,
            width: 500,
            height: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${starScale})`,
            opacity: starOpacity,
            willChange: "transform, opacity",
          }}
        >
          {/* Individual animated petals */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
            const prog = petalProgresses[idx];
            if (prog <= 0) return null;
            const deg = idx * 45;
            return (
              <div
                key={`petal-${idx}`}
                style={{
                  position: "absolute",
                  transform: `rotate(${deg}deg) scale(${0.85 + prog * 0.15})`,
                  opacity: prog,
                  transformOrigin: "center center",
                }}
              >
                {/* SVG single couched star diamond petal */}
                <svg width="500" height="500" viewBox="0 0 500 500" style={{ overflow: "visible" }}>
                  <polygon
                    points="250,250 230,140 250,70 270,140"
                    fill="url(#hayat-gold-stitch)"
                    stroke={THEME_COLORS.gold.light}
                    strokeWidth="2.5"
                    filter="drop-shadow(0 0 10px rgba(229,169,60,0.6))"
                  />
                  {/* Central embroidery vein */}
                  <line x1="250" y1="250" x2="250" y2="70" stroke="#FFF" strokeWidth="1.5" />
                  {/* Petal tip spark */}
                  <circle cx="250" cy="70" r="4" fill="#FFF" />
                </svg>
              </div>
            );
          })}

          {/* Complete 8-point Rosette overlay when full bloom */}
          {fullBloomProg > 0 && (
            <div
              style={{
                position: "absolute",
                opacity: fullBloomProg,
                filter: "drop-shadow(0 0 24px rgba(245,158,11,0.7))",
              }}
            >
              <BintangDelapan size={460} drawProgress={1} glow={true} />
            </div>
          )}
        </div>
      )}

      {/* 5. OUTRO MORPH TARGET: BELAH KETUPAT (Reveals as flower shrinks) */}
      {rhombusOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 150,
            left: 150,
            width: 500,
            height: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: rhombusOpacity,
            transform: `scale(${0.7 + rhombusOpacity * 0.3})`,
            filter: "drop-shadow(0 0 30px rgba(20,184,166,0.8))",
          }}
        >
          <BelahKetupat width={440} height={440} drawProgress={1} glow={true} />
        </div>
      )}
    </div>
  );
};
