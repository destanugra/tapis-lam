// src/MainVideo.tsx
import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { FontLoader } from "./components/common/FontLoader";
import { VIDEO_CONFIG } from "./constants/theme";
import { Scene01Opening } from "./scenes/Scene01Opening/Scene01Opening";
import { Scene02MengenalTapis } from "./scenes/Scene02MengenalTapis/Scene02MengenalTapis";
import { Scene03PertanyaanPemantik } from "./scenes/Scene03PertanyaanPemantik/Scene03PertanyaanPemantik";
import { Scene04TigaMotifKunci } from "./scenes/Scene04TigaMotifKunci/Scene04TigaMotifKunci";
import { Scene05Translasi } from "./scenes/Scene05Translasi/Scene05Translasi";
import { Scene06Refleksi } from "./scenes/Scene06Refleksi/Scene06Refleksi";
import { Scene07Rotasi } from "./scenes/Scene07Rotasi/Scene07Rotasi";
import { Scene08Dilatasi } from "./scenes/Scene08Dilatasi/Scene08Dilatasi";
import { Scene09RefleksiGeser } from "./scenes/Scene09RefleksiGeser/Scene09RefleksiGeser";
import { Scene10Rangkuman } from "./scenes/Scene10Rangkuman/Scene10Rangkuman";
import { Scene11TantanganPBL } from "./scenes/Scene11TantanganPBL/Scene11TantanganPBL";
import { Scene12Penutup } from "./scenes/Scene12Penutup/Scene12Penutup";

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#040711" }}>
      <FontLoader />

      {/* Series timeline for seamless scene progression */}
      <Series>
        {/* ADEGAN 1 — PEMBUKA SINEMATIK (00:00 - 00:13 = 390 frames) */}
        <Series.Sequence durationInFrames={VIDEO_CONFIG.scene01Frames}>
          <Scene01Opening />
        </Series.Sequence>

        {/* ADEGAN 2 — MENGENAL KAIN TAPIS (00:13 - 00:38 = 750 frames) */}
        <Series.Sequence durationInFrames={VIDEO_CONFIG.scene02Frames}>
          <Scene02MengenalTapis />
        </Series.Sequence>

        {/* ADEGAN 3 — PERTANYAAN PEMANTIK (00:38 - 00:52 = 420 frames) */}
        <Series.Sequence durationInFrames={VIDEO_CONFIG.scene03Frames}>
          <Scene03PertanyaanPemantik />
        </Series.Sequence>

        {/* ADEGAN 4 — TIGA MOTIF KUNCI (00:52 - 01:12 = 600 frames) */}
        <Series.Sequence durationInFrames={VIDEO_CONFIG.scene04Frames}>
          <Scene04TigaMotifKunci />
        </Series.Sequence>

        {/* ADEGAN 5 — TRANSLASI (01:12 - 01:47 = 1050 frames) */}
        <Series.Sequence durationInFrames={VIDEO_CONFIG.scene05Frames}>
          <Scene05Translasi />
        </Series.Sequence>

        {/* ADEGAN 6 — REFLEKSI (01:47 - 02:18 = 930 frames) */}
        <Series.Sequence durationInFrames={VIDEO_CONFIG.scene06Frames}>
          <Scene06Refleksi />
        </Series.Sequence>

        {/* ADEGAN 7 — ROTASI (02:18 - 02:44 = 780 frames) */}
        <Series.Sequence durationInFrames={VIDEO_CONFIG.scene07Frames}>
          <Scene07Rotasi />
        </Series.Sequence>

        {/* ADEGAN 8 — DILATASI (02:44 - 03:14 = 900 frames) */}
        <Series.Sequence durationInFrames={VIDEO_CONFIG.scene08Frames}>
          <Scene08Dilatasi />
        </Series.Sequence>

        {/* ADEGAN 9 — REFLEKSI GESER (03:14 - 03:46 = 960 frames) */}
        <Series.Sequence durationInFrames={VIDEO_CONFIG.scene09Frames}>
          <Scene09RefleksiGeser />
        </Series.Sequence>

        {/* ADEGAN 10 — RANGKUMAN (03:46 - 04:03 = 510 frames) */}
        <Series.Sequence durationInFrames={VIDEO_CONFIG.scene10Frames}>
          <Scene10Rangkuman />
        </Series.Sequence>

        {/* ADEGAN 11 — TANTANGAN PBL & AI ASSISTANT (04:03 - 04:33 = 900 frames) */}
        <Series.Sequence durationInFrames={VIDEO_CONFIG.scene11Frames}>
          <Scene11TantanganPBL />
        </Series.Sequence>

        {/* ADEGAN 12 — PENUTUP & KREDIT (04:33 - 04:45 = 360 frames) */}
        <Series.Sequence durationInFrames={VIDEO_CONFIG.scene12Frames}>
          <Scene12Penutup />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
