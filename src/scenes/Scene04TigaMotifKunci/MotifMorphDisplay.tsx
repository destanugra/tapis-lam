// src/scenes/Scene04TigaMotifKunci/MotifMorphDisplay.tsx
import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BelahKetupat } from "../../components/motifs/BelahKetupat";
import { BintangDelapan } from "../../components/motifs/BintangDelapan";
import { PucukRebung } from "../../components/motifs/PucukRebung";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface MotifMorphDisplayProps {
  currentFrame: number;
}

export const MotifMorphDisplay: React.FC<MotifMorphDisplayProps> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  // Motif 1: Pucuk Rebung (Frames 0 to 185)
  const motif1Opacity = interpolate(
    currentFrame,
    [0, 20, 170, 190],
    [1, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const motif1Scale = spring({
    frame: currentFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Motif 2: Belah Ketupat Bersarang (Frames 185 to 375)
  const motif2Opacity = interpolate(
    currentFrame,
    [185, 205, 360, 380],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const motif2Scale = spring({
    frame: currentFrame - 185,
    fps,
    config: { damping: 14, stiffness: 95 },
  });

  // Motif 3: Bunga Bintang Delapan (Frames 375 to 540)
  const motif3Opacity = interpolate(
    currentFrame,
    [375, 395, 525, 545],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const motif3Scale = spring({
    frame: currentFrame - 375,
    fps,
    config: { damping: 14, stiffness: 95 },
  });
  // Rotation animation around center point for Star (0 deg to 45 deg)
  const starRotation = interpolate(
    currentFrame,
    [380, 520],
    [0, 45],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0.8, 0.2, 1) }
  );

  // Outro: Morphs back to Pucuk Rebung into a coordinate triangle (Frames 535 to 600)
  const outroOpacity = interpolate(
    currentFrame,
    [535, 555, 600],
    [0, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const coordinateTriangleProg = interpolate(
    currentFrame,
    [550, 595],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0, 0.1, 1) }
  );

  return (
    <div
      style={{
        position: "relative",
        width: 700,
        height: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 1. Backdrop Ambient Ring */}
      <svg
        width="700"
        height="700"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <circle
          cx="350"
          cy="350"
          r="280"
          fill="none"
          stroke="rgba(229, 169, 60, 0.18)"
          strokeWidth="1.5"
          strokeDasharray="8 8"
        />
        <circle
          cx="350"
          cy="350"
          r="330"
          fill="none"
          stroke="rgba(20, 184, 166, 0.15)"
          strokeWidth="1.2"
          strokeDasharray="12 6"
        />
      </svg>

      {/* --- MOTIF 1: PUCUK REBUNG --- */}
      {motif1Opacity > 0 && (
        <div
          style={{
            position: "absolute",
            opacity: motif1Opacity,
            transform: `scale(${0.9 + motif1Scale * 0.1})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PucukRebung width={360} height={440} drawProgress={1} glow={true} />

          {/* Symmetrical Axis Indicator Line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 2,
              background: "linear-gradient(180deg, rgba(20,184,166,0) 0%, #14B8A6 50%, rgba(20,184,166,0) 100%)",
              boxShadow: "0 0 10px #14B8A6",
              opacity: 0.8,
            }}
          />
        </div>
      )}

      {/* --- MOTIF 2: BELAH KETUPAT BERSARANG --- */}
      {motif2Opacity > 0 && (
        <div
          style={{
            position: "absolute",
            opacity: motif2Opacity,
            transform: `scale(${0.88 + motif2Scale * 0.12})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BelahKetupat width={460} height={460} drawProgress={1} glow={true} />

          {/* Concentric Dilation Rays (Diagonal guidelines) */}
          <svg
            width="500"
            height="500"
            style={{ position: "absolute", pointerEvents: "none" }}
          >
            <line x1="50" y1="50" x2="450" y2="450" stroke="#14B8A6" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.6" />
            <line x1="450" y1="50" x2="50" y2="450" stroke="#14B8A6" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.6" />
          </svg>
        </div>
      )}

      {/* --- MOTIF 3: BUNGA BINTANG DELAPAN (WITH CLEAR CENTER POINT) --- */}
      {motif3Opacity > 0 && (
        <div
          style={{
            position: "absolute",
            opacity: motif3Opacity,
            transform: `scale(${0.9 + motif3Scale * 0.1})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Radial Angle Guidelines */}
          <svg
            width="560"
            height="560"
            style={{ position: "absolute", pointerEvents: "none" }}
          >
            {[0, 45, 90, 135].map((ang, idx) => {
              const rad = (ang * Math.PI) / 180;
              const x1 = 280 - 240 * Math.cos(rad);
              const y1 = 280 - 240 * Math.sin(rad);
              const x2 = 280 + 240 * Math.cos(rad);
              const y2 = 280 + 240 * Math.sin(rad);
              return (
                <line
                  key={idx}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#F97316"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  opacity="0.5"
                />
              );
            })}
          </svg>

          <BintangDelapan
            size={420}
            drawProgress={1}
            rotation={starRotation}
            glow={true}
          />

          {/* Prominent Glowing Center Point Indicator O(0,0) */}
          <div
            style={{
              position: "absolute",
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: "#FFFDF0",
              border: `3px solid ${THEME_COLORS.orange.primary}`,
              boxShadow: `0 0 18px ${THEME_COLORS.orange.light}, 0 0 30px #FFF`,
              zIndex: 30,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "calc(50% + 22px)",
              fontFamily: FONTS.mono,
              fontSize: 18,
              fontWeight: 800,
              color: THEME_COLORS.orange.light,
              backgroundColor: "rgba(7, 13, 30, 0.9)",
              padding: "4px 10px",
              borderRadius: 8,
              border: `1px solid ${THEME_COLORS.orange.primary}`,
              zIndex: 30,
            }}
          >
            Pusat Rotasi O(0,0)
          </div>
        </div>
      )}

      {/* --- OUTRO TRANSITION: PUCUK REBUNG MORPHS TO COORDINATE TRIANGLE (Frames 535 to 600) --- */}
      {outroOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            opacity: outroOpacity,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Pucuk Rebung fading to pure triangle */}
          <div style={{ opacity: 1 - coordinateTriangleProg * 0.85 }}>
            <PucukRebung width={360} height={440} drawProgress={1} glow={true} />
          </div>

          {/* Clean Coordinate Grid and Geometric Triangle overlay */}
          <svg
            viewBox="0 0 600 600"
            width="600"
            height="600"
            style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
          >
            {/* Coordinate Axes */}
            <g opacity={coordinateTriangleProg}>
              {/* X Axis */}
              <line
                x1={300 - 260 * coordinateTriangleProg}
                y1="340"
                x2={300 + 260 * coordinateTriangleProg}
                y2="340"
                stroke="#14B8A6"
                strokeWidth="3.5"
                filter="drop-shadow(0 0 8px #14B8A6)"
              />
              {/* Y Axis */}
              <line
                x1="300"
                y1={340 + 220 * coordinateTriangleProg}
                x2="300"
                y2={340 - 240 * coordinateTriangleProg}
                stroke="#F97316"
                strokeWidth="3.5"
                filter="drop-shadow(0 0 8px #F97316)"
              />

              {/* Triangle Vertices */}
              <polygon
                points="300,160 440,430 160,430"
                fill="rgba(245, 158, 11, 0.25)"
                stroke="#FDE047"
                strokeWidth="4"
                strokeLinejoin="round"
                filter="drop-shadow(0 0 16px #F59E0B)"
              />

              {/* Vertex Nodes */}
              <circle cx="300" cy="160" r="7" fill="#FFF" />
              <circle cx="440" cy="430" r="7" fill="#FFF" />
              <circle cx="160" cy="430" r="7" fill="#FFF" />

              <text x="315" y="155" fill="#FFF" fontFamily={FONTS.mono} fontSize="20" fontWeight="bold">
                A(0, y₁)
              </text>
              <text x="450" y="445" fill="#FFF" fontFamily={FONTS.mono} fontSize="20" fontWeight="bold">
                C(x₂, y₂)
              </text>
              <text x="80" y="445" fill="#FFF" fontFamily={FONTS.mono} fontSize="20" fontWeight="bold">
                B(-x₂, y₂)
              </text>
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};
