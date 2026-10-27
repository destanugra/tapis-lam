// src/components/motifs/TapisRepeatingLajur.tsx
import React from "react";
import { THEME_COLORS } from "../../constants/theme";
import { BelahKetupat } from "./BelahKetupat";
import { BintangDelapan } from "./BintangDelapan";
import { PucukRebung } from "./PucukRebung";

interface TapisRepeatingLajurProps {
  glow?: boolean;
  highlightLajur?: boolean; // Highlight repeating columns
  highlightPucuk?: boolean; // Highlight single Pucuk Rebung for final zoom
  geometricMode?: number;   // 0 (cloth texture) to 1 (pure vector geometry lines)
}

export const TapisRepeatingLajur: React.FC<TapisRepeatingLajurProps> = ({
  glow = true,
  highlightLajur = false,
  highlightPucuk = false,
  geometricMode = 0,
}) => {
  // Repeating rows of motifs along 3 vertical lajur columns
  // Canvas width: 1400 (wider than screen for smooth horizontal camera pan)
  // Canvas height: 2600 (taller than screen for smooth vertical camera glide)

  const columns = [
    { x: 260, label: "Lajur Kiri (A)" },
    { x: 700, label: "Lajur Utama (B)" },
    { x: 1140, label: "Lajur Kanan (C)" },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: 1400,
        height: 2600,
        backgroundColor: THEME_COLORS.darkBlue.primary,
        overflow: "hidden",
      }}
    >
      {/* 1. Subtle Woven Base Cloth Pattern */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 1 - geometricMode * 0.75,
        }}
      >
        <defs>
          <pattern
            id="tapisClothGrid"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <rect width="16" height="16" fill="#070D1E" />
            <line x1="4" y1="0" x2="4" y2="16" stroke="#101D3A" strokeWidth="1" />
            <line x1="12" y1="0" x2="12" y2="16" stroke="#0D1830" strokeWidth="1" />
            <line x1="0" y1="4" x2="16" y2="4" stroke="#122042" strokeWidth="1" />
            <line x1="0" y1="12" x2="16" y2="12" stroke="#0F1B38" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tapisClothGrid)" />
      </svg>

      {/* 2. Vertical Lajur Stripes (Maroon Velvet Bands & Twin Gold Guidelines) */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="lajurGoldGuide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Separator bands between columns */}
        {[80, 480, 920, 1320].map((bx, idx) => (
          <g key={idx}>
            {/* Maroon band */}
            <rect
              x={bx - 20}
              y="0"
              width="40"
              height="2600"
              fill={THEME_COLORS.maroon.primary}
              fillOpacity={0.85}
            />
            {/* Twin gold guidelines */}
            <line
              x1={bx - 18}
              y1="0"
              x2={bx - 18}
              y2="2600"
              stroke="url(#lajurGoldGuide)"
              strokeWidth="2.5"
            />
            <line
              x1={bx + 18}
              y1="0"
              x2={bx + 18}
              y2="2600"
              stroke="url(#lajurGoldGuide)"
              strokeWidth="2.5"
            />
            {/* Continuous running gold diamond chain along lajur borders */}
            {Array.from({ length: 42 }).map((_, rIdx) => (
              <rect
                key={rIdx}
                x={bx - 4}
                y={rIdx * 62 + 20}
                width="8"
                height="8"
                transform={`rotate(45 ${bx} ${rIdx * 62 + 24})`}
                fill="#FFFBEB"
                stroke="#B45309"
                strokeWidth="1.2"
              />
            ))}
          </g>
        ))}

        {/* Highlight overlay for repeating lajurs */}
        {highlightLajur && (
          <g>
            {columns.map((col, idx) => (
              <rect
                key={idx}
                x={col.x - 170}
                y="60"
                width="340"
                height="2480"
                fill="none"
                stroke={idx === 1 ? THEME_COLORS.gold.light : THEME_COLORS.teal.primary}
                strokeWidth="3"
                strokeDasharray="12 8"
                rx="16"
                filter={`drop-shadow(0 0 16px ${THEME_COLORS.teal.glow})`}
              />
            ))}
          </g>
        )}
      </svg>

      {/* 3. Repeating Motifs inside Columns */}

      {/* Column 0: Left Lajur (Repeating Belah Ketupat & Pucuk Rebung) */}
      <div style={{ position: "absolute", left: columns[0].x - 140, top: 120 }}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} style={{ marginBottom: 140, textAlign: "center" }}>
            <PucukRebung
              width={260}
              height={320}
              drawProgress={1}
              glow={glow}
              inverted={idx % 2 === 1}
            />
            <div style={{ marginTop: 30 }}>
              <BelahKetupat width={170} height={170} drawProgress={1} glow={glow} />
            </div>
          </div>
        ))}
      </div>

      {/* Column 1: Center Master Lajur */}
      <div style={{ position: "absolute", left: columns[1].x - 170, top: 100 }}>
        {/* Unit 1: Top Pucuk Rebung */}
        <div style={{ marginBottom: 90, textAlign: "center" }}>
          <PucukRebung width={320} height={390} drawProgress={1} glow={glow} />
        </div>

        {/* Unit 2: Target Pucuk Rebung for Final Zoom Transition (Y ~ 580 to 980) */}
        <div
          id="targetPucukRebung"
          style={{
            marginBottom: 100,
            textAlign: "center",
            position: "relative",
          }}
        >
          {highlightPucuk && (
            <div
              style={{
                position: "absolute",
                top: -20,
                left: -20,
                right: -20,
                bottom: -20,
                borderRadius: 24,
                border: `3px solid ${THEME_COLORS.gold.light}`,
                boxShadow: `0 0 35px ${THEME_COLORS.gold.primary}`,
                pointerEvents: "none",
                zIndex: 40,
              }}
            />
          )}
          <PucukRebung
            width={340}
            height={420}
            drawProgress={1}
            glow={true}
          />
        </div>

        {/* Unit 3: Central Bunga Bintang Delapan + Belah Ketupat Bersarang (Y ~ 1100) */}
        <div
          style={{
            marginBottom: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute" }}>
            <BelahKetupat width={380} height={380} drawProgress={1} glow={glow} />
          </div>
          <BintangDelapan size={290} drawProgress={1} glow={glow} />
        </div>

        {/* Unit 4: Inverted Bottom Pucuk Rebung (Y ~ 1600) */}
        <div style={{ marginBottom: 100, textAlign: "center" }}>
          <PucukRebung
            width={320}
            height={390}
            drawProgress={1}
            glow={glow}
            inverted={true}
          />
        </div>

        {/* Unit 5: Repeating Bintang Delapan & Belah Ketupat (Y ~ 2100) */}
        <div
          style={{
            marginBottom: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <BelahKetupat width={340} height={340} drawProgress={1} glow={glow} />
        </div>
      </div>

      {/* Column 2: Right Lajur (Symmetrical Repeating Column) */}
      <div style={{ position: "absolute", left: columns[2].x - 140, top: 120 }}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} style={{ marginBottom: 140, textAlign: "center" }}>
            <PucukRebung
              width={260}
              height={320}
              drawProgress={1}
              glow={glow}
              inverted={idx % 2 === 1}
            />
            <div style={{ marginTop: 30 }}>
              <BelahKetupat width={170} height={170} drawProgress={1} glow={glow} />
            </div>
          </div>
        ))}
      </div>

      {/* 4. Geometric Mode Overlay (Fades in during the final transition, turning cloth into pure vector math lines) */}
      {geometricMode > 0 && (
        <svg
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            opacity: geometricMode,
          }}
        >
          {/* Cyan/Toska & Orange coordinate lines centered on the target Pucuk Rebung (x: 700, y: 790) */}
          <line
            x1="200"
            y1="790"
            x2="1200"
            y2="790"
            stroke="#14B8A6"
            strokeWidth="3.5"
            strokeDasharray="10 6"
          />
          <line
            x1="700"
            y1="300"
            x2="700"
            y2="1300"
            stroke="#F97316"
            strokeWidth="3.5"
            strokeDasharray="10 6"
          />
          {/* Coordinate tick marks and labels */}
          <circle cx="700" cy="790" r="10" fill="#FFFDF0" stroke="#F59E0B" strokeWidth="2.5" />
          <text
            x="725"
            y="780"
            fill="#FFF"
            fontFamily="monospace"
            fontSize="28"
            fontWeight="bold"
          >
            P(0,0)
          </text>
        </svg>
      )}
    </div>
  );
};
