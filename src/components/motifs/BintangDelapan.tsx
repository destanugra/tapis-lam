// src/components/motifs/BintangDelapan.tsx
import React from "react";
import { THEME_COLORS } from "../../constants/theme";

interface BintangDelapanProps {
  size?: number;
  drawProgress?: number; // 0 to 1 for progressive thread growth
  rotation?: number; // for rotation animations
  glow?: boolean;
}

export const BintangDelapan: React.FC<BintangDelapanProps> = ({
  size = 260,
  drawProgress = 1,
  rotation = 0,
  glow = true,
}) => {
  const center = 150;
  const outerRadius = 135;
  const innerRadius = 55;
  const coreRadius = 24;

  // 8 Petals radiating every 45 degrees
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "inline-block",
        transform: `rotate(${rotation}deg)`,
        filter: glow
          ? `drop-shadow(0 0 20px ${THEME_COLORS.gold.glow}) drop-shadow(0 4px 16px rgba(0,0,0,0.85))`
          : "drop-shadow(0 4px 12px rgba(0,0,0,0.8))",
      }}
    >
      <svg
        viewBox="0 0 300 300"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="bintangGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <radialGradient id="centerGemGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF0" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#701A28" />
            <stop offset="100%" stopColor="#3B0713" />
          </radialGradient>
        </defs>

        {/* 1. Traditional Octagram Outer Thread Border */}
        <g>
          {angles.map((ang, i) => {
            const rad = (ang * Math.PI) / 180;
            const nextRad = (((ang + 45) % 360) * Math.PI) / 180;
            const midRad = (((ang + 22.5) % 360) * Math.PI) / 180;

            const tipX = center + outerRadius * Math.cos(rad);
            const tipY = center + outerRadius * Math.sin(rad);

            const innerX = center + innerRadius * Math.cos(midRad);
            const innerY = center + innerRadius * Math.sin(midRad);

            const nextTipX = center + outerRadius * Math.cos(nextRad);
            const nextTipY = center + outerRadius * Math.sin(nextRad);

            return (
              <g key={i}>
                {/* Petal Fill */}
                <polygon
                  points={`${center},${center} ${tipX},${tipY} ${innerX},${innerY}`}
                  fill={i % 2 === 0 ? "#881337" : "#581825"}
                  fillOpacity={0.85 * drawProgress}
                />
                <polygon
                  points={`${center},${center} ${innerX},${innerY} ${nextTipX},${nextTipY}`}
                  fill={i % 2 === 0 ? "#581825" : "#881337"}
                  fillOpacity={0.85 * drawProgress}
                />

                {/* Golden Embroidery Outline */}
                <path
                  d={`M ${center} ${center} L ${tipX} ${tipY} L ${innerX} ${innerY} Z`}
                  fill="none"
                  stroke="url(#bintangGold)"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                  strokeDasharray="400"
                  strokeDashoffset={400 * (1 - drawProgress)}
                />

                {/* Inner Gold Diamond Petal Rib */}
                <line
                  x1={center}
                  y1={center}
                  x2={tipX}
                  y2={tipY}
                  stroke="#FFF2B2"
                  strokeWidth="2"
                  strokeDasharray="200"
                  strokeDashoffset={200 * (1 - drawProgress)}
                />

                {/* Tip Golden Orb Node */}
                <circle
                  cx={tipX}
                  cy={tipY}
                  r={5}
                  fill="#FFFBEB"
                  stroke="#B45309"
                  strokeWidth="1.5"
                  opacity={drawProgress > 0.6 ? 1 : 0}
                />
              </g>
            );
          })}
        </g>

        {/* 2. Middle Concentric Decorative Octagon Ring */}
        <polygon
          points={angles
            .map((ang) => {
              const rad = (ang * Math.PI) / 180;
              const x = center + (innerRadius + 8) * Math.cos(rad);
              const y = center + (innerRadius + 8) * Math.sin(rad);
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#FDE047"
          strokeWidth="2"
          strokeDasharray="500"
          strokeDashoffset={500 * (1 - drawProgress)}
        />

        {/* 3. Center Rosette Core */}
        <circle
          cx={center}
          cy={center}
          r={coreRadius}
          fill="url(#centerGemGrad)"
          stroke="url(#bintangGold)"
          strokeWidth="3.5"
          opacity={drawProgress > 0.4 ? 1 : 0}
        />

        {/* Inner Center Golden Diamond */}
        <rect
          x={center - 9}
          y={center - 9}
          width="18"
          height="18"
          transform={`rotate(45 ${center} ${center})`}
          fill="#FFFDF0"
          stroke="#D97706"
          strokeWidth="1.8"
          opacity={drawProgress > 0.5 ? 1 : 0}
        />
      </svg>
    </div>
  );
};
