// src/components/common/FabricBackground.tsx
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { THEME_COLORS } from "../../constants/theme";

interface FabricBackgroundProps {
  glowIntensity?: number;
  focalPoint?: { x: number; y: number };
}

export const FabricBackground: React.FC<FabricBackgroundProps> = ({
  glowIntensity = 1,
  focalPoint = { x: 540, y: 960 },
}) => {
  const frame = useCurrentFrame();

  // Subtle organic ambient breathing for fabric lighting
  const ambientPulse = interpolate(
    Math.sin((frame / 30) * Math.PI * 0.5),
    [-1, 1],
    [0.92, 1.08]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME_COLORS.darkBlue.deep,
        overflow: "hidden",
      }}
    >
      {/* SVG Fabric Weave Pattern and Atmospheric Lighting */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        <defs>
          {/* Micro-weave texture representing Lampung handwoven cotton/silk warp & weft */}
          <pattern
            id="tapisWeavePattern"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            {/* Dark indigo fabric base */}
            <rect width="12" height="12" fill={THEME_COLORS.darkBlue.primary} />

            {/* Warp threads (vertical) */}
            <line
              x1="3"
              y1="0"
              x2="3"
              y2="12"
              stroke="#132142"
              strokeWidth="1.2"
              strokeOpacity="0.45"
            />
            <line
              x1="9"
              y1="0"
              x2="9"
              y2="12"
              stroke="#0D1830"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />

            {/* Weft threads (horizontal) */}
            <line
              x1="0"
              y1="3"
              x2="12"
              y2="3"
              stroke="#111D3A"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />
            <line
              x1="0"
              y1="9"
              x2="12"
              y2="9"
              stroke="#16264C"
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />

            {/* Tiny slub fibers */}
            <circle cx="3" cy="9" r="0.6" fill="#1E3260" fillOpacity="0.4" />
            <circle cx="9" cy="3" r="0.6" fill="#1E3260" fillOpacity="0.4" />
          </pattern>

          {/* Radial light glow focusing on center */}
          <radialGradient
            id="centerGoldenGlow"
            cx={focalPoint.x}
            cy={focalPoint.y}
            r="850"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              stopColor="#E5A93C"
              stopOpacity={0.22 * glowIntensity * ambientPulse}
            />
            <stop
              offset="35%"
              stopColor="#701A28"
              stopOpacity={0.16 * glowIntensity}
            />
            <stop
              offset="70%"
              stopColor="#070D1E"
              stopOpacity={0.7}
            />
            <stop
              offset="100%"
              stopColor="#03050C"
              stopOpacity={0.96}
            />
          </radialGradient>

          {/* Vignette mask around edges */}
          <radialGradient
            id="vignetteGrad"
            cx="50%"
            cy="50%"
            r="70%"
          >
            <stop offset="40%" stopColor="#000000" stopOpacity="0" />
            <stop offset="85%" stopColor="#000000" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.92" />
          </radialGradient>
        </defs>

        {/* 1. Weave Layer */}
        <rect width="100%" height="100%" fill="url(#tapisWeavePattern)" />

        {/* 2. Radial Warmth & Light Falloff */}
        <rect width="100%" height="100%" fill="url(#centerGoldenGlow)" />

        {/* 3. Deep Vignette */}
        <rect width="100%" height="100%" fill="url(#vignetteGrad)" />
      </svg>
    </AbsoluteFill>
  );
};
