// src/components/common/GoldenParticles.tsx
import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { THEME_COLORS } from "../../constants/theme";

interface Particle {
  id: number;
  initialX: number;
  initialY: number;
  size: number;
  speed: number;
  phase: number;
  layer: "bg" | "mid" | "fg";
  opacity: number;
}

export const GoldenParticles: React.FC<{ count?: number; active?: boolean }> = ({
  count = 45,
  active = true,
}) => {
  const frame = useCurrentFrame();

  // Generate deterministic particles
  const particles = useMemo(() => {
    const list: Particle[] = [];
    for (let i = 0; i < count; i++) {
      // Linear congruential pseudo-random generator
      const pseudoRand = (seed: number) => {
        const x = Math.sin(seed * 9999 + 1) * 10000;
        return x - Math.floor(x);
      };

      const x = pseudoRand(i * 3 + 1) * 1080;
      const y = pseudoRand(i * 3 + 2) * 1920;
      const sizeSeed = pseudoRand(i * 3 + 3);

      let layer: "bg" | "mid" | "fg" = "mid";
      let size = 3;
      let speed = 1.2;
      let opacity = 0.6;

      if (sizeSeed < 0.35) {
        layer = "bg";
        size = 1.8 + sizeSeed * 2;
        speed = 0.5 + sizeSeed * 0.8;
        opacity = 0.4;
      } else if (sizeSeed < 0.8) {
        layer = "mid";
        size = 3.2 + sizeSeed * 2.5;
        speed = 1.1 + sizeSeed * 1.2;
        opacity = 0.75;
      } else {
        layer = "fg";
        size = 5.5 + sizeSeed * 3.5;
        speed = 2.0 + sizeSeed * 1.5;
        opacity = 0.9;
      }

      list.push({
        id: i,
        initialX: x,
        initialY: y,
        size,
        speed,
        phase: pseudoRand(i * 7) * Math.PI * 2,
        layer,
        opacity,
      });
    }
    return list;
  }, [count]);

  if (!active) return null;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {particles.map((p) => {
        // Floating upward movement with wrapping
        const currentY = (p.initialY - frame * p.speed * 1.4 + 1920 * 10) % 1920;
        // Gentle horizontal sway
        const currentX =
          p.initialX + Math.sin(frame * 0.04 + p.phase) * (p.layer === "fg" ? 18 : 10);

        // Twinkling shimmer
        const shimmer = interpolate(
          Math.sin(frame * 0.08 + p.phase),
          [-1, 1],
          [0.35, 1.0]
        );

        const currentOpacity = p.opacity * shimmer;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: currentX,
              top: currentY,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: THEME_COLORS.gold.light,
              boxShadow:
                p.layer === "fg"
                  ? `0 0 ${p.size * 2.5}px ${THEME_COLORS.gold.primary}, 0 0 ${p.size * 5}px rgba(245, 158, 11, 0.4)`
                  : `0 0 ${p.size * 1.8}px ${THEME_COLORS.gold.primary}`,
              opacity: currentOpacity,
              filter: p.layer === "fg" ? "blur(0.4px)" : undefined,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
