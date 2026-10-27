// src/Composition.tsx
import React from "react";
import { Composition, Folder } from "remotion";
import { VIDEO_CONFIG } from "./constants/theme";
import { MainVideo } from "./MainVideo";
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

export const RemotionVideo = () => {
  return (
    <>
      {/* Komposisi Utama Video Lengkap (Format Vertikal HP 1080x1920 @ 30 FPS, Durasi 04:45 / 8550 frames) */}
      <Composition
        id="GeometriTransformasiTapis"
        component={MainVideo}
        durationInFrames={VIDEO_CONFIG.totalTargetFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />

      {/* Folder Adegan Individual untuk Pratinjau & Inspeksi Fokus di Remotion Studio */}
      <Folder name="Scenes">
        <Composition
          id="Scene01-Opening"
          component={Scene01Opening}
          durationInFrames={VIDEO_CONFIG.scene01Frames}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
        <Composition
          id="Scene02-MengenalTapis"
          component={Scene02MengenalTapis}
          durationInFrames={VIDEO_CONFIG.scene02Frames}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
        <Composition
          id="Scene03-PertanyaanPemantik"
          component={Scene03PertanyaanPemantik}
          durationInFrames={VIDEO_CONFIG.scene03Frames}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
        <Composition
          id="Scene04-TigaMotifKunci"
          component={Scene04TigaMotifKunci}
          durationInFrames={VIDEO_CONFIG.scene04Frames}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
        <Composition
          id="Scene05-Translasi"
          component={Scene05Translasi}
          durationInFrames={VIDEO_CONFIG.scene05Frames}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
        <Composition
          id="Scene06-Refleksi"
          component={Scene06Refleksi}
          durationInFrames={VIDEO_CONFIG.scene06Frames}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
        <Composition
          id="Scene07-Rotasi"
          component={Scene07Rotasi}
          durationInFrames={VIDEO_CONFIG.scene07Frames}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
        <Composition
          id="Scene08-Dilatasi"
          component={Scene08Dilatasi}
          durationInFrames={VIDEO_CONFIG.scene08Frames}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
        <Composition
          id="Scene09-RefleksiGeser"
          component={Scene09RefleksiGeser}
          durationInFrames={VIDEO_CONFIG.scene09Frames}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
        <Composition
          id="Scene10-Rangkuman"
          component={Scene10Rangkuman}
          durationInFrames={VIDEO_CONFIG.scene10Frames}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
        <Composition
          id="Scene11-TantanganPBL"
          component={Scene11TantanganPBL}
          durationInFrames={VIDEO_CONFIG.scene11Frames}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
        <Composition
          id="Scene12-Penutup"
          component={Scene12Penutup}
          durationInFrames={VIDEO_CONFIG.scene12Frames}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
      </Folder>
    </>
  );
};
