// src/components/common/SubtitleBar.tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, SAFE_AREAS, THEME_COLORS } from "../../constants/theme";
import { SubtitleCue } from "../../types";

const SCENE_01_CUES: SubtitleCue[] = [
  {
    id: "cue-1",
    startFrame: 175, // 00:05.8
    endFrame: 265,   // 00:08.8
    text: "Selamat datang di video pembelajaran Geometri Transformasi.",
    highlightWords: ["Geometri", "Transformasi."],
  },
  {
    id: "cue-2",
    startFrame: 268, // 00:08.9
    endFrame: 375,   // 00:12.5
    text: "Kali ini kita belajar dari sumber yang sangat dekat: pola kain Tapis Lampung.",
    highlightWords: ["pola", "kain", "Tapis", "Lampung."],
  },
];

export const SubtitleBar: React.FC<{ customCues?: SubtitleCue[] }> = ({
  customCues = SCENE_01_CUES,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Find currently active cue
  const activeCue = customCues.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame
  );

  if (!activeCue) return null;

  const progress = frame - activeCue.startFrame;
  const duration = activeCue.endFrame - activeCue.startFrame;

  // Smooth entrance & exit spring
  const enterSpring = spring({
    frame: progress,
    fps,
    config: { damping: 16, stiffness: 140 },
  });

  const exitOpacity = interpolate(
    frame,
    [activeCue.endFrame - 8, activeCue.endFrame],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const opacity = Math.min(enterSpring, exitOpacity);

  // Audio wave pulse animation
  const wavePulse1 = Math.sin((frame / 30) * Math.PI * 8) * 6 + 10;
  const wavePulse2 = Math.sin((frame / 30) * Math.PI * 10 + 1) * 8 + 14;
  const wavePulse3 = Math.sin((frame / 30) * Math.PI * 6 + 2) * 5 + 8;

  // Split words for highlighting
  const words = activeCue.text.split(" ");

  return (
    <div
      style={{
        position: "absolute",
        bottom: SAFE_AREAS.bottom,
        left: SAFE_AREAS.horizontal,
        right: SAFE_AREAS.horizontal,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity,
        transform: `translateY(${(1 - enterSpring) * 15}px)`,
        zIndex: 60,
      }}
    >
      {/* Subtitle Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          padding: "24px 34px",
          borderRadius: 24,
          background: "linear-gradient(180deg, rgba(8, 14, 30, 0.94) 0%, rgba(4, 7, 16, 0.97) 100%)",
          border: `1.5px solid rgba(229, 169, 60, 0.45)`,
          boxShadow: `0 16px 40px rgba(0, 0, 0, 0.8), 0 0 24px rgba(229, 169, 60, 0.18)`,
          backdropFilter: "blur(18px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        {/* Audio narration indicator header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Animated audio wave bars */}
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <span
              style={{
                width: 3.5,
                height: wavePulse1,
                backgroundColor: THEME_COLORS.gold.primary,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 3.5,
                height: wavePulse2,
                backgroundColor: THEME_COLORS.gold.light,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                width: 3.5,
                height: wavePulse3,
                backgroundColor: THEME_COLORS.gold.primary,
                borderRadius: 2,
              }}
            />
          </div>

          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: THEME_COLORS.gold.light,
              textTransform: "uppercase",
            }}
          >
            NARASI SUARA
          </span>
        </div>

        {/* Subtitle text with word highlights */}
        <p
          style={{
            margin: 0,
            fontFamily: FONTS.sans,
            fontSize: 32,
            lineHeight: 1.45,
            fontWeight: 500,
            textAlign: "center",
            color: THEME_COLORS.white.pure,
            letterSpacing: "0.01em",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.9)",
          }}
        >
          {words.map((word, idx) => {
            const isHighlighted = activeCue.highlightWords?.some((h) =>
              word.toLowerCase().includes(h.toLowerCase().replace(/[.,]/g, ""))
            );

            return (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  margin: "0 4px",
                  color: isHighlighted ? THEME_COLORS.gold.light : THEME_COLORS.white.pure,
                  fontWeight: isHighlighted ? 700 : 500,
                  textShadow: isHighlighted
                    ? `0 0 14px ${THEME_COLORS.gold.glow}`
                    : undefined,
                }}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};
