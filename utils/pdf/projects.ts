import { PDFFont, PDFPage } from "pdf-lib";
import type { PdfThemeColors } from "./styles/select-colors-by-theme";
import { drawUnderlinedText } from "./styles";
import type { InfoForPortifolioType } from "@/types";

type GenerateProjectPartParamsType = {
  page: PDFPage;
  font: PDFFont;
  fontBold: PDFFont;
  y: number;
  infoForPortifolio: InfoForPortifolioType;
  themeColors: PdfThemeColors;
};

export async function generateProjectPart(
  params: GenerateProjectPartParamsType,
) {
  const { page, font, fontBold, infoForPortifolio, themeColors } = params;
  let { y } = params;

  page.drawText(infoForPortifolio.projects_section.title, {
    x: 50,
    y,
    size: 18,
    font: fontBold,
    color: themeColors.text,
  });
  y -= 20;

  page.drawText(
    `Tecnologias principais: ${infoForPortifolio.projects_section.principal_tecnologies}`,
    {
      x: 50,
      y,
      size: 12,
      font,
      maxWidth: 510,
      lineHeight: 15,
      color: themeColors.primary,
    },
  );
  y -= 20;

  page.drawText(infoForPortifolio.projects_section.description, {
    x: 50,
    y,
    size: 12,
    font,
    maxWidth: 510,
    lineHeight: 15,
    color: themeColors.text,
    opacity: 0.7,
  });
  y -= 45;

  infoForPortifolio.projects_section.projects?.forEach((project) => {
    page.drawText(project.title, {
      x: 50,
      y,
      size: 14,
      font: fontBold,
      color: themeColors.text,
    });
    y -= 18;

    page.drawText(project.description, {
      x: 50,
      y,
      size: 12,
      font,
      maxWidth: 510,
      lineHeight: 15,
      color: themeColors.text,
      opacity: 0.7,
    });
    y -= 18;

    drawUnderlinedText({
      page,
      text: `Deploy: ${project.link}`,
      x: 50,
      y,
      size: 11,
      font: fontBold,
      color: themeColors.secondary,
    });
    y -= 18;

    drawUnderlinedText({
      page,
      text: `Repositório: ${project.repository}`,
      x: 50,
      y,
      size: 11,
      font: fontBold,
      color: themeColors.secondary,
    });
    y -= 25;
  });

  // separa a próxima sessão
  y -= 10;

  return { y };
}
