import { PDFPage, type RGB } from "pdf-lib";
import { degradeGenerateColor } from "./degrade-color";

type DrawGradientBarParamsType = {
  page: PDFPage;
  x: number;
  y: number;
  fromColor: RGB;
  toColor: RGB;
};

export async function drawGradientBar({
  page,
  x,
  y,
  fromColor,
  toColor,
}: DrawGradientBarParamsType) {
  const steps = 100;
  const { width, height } = page.getSize();

  for (let i = 0; i < steps; i++) {
    const t = i / steps;

    const color = degradeGenerateColor({
      fromColor,
      toColor,
      t,
    });

    page.drawRectangle({
      x: x + (width / steps) * i,
      y,
      width: width / steps + 1,
      height,
      color: color,
    });
  }
}
