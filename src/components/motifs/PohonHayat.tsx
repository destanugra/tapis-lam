// src/components/motifs/PohonHayat.tsx
import React from "react";
import { THEME_COLORS } from "../../constants/theme";

interface PohonHayatProps {
  width?: number;
  height?: number;
  side?: "right" | "left" | "both";
  drawProgress?: number;
  reflectionProgress?: number; // 0 to 1 for the mirrored left side
  glow?: boolean;
}

export const PohonHayat: React.FC<PohonHayatProps> = ({
  width = 600,
  height = 700,
  side = "both",
  drawProgress = 1,
  reflectionProgress = 1,
  glow = true,
}) => {
  // Center is at X = 300, Y = 620 (base) to 80 (top tip)
  const CX = 300;

  return (
    <svg
      viewBox="0 0 600 700"
      width={width}
      height={height}
      style={{
        overflow: "visible",
        filter: glow
          ? "drop-shadow(0 0 18px rgba(229, 169, 60, 0.45)) drop-shadow(0 0 35px rgba(249, 115, 22, 0.25))"
          : "none",
      }}
    >
      <defs>
        {/* Couched Gold Thread Texture */}
        <pattern
          id="hayat-gold-stitch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="#FDE047" strokeWidth="1.5" />
          <line x1="4" y1="0" x2="4" y2="8" stroke="#D97706" strokeWidth="1" />
        </pattern>

        {/* Glow Filters */}
        <filter id="hayat-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="trunk-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#FFFBEB" />
        </linearGradient>

        <linearGradient id="mirror-ghost-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(249, 115, 22, 0.9)" />
          <stop offset="50%" stopColor="rgba(253, 224, 71, 0.85)" />
          <stop offset="100%" stopColor="rgba(20, 184, 166, 0.8)" />
        </linearGradient>
      </defs>

      {/* CENTRAL TRUNK (Shared center line) */}
      <g opacity={drawProgress}>
        {/* Main central vertical stem */}
        <path
          d={`M ${CX - 6} 640 L ${CX - 4} 120 L ${CX} 80 L ${CX + 4} 120 L ${CX + 6} 640 Z`}
          fill="url(#trunk-grad)"
          stroke="#92400E"
          strokeWidth="1.5"
        />
        {/* Crown finial diamond at top */}
        <polygon
          points={`${CX},60 ${CX + 14},80 ${CX},100 ${CX - 14},80`}
          fill="#FFFDF0"
          stroke={THEME_COLORS.gold.primary}
          strokeWidth="2"
        />
      </g>

      {/* ============================================================== */}
      {/* RIGHT HALF: ORIGINAL MOTIF (x >= CX)                          */}
      {/* ============================================================== */}
      {(side === "right" || side === "both") && (
        <g opacity={drawProgress}>
          {/* Branch 1 (Low branch - wide flourish) */}
          <path
            d={`M ${CX} 560 C ${CX + 70} 560 ${CX + 130} 530 ${CX + 170} 460 C ${CX + 190} 420 ${CX + 175} 390 ${CX + 150} 405 C ${CX + 125} 420 ${CX + 140} 450 ${CX + 120} 475 C ${CX + 90} 505 ${CX + 40} 515 ${CX} 525 Z`}
            fill="url(#trunk-grad)"
            stroke="#FDE047"
            strokeWidth="2"
          />
          {/* Tiered leaves on Branch 1 */}
          <polygon
            points={`${CX + 110},485 ${CX + 155},470 ${CX + 135},505`}
            fill="url(#hayat-gold-stitch)"
            stroke="#E5A93C"
            strokeWidth="1.5"
          />
          <polygon
            points={`${CX + 160},435 ${CX + 215},415 ${CX + 185},455`}
            fill="#FDE047"
            stroke="#92400E"
            strokeWidth="1.5"
          />

          {/* Branch 2 (Middle branch - upward curl) */}
          <path
            d={`M ${CX} 430 C ${CX + 60} 430 ${CX + 120} 400 ${CX + 150} 330 C ${CX + 165} 295 ${CX + 150} 275 ${CX + 130} 290 C ${CX + 110} 305 ${CX + 125} 330 ${CX + 105} 350 C ${CX + 75} 375 ${CX + 35} 385 ${CX} 395 Z`}
            fill="url(#trunk-grad)"
            stroke="#FDE047"
            strokeWidth="2"
          />
          {/* Stylized Paisley / Hook on Branch 2 */}
          <polygon
            points={`${CX + 100},350 ${CX + 145},330 ${CX + 125},370`}
            fill="url(#hayat-gold-stitch)"
            stroke="#E5A93C"
            strokeWidth="1.5"
          />
          <polygon
            points={`${CX + 140},300 ${CX + 190},280 ${CX + 165},320`}
            fill="#FDE047"
            stroke="#92400E"
            strokeWidth="1.5"
          />

          {/* Branch 3 (Upper branch - delicate crowning curve) */}
          <path
            d={`M ${CX} 300 C ${CX + 45} 300 ${CX + 90} 275 ${CX + 110} 220 C ${CX + 120} 190 ${CX + 105} 175 ${CX + 90} 188 C ${CX + 75} 200 ${CX + 85} 220 ${CX + 70} 235 C ${CX + 50} 255 ${CX + 25} 265 ${CX} 270 Z`}
            fill="url(#trunk-grad)"
            stroke="#FDE047"
            strokeWidth="2"
          />
          <polygon
            points={`${CX + 95},200 ${CX + 135},185 ${CX + 115},220`}
            fill="#FDE047"
            stroke="#92400E"
            strokeWidth="1.5"
          />

          {/* Stepped Roots (Base) */}
          <polygon
            points={`${CX},640 ${CX + 80},640 ${CX + 120},670 ${CX + 40},670 ${CX},655`}
            fill="url(#trunk-grad)"
            stroke="#E5A93C"
            strokeWidth="2"
          />
          {/* Base stepped chevron decorative notches */}
          <rect x={CX + 20} y="620" width="30" height="8" rx="2" fill="#FDE047" />
          <rect x={CX + 15} y="605" width="22" height="6" rx="2" fill="#E5A93C" />
          <rect x={CX + 10} y="590" width="16" height="5" rx="2" fill="#FDE047" />
        </g>
      )}

      {/* ============================================================== */}
      {/* LEFT HALF: REFLECTION BAYANGAN (x <= CX)                       */}
      {/* Symmetrical counterpart mirrored across CX = 300               */}
      {/* ============================================================== */}
      {(side === "left" || side === "both") && (
        <g
          opacity={reflectionProgress}
          style={{
            transform: `scaleX(${reflectionProgress})`,
            transformOrigin: `${CX}px center`,
          }}
        >
          {/* Branch 1 Mirrored */}
          <path
            d={`M ${CX} 560 C ${CX - 70} 560 ${CX - 130} 530 ${CX - 170} 460 C ${CX - 190} 420 ${CX - 175} 390 ${CX - 150} 405 C ${CX - 125} 420 ${CX - 140} 450 ${CX - 120} 475 C ${CX - 90} 505 ${CX - 40} 515 ${CX} 525 Z`}
            fill={reflectionProgress < 0.95 ? "url(#mirror-ghost-grad)" : "url(#trunk-grad)"}
            stroke="#FDE047"
            strokeWidth="2"
          />
          <polygon
            points={`${CX - 110},485 ${CX - 155},470 ${CX - 135},505`}
            fill="url(#hayat-gold-stitch)"
            stroke="#E5A93C"
            strokeWidth="1.5"
          />
          <polygon
            points={`${CX - 160},435 ${CX - 215},415 ${CX - 185},455`}
            fill="#FDE047"
            stroke="#92400E"
            strokeWidth="1.5"
          />

          {/* Branch 2 Mirrored */}
          <path
            d={`M ${CX} 430 C ${CX - 60} 430 ${CX - 120} 400 ${CX - 150} 330 C ${CX - 165} 295 ${CX - 150} 275 ${CX - 130} 290 C ${CX - 110} 305 ${CX - 125} 330 ${CX - 105} 350 C ${CX - 75} 375 ${CX - 35} 385 ${CX} 395 Z`}
            fill={reflectionProgress < 0.95 ? "url(#mirror-ghost-grad)" : "url(#trunk-grad)"}
            stroke="#FDE047"
            strokeWidth="2"
          />
          <polygon
            points={`${CX - 100},350 ${CX - 145},330 ${CX - 125},370`}
            fill="url(#hayat-gold-stitch)"
            stroke="#E5A93C"
            strokeWidth="1.5"
          />
          <polygon
            points={`${CX - 140},300 ${CX - 190},280 ${CX - 165},320`}
            fill="#FDE047"
            stroke="#92400E"
            strokeWidth="1.5"
          />

          {/* Branch 3 Mirrored */}
          <path
            d={`M ${CX} 300 C ${CX - 45} 300 ${CX - 90} 275 ${CX - 110} 220 C ${CX - 120} 190 ${CX - 105} 175 ${CX - 90} 188 C ${CX - 75} 200 ${CX - 85} 220 ${CX - 70} 235 C ${CX - 50} 255 ${CX - 25} 265 ${CX} 270 Z`}
            fill={reflectionProgress < 0.95 ? "url(#mirror-ghost-grad)" : "url(#trunk-grad)"}
            stroke="#FDE047"
            strokeWidth="2"
          />
          <polygon
            points={`${CX - 95},200 ${CX - 135},185 ${CX - 115},220`}
            fill="#FDE047"
            stroke="#92400E"
            strokeWidth="1.5"
          />

          {/* Stepped Roots Mirrored */}
          <polygon
            points={`${CX},640 ${CX - 80},640 ${CX - 120},670 ${CX - 40},670 ${CX},655`}
            fill={reflectionProgress < 0.95 ? "url(#mirror-ghost-grad)" : "url(#trunk-grad)"}
            stroke="#E5A93C"
            strokeWidth="2"
          />
          <rect x={CX - 50} y="620" width="30" height="8" rx="2" fill="#FDE047" />
          <rect x={CX - 37} y="605" width="22" height="6" rx="2" fill="#E5A93C" />
          <rect x={CX - 26} y="590" width="16" height="5" rx="2" fill="#FDE047" />
        </g>
      )}
    </svg>
  );
};
