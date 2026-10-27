// src/scenes/Scene05Translasi/CartesianTranslationPlane.tsx
import React from "react";
import { Easing, interpolate, spring, useVideoConfig } from "remotion";
import { PucukRebung } from "../../components/motifs/PucukRebung";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface CartesianTranslationPlaneProps {
  currentFrame: number;
}

export const CartesianTranslationPlane: React.FC<CartesianTranslationPlaneProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // Grid constants
  const UNIT = 54; // pixels per coordinate unit
  const ORIGIN_X = 220; // coordinate (0,0) in SVG space
  const ORIGIN_Y = 580;

  const toPxX = (x: number) => ORIGIN_X + x * UNIT;
  const toPxY = (y: number) => ORIGIN_Y - y * UNIT;

  // Vertices of original triangle ABC
  const A = { x: toPxX(0), y: toPxY(0) }; // (0,0)
  const B = { x: toPxX(4), y: toPxY(0) }; // (4,0)
  const C = { x: toPxX(2), y: toPxY(6) }; // (2,6)

  // Vertices of target translated triangle A'B'C' (v = (5,0))
  const A_prime = { x: toPxX(5), y: toPxY(0) }; // (5,0)
  const B_prime = { x: toPxX(9), y: toPxY(0) }; // (9,0)
  const C_prime = { x: toPxX(7), y: toPxY(6) }; // (7,6)

  // 1. Grid Entrance animation (frames 0 - 60)
  const gridEntrance = spring({
    frame: currentFrame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // 2. Original Triangle ABC drawing progress (frames 20 - 90)
  const triangleDrawProg = interpolate(
    currentFrame,
    [20, 85],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0.8, 0.2, 1) }
  );

  // 3. Translation vector v=(5,0) arrow appearance (frames 95 - 190)
  const vectorProg = interpolate(
    currentFrame,
    [95, 175],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0, 0.2, 1) }
  );

  // 4. Smooth motion of translated shadow (frames 190 - 390)
  const translationMotionProg = interpolate(
    currentFrame,
    [190, 360],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.4, 0, 0.15, 1) }
  );

  // Current animated points during translation
  const currA_prime = {
    x: toPxX(5 * translationMotionProg),
    y: toPxY(0),
  };
  const currB_prime = {
    x: toPxX(4 + 5 * translationMotionProg),
    y: toPxY(0),
  };
  const currC_prime = {
    x: toPxX(2 + 5 * translationMotionProg),
    y: toPxY(6),
  };

  // 5. Solidification into gold embroidery when arriving (frames 360 - 450)
  const goldSolidifyProg = interpolate(
    currentFrame,
    [360, 420],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 6. Multi-motif repetition (frames 480 - 750)
  const multiMotifProg = interpolate(
    currentFrame,
    [480, 680],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0, 0.2, 1) }
  );

  // 7. Morphing triangles into ornate Pucuk Rebung motifs (frames 650 - 860)
  const ornateMotifMorphProg = interpolate(
    currentFrame,
    [650, 820],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0, 0.1, 1) }
  );

  // 8. Outro camera tilt & Y-axis transformation to mirror reflection line (frames 860 - 1050)
  const mirrorAxisGlow = interpolate(
    currentFrame,
    [870, 1020],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "relative",
        width: 1000,
        height: 720,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 1000 720"
        width="1000"
        height="720"
        style={{
          overflow: "visible",
          filter: "drop-shadow(0 15px 35px rgba(0,0,0,0.7))",
        }}
      >
        <defs>
          {/* Arrowhead marker for Vector v */}
          <marker
            id="vector-arrow"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill={THEME_COLORS.teal.light} />
          </marker>

          {/* Glow filter for active elements */}
          <filter id="glow-gold" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-teal" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-orange-mirror" x="-50%" y="-20%" width="200%" height="140%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Linear gradient for translated shadow */}
          <linearGradient id="toska-shadow-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(20, 184, 166, 0.45)" />
            <stop offset="100%" stopColor="rgba(94, 234, 212, 0.2)" />
          </linearGradient>

          {/* Gold gradient for solid motif */}
          <linearGradient id="gold-solid-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(229, 169, 60, 0.9)" />
            <stop offset="50%" stopColor="rgba(253, 224, 71, 0.95)" />
            <stop offset="100%" stopColor="rgba(245, 158, 11, 0.85)" />
          </linearGradient>
        </defs>

        {/* 1. COORDINATE GRID LINES */}
        <g opacity={gridEntrance * 0.45}>
          {/* Vertical grid lines (x = -2 to 14) */}
          {[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((xVal) => (
            <line
              key={`vert-${xVal}`}
              x1={toPxX(xVal)}
              y1={toPxY(-1)}
              x2={toPxX(xVal)}
              y2={toPxY(8)}
              stroke={xVal === 0 ? "rgba(255,255,255,0.4)" : "rgba(255, 255, 255, 0.12)"}
              strokeWidth={xVal === 0 ? 2 : 1}
              strokeDasharray={xVal % 5 === 0 ? "none" : "4 4"}
            />
          ))}

          {/* Horizontal grid lines (y = -1 to 8) */}
          {[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8].map((yVal) => (
            <line
              key={`horiz-${yVal}`}
              x1={toPxX(-1)}
              y1={toPxY(yVal)}
              x2={toPxX(13)}
              y2={toPxY(yVal)}
              stroke={yVal === 0 ? "rgba(255,255,255,0.4)" : "rgba(255, 255, 255, 0.12)"}
              strokeWidth={yVal === 0 ? 2 : 1}
              strokeDasharray={yVal % 2 === 0 ? "none" : "4 4"}
            />
          ))}
        </g>

        {/* 2. AXES: X and Y with labels */}
        <g opacity={gridEntrance}>
          {/* X Axis */}
          <line
            x1={toPxX(-1.5)}
            y1={toPxY(0)}
            x2={toPxX(13.5)}
            y2={toPxY(0)}
            stroke="#94A3B8"
            strokeWidth="3"
          />
          <text
            x={toPxX(13.6)}
            y={toPxY(0) + 6}
            fill="#CBD5E1"
            fontFamily={FONTS.mono}
            fontSize="18"
            fontWeight="bold"
          >
            X
          </text>

          {/* Y Axis (which transforms to Orange Mirror line at outro) */}
          <line
            x1={toPxX(0)}
            y1={toPxY(-1.2)}
            x2={toPxX(0)}
            y2={toPxY(8.2)}
            stroke={mirrorAxisGlow > 0 ? THEME_COLORS.orange.primary : "#94A3B8"}
            strokeWidth={3 + mirrorAxisGlow * 5}
            filter={mirrorAxisGlow > 0 ? "url(#glow-orange-mirror)" : undefined}
          />
          <text
            x={toPxX(0) - 26}
            y={toPxY(8.2) + 18}
            fill={mirrorAxisGlow > 0 ? THEME_COLORS.orange.light : "#CBD5E1"}
            fontFamily={FONTS.mono}
            fontSize="18"
            fontWeight="bold"
          >
            Y
          </text>

          {/* Number tick marks on X-axis */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
            <text
              key={`tick-${num}`}
              x={toPxX(num)}
              y={toPxY(0) + 26}
              fill={num === 0 || num === 5 || num === 9 ? THEME_COLORS.gold.light : "rgba(255,255,255,0.6)"}
              fontFamily={FONTS.mono}
              fontSize="16"
              fontWeight={num === 0 || num === 5 || num === 9 ? "bold" : "normal"}
              textAnchor="middle"
            >
              {num}
            </text>
          ))}

          {/* Number tick marks on Y-axis */}
          {[2, 4, 6].map((num) => (
            <text
              key={`ytick-${num}`}
              x={toPxX(0) - 16}
              y={toPxY(num) + 6}
              fill={num === 6 ? THEME_COLORS.gold.light : "rgba(255,255,255,0.6)"}
              fontFamily={FONTS.mono}
              fontSize="16"
              fontWeight={num === 6 ? "bold" : "normal"}
              textAnchor="end"
            >
              {num}
            </text>
          ))}
        </g>

        {/* 3. DASHED DISPLACEMENT GUIDELINES (A -> A', B -> B', C -> C') */}
        {translationMotionProg > 0 && (
          <g opacity={Math.min(1, translationMotionProg * 1.5)}>
            {/* Guide line A to A' */}
            <line
              x1={A.x}
              y1={A.y - 12}
              x2={currA_prime.x}
              y2={currA_prime.y - 12}
              stroke={THEME_COLORS.teal.light}
              strokeWidth="2.5"
              strokeDasharray="6 4"
              filter="url(#glow-teal)"
            />
            {/* Guide line B to B' */}
            <line
              x1={B.x}
              y1={B.y - 12}
              x2={currB_prime.x}
              y2={currB_prime.y - 12}
              stroke={THEME_COLORS.teal.light}
              strokeWidth="2.5"
              strokeDasharray="6 4"
              filter="url(#glow-teal)"
            />
            {/* Guide line C to C' */}
            <line
              x1={C.x}
              y1={C.y}
              x2={currC_prime.x}
              y2={currC_prime.y}
              stroke={THEME_COLORS.teal.light}
              strokeWidth="2.5"
              strokeDasharray="6 4"
              filter="url(#glow-teal)"
            />

            {/* Distance marker indicator on guide line C */}
            <g transform={`translate(${(C.x + currC_prime.x) / 2}, ${C.y - 20})`}>
              <rect
                x="-36"
                y="-15"
                width="72"
                height="22"
                rx="6"
                fill="rgba(7, 13, 30, 0.9)"
                stroke={THEME_COLORS.teal.primary}
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="1"
                fill={THEME_COLORS.teal.light}
                fontFamily={FONTS.mono}
                fontSize="13"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                Δx = +5
              </text>
            </g>
          </g>
        )}

        {/* 4. TRANSLATION VECTOR v⃗ = (5, 0) ARROW */}
        {vectorProg > 0 && (
          <g opacity={vectorProg}>
            <line
              x1={toPxX(0)}
              y1={toPxY(-0.7)}
              x2={toPxX(5 * vectorProg)}
              y2={toPxY(-0.7)}
              stroke={THEME_COLORS.teal.light}
              strokeWidth="4"
              markerEnd={vectorProg > 0.4 ? "url(#vector-arrow)" : undefined}
              filter="url(#glow-teal)"
            />
            {/* Vector Label */}
            <g transform={`translate(${toPxX(2.5)}, ${toPxY(-0.7) - 22})`}>
              <rect
                x="-55"
                y="-14"
                width="110"
                height="28"
                rx="8"
                fill="rgba(7, 13, 30, 0.92)"
                stroke={THEME_COLORS.teal.primary}
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="4"
                fill={THEME_COLORS.teal.light}
                fontFamily={FONTS.mono}
                fontSize="15"
                fontWeight="800"
                textAnchor="middle"
              >
                v⃗ = (5, 0)
              </text>
            </g>
          </g>
        )}

        {/* 5. MULTI-TRANSLATION REPETITION ROW (Frames 480+) */}
        {multiMotifProg > 0 && (
          <g opacity={multiMotifProg}>
            {/* Triangle 2 (at x = 10, v2 = 10) */}
            <polygon
              points={`${toPxX(10)},${toPxY(0)} ${toPxX(14)},${toPxY(0)} ${toPxX(12)},${toPxY(6)}`}
              fill="rgba(229, 169, 60, 0.35)"
              stroke={THEME_COLORS.gold.primary}
              strokeWidth="3"
            />
            {/* Triangle -1 (at x = -5) */}
            <polygon
              points={`${toPxX(-5)},${toPxY(0)} ${toPxX(-1)},${toPxY(0)} ${toPxX(-3)},${toPxY(6)}`}
              fill="rgba(229, 169, 60, 0.25)"
              stroke={THEME_COLORS.gold.primary}
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* 6. TRANSLATED IMAGE TRIANGLE A'B'C' (Moves as Toska shadow, then solidifies to gold) */}
        {translationMotionProg > 0 && (
          <g>
            <polygon
              points={`${currA_prime.x},${currA_prime.y} ${currB_prime.x},${currB_prime.y} ${currC_prime.x},${currC_prime.y}`}
              fill={goldSolidifyProg > 0.5 ? "url(#gold-solid-grad)" : "url(#toska-shadow-grad)"}
              stroke={goldSolidifyProg > 0.5 ? THEME_COLORS.gold.light : THEME_COLORS.teal.light}
              strokeWidth={goldSolidifyProg > 0.5 ? 4 : 3}
              strokeLinejoin="round"
              filter={goldSolidifyProg > 0.5 ? "url(#glow-gold)" : "url(#glow-teal)"}
            />

            {/* Target Vertex Nodes A', B', C' */}
            <circle cx={currA_prime.x} cy={currA_prime.y} r="7" fill="#FFF" />
            <circle cx={currB_prime.x} cy={currB_prime.y} r="7" fill="#FFF" />
            <circle cx={currC_prime.x} cy={currC_prime.y} r="7" fill="#FFF" />

            {/* Target Vertex Labels */}
            <text
              x={currA_prime.x}
              y={currA_prime.y + 24}
              fill="#FFF"
              fontFamily={FONTS.mono}
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
            >
              A'(5,0)
            </text>
            <text
              x={currB_prime.x}
              y={currB_prime.y + 24}
              fill="#FFF"
              fontFamily={FONTS.mono}
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
            >
              B'(9,0)
            </text>
            <text
              x={currC_prime.x + 14}
              y={currC_prime.y - 8}
              fill="#FFF"
              fontFamily={FONTS.mono}
              fontSize="16"
              fontWeight="bold"
            >
              C'(7,6)
            </text>
          </g>
        )}

        {/* 7. ORIGINAL OBJECT TRIANGLE ABC (A(0,0), B(4,0), C(2,6)) */}
        {triangleDrawProg > 0 && (
          <g opacity={Math.min(1, triangleDrawProg * 1.5)}>
            <polygon
              points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
              fill="rgba(245, 158, 11, 0.35)"
              stroke={THEME_COLORS.gold.light}
              strokeWidth="4"
              strokeLinejoin="round"
              filter="url(#glow-gold)"
            />

            {/* Vertex Nodes A, B, C */}
            <circle cx={A.x} cy={A.y} r="8" fill="#FFFFFF" stroke={THEME_COLORS.gold.primary} strokeWidth="2.5" />
            <circle cx={B.x} cy={B.y} r="8" fill="#FFFFFF" stroke={THEME_COLORS.gold.primary} strokeWidth="2.5" />
            <circle cx={C.x} cy={C.y} r="8" fill="#FFFFFF" stroke={THEME_COLORS.gold.primary} strokeWidth="2.5" />

            {/* Labels for Origin Vertices */}
            <text
              x={A.x - 12}
              y={A.y + 24}
              fill={THEME_COLORS.gold.light}
              fontFamily={FONTS.mono}
              fontSize="17"
              fontWeight="bold"
              textAnchor="end"
            >
              A(0,0)
            </text>
            <text
              x={B.x}
              y={B.y + 24}
              fill={THEME_COLORS.gold.light}
              fontFamily={FONTS.mono}
              fontSize="17"
              fontWeight="bold"
              textAnchor="middle"
            >
              B(4,0)
            </text>
            <text
              x={C.x - 14}
              y={C.y - 12}
              fill={THEME_COLORS.gold.light}
              fontFamily={FONTS.mono}
              fontSize="17"
              fontWeight="bold"
              textAnchor="end"
            >
              C(2,6)
            </text>
          </g>
        )}
      </svg>

      {/* 8. OVERLAY ORNAMENTAL PUCUK REBUNG MORPH (Forms the authentic lajur at frames 650+) */}
      {ornateMotifMorphProg > 0 && (
        <div
          style={{
            position: "absolute",
            top: 250,
            left: 0,
            width: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            opacity: ornateMotifMorphProg,
            pointerEvents: "none",
          }}
        >
          {[-1, 0, 1, 2].map((idx) => (
            <div
              key={`pucuk-${idx}`}
              style={{
                transform: `scale(${0.72 + ornateMotifMorphProg * 0.08})`,
                filter: "drop-shadow(0 0 16px rgba(229,169,60,0.4))",
              }}
            >
              <PucukRebung width={200} height={250} drawProgress={1} glow={true} />
            </div>
          ))}
        </div>
      )}

      {/* 9. OUTRO: TRANSITION TO MIRROR AXIS BADGE (frames 870+) */}
      {mirrorAxisGlow > 0 && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: mirrorAxisGlow,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              padding: "6px 18px",
              borderRadius: 20,
              backgroundColor: "rgba(249, 115, 22, 0.2)",
              border: `1.5px solid ${THEME_COLORS.orange.primary}`,
              color: THEME_COLORS.orange.light,
              fontFamily: FONTS.sans,
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)",
            }}
          >
            Sumbu Vertikal → Garis Cermin Simetri
          </div>
        </div>
      )}
    </div>
  );
};
