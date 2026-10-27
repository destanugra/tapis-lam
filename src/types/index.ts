// src/types/index.ts

export interface SubtitleCue {
  id: string;
  startFrame: number;
  endFrame: number;
  text: string;
  highlightWords?: string[];
}

export interface VideoThemeColors {
  gold: {
    primary: string;
    light: string;
    dark: string;
    glow: string;
    gradient: string;
  };
  teal: {
    primary: string;
    light: string;
    dark: string;
    glow: string;
  };
  orange: {
    primary: string;
    light: string;
    dark: string;
  };
  maroon: {
    primary: string;
    light: string;
    dark: string;
  };
  darkBlue: {
    deep: string;
    primary: string;
    surface: string;
    fabric: string;
  };
  white: {
    pure: string;
    soft: string;
    muted: string;
  };
}

export interface SceneProps {
  currentFrame?: number;
}
