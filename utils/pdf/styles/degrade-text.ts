import type { PDFFont, PDFPage, RGB } from "pdf-lib";
import { degradeGenerateColor } from "./degrade-color";

type DrawGradientTextParamsType = {
  page: PDFPage;
  x: number;
  y: number;
  fromColor: RGB;
  toColor: RGB;
  text: string;
  font: PDFFont;
  size?: number;
};

export async function drawGradientText(params: DrawGradientTextParamsType) {
  const { page, text, x, y, size = 16, font, fromColor, toColor } = params;
  let currentX = x;

  for (let i = 0; i < text.length; i++) {
    const t = i / (text.length - 1);

    const color = degradeGenerateColor({
      fromColor,
      toColor,
      t,
    });

    page.drawText(text[i], {
      x: currentX,
      y,
      size,
      font,
      color,
    });

    currentX += font.widthOfTextAtSize(text[i], size);
  }
}
