// src/constants/theme.ts
import { VideoThemeColors } from "../types";

export const VIDEO_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 30,
  totalTargetDurationSeconds: 285, // 4 min 45 sec
  totalTargetFrames: 285 * 30, // 8550 frames
  scene01DurationSeconds: 13,
  scene01Frames: 13 * 30, // 390 frames
  scene02DurationSeconds: 25,
  scene02Frames: 25 * 30, // 750 frames
  scene03DurationSeconds: 14,
  scene03Frames: 14 * 30, // 420 frames
  scene04DurationSeconds: 20,
  scene04Frames: 20 * 30, // 600 frames
  scene05DurationSeconds: 35,
  scene05Frames: 35 * 30, // 1050 frames
  scene06DurationSeconds: 31,
  scene06Frames: 31 * 30, // 930 frames
  scene07DurationSeconds: 26,
  scene07Frames: 26 * 30, // 780 frames
  scene08DurationSeconds: 30,
  scene08Frames: 30 * 30, // 900 frames
  scene09DurationSeconds: 32,
  scene09Frames: 32 * 30, // 960 frames
  scene10DurationSeconds: 17,
  scene10Frames: 17 * 30, // 510 frames
  scene11DurationSeconds: 30,
  scene11Frames: 30 * 30, // 900 frames
  scene12DurationSeconds: 12,
  scene12Frames: 12 * 30, // 360 frames
};

export const SAFE_AREAS = {
  top: 140, // Space for phone status bar / notch / punch hole
  bottom: 160, // Space for phone navigation bar / home indicator
  horizontal: 64, // Side gutter for 9:16 layout
  contentWidth: 1080 - 64 * 2, // 952px
};

export const THEME_COLORS: VideoThemeColors = {
  gold: {
    primary: "#E5A93C",
    light: "#FDE047",
    dark: "#92400E",
    glow: "rgba(245, 158, 11, 0.45)",
    gradient: "linear-gradient(135deg, #FFF7D6 0%, #F59E0B 35%, #D97706 70%, #FFFBEB 100%)",
  },
  teal: {
    primary: "#14B8A6",
    light: "#5EEAD4",
    dark: "#0F766E",
    glow: "rgba(20, 184, 166, 0.4)",
  },
  orange: {
    primary: "#F97316",
    light: "#FDBA74",
    dark: "#C2410C",
  },
  maroon: {
    primary: "#701A28",
    light: "#9F1239",
    dark: "#450A14",
  },
  darkBlue: {
    deep: "#040711",
    primary: "#070D1E",
    surface: "#0D1730",
    fabric: "#0A1226",
  },
  white: {
    pure: "#FFFFFF",
    soft: "#F8FAFC",
    muted: "#94A3B8",
  },
};

export const FONTS = {
  title: "'Cinzel', 'Cinzel Decorative', 'Georgia', 'Times New Roman', serif",
  sans: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
};
