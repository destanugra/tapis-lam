// src/scenes/Scene09RefleksiGeser/GlideReflectionStage.tsx
import React from "react";
import { Easing, interpolate, spring, useVideoConfig } from "remotion";
import { PucukRebung } from "../../components/motifs/PucukRebung";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface GlideReflectionStageProps {
  currentFrame: number;
}

export const GlideReflectionStage: React.FC<GlideReflectionStageProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // STAGE 1: Initial Motif and horizontal mirror line (frames 0 - 60)
  const entrance = spring({
    frame: currentFrame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // STAGE 2: STEP 1 - Refleksi terhadap garis tengah horizontal (frames 80 - 230)
  const reflectionProg = interpolate(
    currentFrame,
    [80, 210],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.35, 0, 0.15, 1) }
  );

  // STAGE 3: STEP 2 - Translasi sejajar garis tengah (frames 240 - 420)
  // Transformation 2 happens strictly AFTER transformation 1 is complete!
  const translationProg = interpolate(
    currentFrame,
    [240, 390],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.35, 0, 0.15, 1) }
  );

  // STAGE 4: Full alternating lajur emergence (frames 430 - 740)
  const friezeProg = interpolate(
    currentFrame,
    [430, 680],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0, 0.2, 1) }
  );

  // STAGE 5: Outro transition - Lajur bergerak ke atas membentuk 4 panel (frames 760 - 960)
  const outroProg = interpolate(
    currentFrame,
    [760, 930],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.4, 0, 0.1, 1) }
  );

  const MIDLINE_Y = 380;
  const SHIFT_X = 180; // Translation distance

  // Translated X position of the reflected motif
  const currReflectedX = 310 + SHIFT_X * translationProg;

  return (
    <div
      style={{
        position: "relative",
        width: 900,
        height: 760,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${-outroProg * 260}px)`,
        transition: "transform 0.1s linear",
      }}
    >
      <svg
        viewBox="0 0 900 760"
        width="900"
        height="760"
        style={{
          overflow: "visible",
          filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.8))",
        }}
      >
        <defs>
          <filter id="glide-glow-orange" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glide-glow-teal" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <marker
            id="trans-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={THEME_COLORS.teal.light} />
          </marker>
        </defs>

        {/* 1. HORIZONTAL MIDLINE (SUMBU CERMIN m) */}
        <g opacity={entrance}>
          <line
            x1="50"
            y1={MIDLINE_Y}
            x2="850"
            y2={MIDLINE_Y}
            stroke={THEME_COLORS.orange.primary}
            strokeWidth="3.5"
            filter="url(#glide-glow-orange)"
          />
          {/* Label for Mirror Axis */}
          <g transform={`translate(150, ${MIDLINE_Y - 14})`}>
            <rect
              x="-80"
              y="-12"
              width="160"
              height="24"
              rx="6"
              fill="rgba(7, 13, 30, 0.9)"
              stroke={THEME_COLORS.orange.primary}
              strokeWidth="1.2"
            />
            <text
              x="0"
              y="4"
              fill={THEME_COLORS.orange.light}
              fontFamily={FONTS.mono}
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
            >
              Garis Cermin Horizontal (m)
            </text>
          </g>
        </g>

        {/* 2. STEP 1: REFLECTION GUIDE ARROW (Vertical flip) */}
        {reflectionProg > 0 && reflectionProg < 1 && (
          <g opacity={Math.min(1, reflectionProg * 1.5)}>
            <line
              x1="310"
              y1="260"
              x2="310"
              y2={260 + 240 * reflectionProg}
              stroke={THEME_COLORS.orange.light}
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
          </g>
        )}

        {/* 3. STEP 2: TRANSLATION VECTOR ARROW (Parallel slide) */}
        {translationProg > 0 && (
          <g opacity={Math.min(1, translationProg * 1.5)}>
            <line
              x1="310"
              y1={MIDLINE_Y + 130}
              x2={310 + SHIFT_X * translationProg}
              y2={MIDLINE_Y + 130}
              stroke={THEME_COLORS.teal.light}
              strokeWidth="3.5"
              markerEnd="url(#trans-arrow)"
              filter="url(#glide-glow-teal)"
            />
            {/* Vector Label */}
            <g transform={`translate(${310 + (SHIFT_X * translationProg) / 2}, ${MIDLINE_Y + 160})`}>
              <rect
                x="-40"
                y="-12"
                width="80"
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
                Geser (v⃗)
              </text>
            </g>
          </g>
        )}

        {/* 4. VISUAL STEP SEQUENCE LABELS */}
        <g opacity={entrance}>
          {/* Label 1: Motif Awal */}
          <text
            x="310"
            y="110"
            fill={THEME_COLORS.gold.light}
            fontFamily={FONTS.mono}
            fontSize="15"
            fontWeight="bold"
            textAnchor="middle"
          >
            1. Motif Awal
          </text>

          {/* Label 2: Refleksi */}
          {reflectionProg > 0.5 && (
            <text
              x="310"
              y={MIDLINE_Y + 250}
              fill={THEME_COLORS.orange.light}
              fontFamily={FONTS.mono}
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
            >
              2. Refleksi
            </text>
          )}

          {/* Label 3: Translasi */}
          {translationProg > 0.8 && (
            <text
              x={310 + SHIFT_X}
              y={MIDLINE_Y + 250}
              fill={THEME_COLORS.teal.light}
              fontFamily={FONTS.mono}
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
            >
              3. Hasil Refleksi Geser
            </text>
          )}
        </g>
      </svg>

      {/* 5. MOTIFS LAYER */}
      {/* 5a. Initial Upright Motif */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 215,
          opacity: entrance,
          pointerEvents: "none",
        }}
      >
        <PucukRebung width={190} height={230} drawProgress={1} glow={true} />
      </div>

      {/* 5b. Reflected & Translated Motif (pointing downwards) */}
      {reflectionProg > 0 && (
        <div
          style={{
            position: "absolute",
            top: MIDLINE_Y + 20,
            left: currReflectedX - 95,
            opacity: reflectionProg,
            transform: `rotate(180deg) scale(${0.85 + reflectionProg * 0.15})`,
            pointerEvents: "none",
            filter: translationProg > 0.9
              ? "drop-shadow(0 0 20px rgba(229,169,60,0.7))"
              : "drop-shadow(0 0 15px rgba(249,115,22,0.6))",
          }}
        >
          <PucukRebung width={190} height={230} drawProgress={1} glow={true} />
        </div>
      )}

      {/* 5c. Complete Alternating Frieze Pattern Cascade (frames 430+) */}
      {friezeProg > 0 && (
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 0,
            width: 900,
            opacity: friezeProg,
            pointerEvents: "none",
          }}
        >
          {/* Preceding motif pair at left */}
          <div style={{ position: "absolute", left: 35 }}>
            <PucukRebung width={190} height={230} drawProgress={1} glow={true} />
          </div>
          <div style={{ position: "absolute", left: 125, top: MIDLINE_Y - 110, transform: "rotate(180deg)" }}>
            <PucukRebung width={190} height={230} drawProgress={1} glow={true} />
          </div>

          {/* Succeeding motif pair at right */}
          <div style={{ position: "absolute", left: 575 }}>
            <PucukRebung width={190} height={230} drawProgress={1} glow={true} />
          </div>
          <div style={{ position: "absolute", left: 665, top: MIDLINE_Y - 110, transform: "rotate(180deg)" }}>
            <PucukRebung width={190} height={230} drawProgress={1} glow={true} />
          </div>
        </div>
      )}

      {/* 6. OUTRO: 4 PANELS EMERGENCE HINT (frames 760+) */}
      {outroProg > 0 && (
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 50,
            width: 800,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            opacity: outroProg,
            pointerEvents: "none",
          }}
        >
          {["Translasi", "Refleksi", "Rotasi", "Dilatasi"].map((name, idx) => (
            <div
              key={name}
              style={{
                height: 110,
                borderRadius: 16,
                backgroundColor: "rgba(13, 23, 48, 0.75)",
                border: `1.5px dashed ${THEME_COLORS.gold.primary}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONTS.sans,
                fontSize: 16,
                fontWeight: 700,
                color: THEME_COLORS.gold.light,
              }}
            >
              Panel {idx + 1}: {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
