// src/scenes/Scene01Opening/ThreadAnimation.tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME_COLORS } from "../../constants/theme";

interface ThreadAnimationProps {
  progress: number; // 0 to 1
}

export const ThreadAnimation: React.FC<ThreadAnimationProps> = ({ progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Center birth spark (frames 0 to 60)
  const sparkScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const sparkOpacity = interpolate(frame, [0, 15, 60, 110], [0, 1, 0.9, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Thread draw progress across screen
  const threadProg = interpolate(progress, [0.08, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing radiant rings
  const ringScale = interpolate(frame % 45, [0, 45], [0.2, 2.5]);
  const ringOpacity = interpolate(frame % 45, [0, 15, 45], [0, 0.8, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <radialGradient id="sparkGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#FFFBEB" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="threadGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* 1. Growing Geometrical Golden Threads (Trajectories from center to borders and corners) */}
        <g stroke="url(#threadGoldGrad)" strokeLinecap="round" strokeLinejoin="round">
          {/* Symmetrical Cardinal Lines */}
          <line
            x1="540"
            y1="960"
            x2="540"
            y2={960 - 800 * threadProg}
            strokeWidth="3.5"
            strokeOpacity="0.85"
            filter="drop-shadow(0 0 8px #F59E0B)"
          />
          <line
            x1="540"
            y1="960"
            x2="540"
            y2={960 + 800 * threadProg}
            strokeWidth="3.5"
            strokeOpacity="0.85"
            filter="drop-shadow(0 0 8px #F59E0B)"
          />
          <line
            x1="540"
            y1="960"
            x2={540 - 460 * threadProg}
            y2="960"
            strokeWidth="3.5"
            strokeOpacity="0.85"
            filter="drop-shadow(0 0 8px #F59E0B)"
          />
          <line
            x1="540"
            y1="960"
            x2={540 + 460 * threadProg}
            y2="960"
            strokeWidth="3.5"
            strokeOpacity="0.85"
            filter="drop-shadow(0 0 8px #F59E0B)"
          />

          {/* Symmetrical Curving Weaving Arcs */}
          {/* Top-Right Arc */}
          <path
            d={`M 540 960 Q 750 750 850 ${960 - 550 * threadProg}`}
            fill="none"
            strokeWidth="2.8"
            strokeDasharray="900"
            strokeDashoffset={900 * (1 - threadProg)}
            strokeOpacity="0.75"
          />
          {/* Top-Left Arc */}
          <path
            d={`M 540 960 Q 330 750 230 ${960 - 550 * threadProg}`}
            fill="none"
            strokeWidth="2.8"
            strokeDasharray="900"
            strokeDashoffset={900 * (1 - threadProg)}
            strokeOpacity="0.75"
          />
          {/* Bottom-Right Arc */}
          <path
            d={`M 540 960 Q 750 1170 850 ${960 + 550 * threadProg}`}
            fill="none"
            strokeWidth="2.8"
            strokeDasharray="900"
            strokeDashoffset={900 * (1 - threadProg)}
            strokeOpacity="0.75"
          />
          {/* Bottom-Left Arc */}
          <path
            d={`M 540 960 Q 330 1170 230 ${960 + 550 * threadProg}`}
            fill="none"
            strokeWidth="2.8"
            strokeDasharray="900"
            strokeDashoffset={900 * (1 - threadProg)}
            strokeOpacity="0.75"
          />

          {/* Concentric Elliptical Weaving Orbits */}
          <ellipse
            cx="540"
            cy="960"
            rx={280 * threadProg}
            ry={380 * threadProg}
            fill="none"
            strokeWidth="2"
            strokeDasharray="16 10"
            strokeOpacity="0.5"
          />
          <ellipse
            cx="540"
            cy="960"
            rx={420 * threadProg}
            ry={560 * threadProg}
            fill="none"
            strokeWidth="1.6"
            strokeDasharray="8 8"
            strokeOpacity="0.35"
          />
        </g>

        {/* 2. Expanding Radiant Ring waves from initial spark */}
        {frame < 120 && (
          <circle
            cx="540"
            cy="960"
            r={160 * ringScale}
            fill="none"
            stroke="#FDE047"
            strokeWidth="2"
            opacity={ringOpacity}
          />
        )}

        {/* 3. Center Golden Light Point / Orb of Genesis */}
        <g
          transform={`translate(540, 960) scale(${sparkScale})`}
          opacity={sparkOpacity}
        >
          {/* Outer glow aura */}
          <circle cx="0" cy="0" r="120" fill="url(#sparkGlow)" />

          {/* Cross Star Flares */}
          <polygon
            points="0,-90 14,-14 90,0 14,14 0,90 -14,14 -90,0 -14,-14"
            fill="#FFFDF0"
            filter="drop-shadow(0 0 16px #FFF)"
            transform={`rotate(${frame * 2})`}
          />

          <polygon
            points="0,-60 10,-10 60,0 10,10 0,60 -10,10 -60,0 -10,-10"
            fill="#FDE047"
            transform={`rotate(${frame * -2.5 + 45})`}
          />

          {/* Intense core diamond */}
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};
