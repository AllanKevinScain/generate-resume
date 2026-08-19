import type { ThemeType } from '@/types';
import { rgb, type RGB } from 'pdf-lib';

export type PdfThemeColors = {
  bg: RGB;
  text: RGB;
  primary: RGB;
  secondary: RGB;
  border: RGB;
};

function hexToPdfRgb(hex: string) {
  const cleanHex = hex.replace('#', '');

  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  return rgb(r, g, b);
}

function selectColorsByTheme(theme: ThemeType) {
  let bg = '#ffffff',
    text = '#111111',
    primary = '#2563eb',
    secondary = '#9333ea',
    border = '#e5e7eb';

  if (theme === 'light') {
    bg = '#ffffff';
    text = '#111111';
    primary = '#2563eb';
    secondary = '#9333ea';
    border = '#e5e7eb';
  }

  if (theme === 'dark') {
    bg = '#0f172a';
    text = '#e5e7eb';
    primary = '#3b82f6';
    secondary = '#a855f7';
    border = '#1f2937';
  }

  if (theme === 'rocketseat') {
    bg = '#121214';
    text = '#e1e1e6';
    primary = '#8257e6';
    secondary = '#996dff';
    border = '#202024';
  }

  if (theme === 'minecraft') {
    bg = '#1e3a1e';
    text = '#d4ffd4';
    primary = '#3fa34d';
    secondary = '#8b5a2b';
    border = '#2d5a2d';
  }

  if (theme === 'alura') {
    bg = '#0b2545';
    text = '#e0f2ff';
    primary = '#00a3ff';
    secondary = '#00e0ff';
    border = '#123d6b';
  }

  if (theme === 'instagram') {
    bg = '#000000';
    text = '#fafafa';
    primary = '#dd2a7b';
    secondary = '#8134af';
    border = '#262626';
  }

  return { bg, text, primary, secondary, border };
}

export function selectPdfColorsByTheme(theme: ThemeType): PdfThemeColors {
  const colors = selectColorsByTheme(theme);

  return {
    bg: hexToPdfRgb(colors.bg),
    text: hexToPdfRgb(colors.text),
    primary: hexToPdfRgb(colors.primary),
    secondary: hexToPdfRgb(colors.secondary),
    border: hexToPdfRgb(colors.border),
  };
}
