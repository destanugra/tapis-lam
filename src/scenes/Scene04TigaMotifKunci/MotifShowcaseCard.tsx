// src/scenes/Scene04TigaMotifKunci/MotifShowcaseCard.tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, THEME_COLORS } from "../../constants/theme";

interface MotifData {
  id: number;
  numberTag: string;
  name: string;
  subtitle: string;
  mathProperty: string;
  badgeColor: string;
  startFrame: number;
  endFrame: number;
}

const MOTIF_INFO: MotifData[] = [
  {
    id: 1,
    numberTag: "MOTIF 01",
    name: "Pucuk Rebung",
    subtitle: "Segitiga bertingkat • Melambangkan kekuatan yang tumbuh",
    mathProperty: "Simetri Refleksi Bilateral & Translasi Linier",
    badgeColor: THEME_COLORS.gold.primary,
    startFrame: 15,
    endFrame: 190,
  },
  {
    id: 2,
    numberTag: "MOTIF 02",
    name: "Belah Ketupat Bersarang",
    subtitle: "Rombus konsentris • Melambangkan ketertiban & keseimbangan",
    mathProperty: "Dilatasi Skala (Perbesaran) & 4 Sumbu Simetri",
    badgeColor: THEME_COLORS.teal.primary,
    startFrame: 195,
    endFrame: 375,
  },
  {
    id: 3,
    numberTag: "MOTIF 03",
    name: "Bunga Bintang Delapan",
    subtitle: "Kelopak melingkar • Mengelilingi satu titik pusat rotasi",
    mathProperty: "Simetri Putar (Rotasi 45°) terhadap Pusat O(0,0)",
    badgeColor: THEME_COLORS.orange.primary,
    startFrame: 380,
    endFrame: 540,
  },
];

export const MotifShowcaseCard: React.FC<{ currentFrame: number }> = ({ currentFrame }) => {
  const { fps } = useVideoConfig();

  const activeMotif = MOTIF_INFO.find(
    (m) => currentFrame >= m.startFrame && currentFrame <= m.endFrame
  );

  if (!activeMotif) return null;

  const progress = currentFrame - activeMotif.startFrame;
  const enterSpring = spring({
    frame: progress,
    fps,
    config: { damping: 15, stiffness: 110 },
  });

  const exitOpacity = interpolate(
    currentFrame,
    [activeMotif.endFrame - 12, activeMotif.endFrame],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const opacity = Math.min(enterSpring, exitOpacity);

  return (
    <div
      style={{
        position: "absolute",
        top: 245,
        left: 54,
        right: 54,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        opacity,
        transform: `translateY(${(1 - enterSpring) * 20}px)`,
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          padding: "22px 32px",
          borderRadius: 24,
          background: "linear-gradient(135deg, rgba(8, 14, 32, 0.94) 0%, rgba(4, 7, 18, 0.97) 100%)",
          border: `1.5px solid ${activeMotif.badgeColor}`,
          boxShadow: `0 16px 40px rgba(0, 0, 0, 0.85), 0 0 24px rgba(229, 169, 60, 0.2)`,
          backdropFilter: "blur(14px)",
          display: "flex",
          alignItems: "center",
          gap: 22,
        }}
      >
        {/* Motif Number Tag */}
        <div
          style={{
            padding: "10px 16px",
            borderRadius: 14,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: `1px solid ${activeMotif.badgeColor}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 85,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "0.12em",
              color: activeMotif.badgeColor,
            }}
          >
            {activeMotif.numberTag}
          </span>
        </div>

        {/* Text Details */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: FONTS.title,
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "0.06em",
              color: "#FFFDF0",
              textShadow: "0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            {activeMotif.name}
          </div>

          <div
            style={{
              marginTop: 4,
              fontFamily: FONTS.sans,
              fontSize: 20,
              fontWeight: 500,
              color: THEME_COLORS.white.soft,
            }}
          >
            {activeMotif.subtitle}
          </div>

          {/* Math Characteristic Badge */}
          <div
            style={{
              marginTop: 8,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 12px",
              borderRadius: 8,
              backgroundColor: "rgba(20, 184, 166, 0.15)",
              border: "1px solid rgba(20, 184, 166, 0.35)",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: THEME_COLORS.teal.light }} />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 16,
                fontWeight: 600,
                color: THEME_COLORS.teal.light,
              }}
            >
              Karakter: {activeMotif.mathProperty}
            </span>
          </div>
        </div>

        {/* Diamond Accent */}
        <div
          style={{
            width: 14,
            height: 14,
            transform: "rotate(45deg)",
            backgroundColor: activeMotif.badgeColor,
            boxShadow: `0 0 10px ${activeMotif.badgeColor}`,
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
};
