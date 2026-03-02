import type { PDFFont, PDFPage, RGB } from "pdf-lib";

type DrawUnderlinedTextParamsType = {
  page: PDFPage;
  x: number;
  y: number;
  color: RGB;
  text: string;
  font: PDFFont;
  size?: number;
  thickness?: number;
  offset?: number;
};

export function drawUnderlinedText(params: DrawUnderlinedTextParamsType) {
  const {
    page,
    text,
    x,
    y,
    size = 16,
    font,
    color,
    thickness = 1,
    offset = 2,
  } = params;

  page.drawText(text, {
    x,
    y,
    size,
    font,
    color,
  });

  const width = font.widthOfTextAtSize(text, size);

  page.drawLine({
    start: { x, y: y - offset },
    end: { x: x + width, y: y - offset },
    thickness,
    color,
  });
}
