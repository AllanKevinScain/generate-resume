import { PDFFont, PDFPage } from "pdf-lib";
import type { PdfThemeColors } from "./styles/select-colors-by-theme";
import type { InfoForPortifolioType } from "@/types";

type GenerateDifferentialsPartParamsType = {
  page: PDFPage;
  font: PDFFont;
  fontBold: PDFFont;
  y: number;
  infoForPortifolio: InfoForPortifolioType;
  themeColors: PdfThemeColors;
};

export async function generateDifferentialsPart(
  params: GenerateDifferentialsPartParamsType,
) {
  const { page, font, fontBold, infoForPortifolio, themeColors } = params;
  let { y } = params;

  page.drawText(infoForPortifolio.differentials_section.title, {
    x: 50,
    y,
    size: 18,
    font: fontBold,
    color: themeColors.text,
  });
  y -= 20;

  page.drawText(infoForPortifolio.differentials_section.description, {
    x: 50,
    y,
    size: 12,
    font,
    maxWidth: 510,
    lineHeight: 15,
    color: themeColors.text,
    opacity: 0.7,
  });
  y -= 25;

  infoForPortifolio.differentials_section.differentials?.forEach((item) => {
    page.drawText(item.title, {
      x: 50,
      y,
      size: 14,
      font: fontBold,
      color: themeColors.primary,
    });
    y -= 18;

    page.drawText(item.description, {
      x: 50,
      y,
      size: 12,
      font,
      maxWidth: 510,
      lineHeight: 15,
      color: themeColors.secondary,
      opacity: 0.7,
    });
    y -= 25;
  });

  // separa a próxima sessão
  y -= 10;

  return { y };
}
