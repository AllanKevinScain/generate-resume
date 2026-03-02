import { PDFFont, PDFPage } from "pdf-lib";
import type { PdfThemeColors } from "./styles/select-colors-by-theme";
import type { InfoForPortifolioType } from "@/types";

type GenerateServicesPartParamsType = {
  page: PDFPage;
  font: PDFFont;
  fontBold: PDFFont;
  y: number;
  infoForPortifolio: InfoForPortifolioType;
  themeColors: PdfThemeColors;
};

function formatPrice(value: string) {
  const valueNumber = parseFloat(value);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueNumber);
}

export async function generateServicesPart(
  params: GenerateServicesPartParamsType,
) {
  const { page, font, fontBold, infoForPortifolio, themeColors } = params;
  let { y } = params;

  page.drawText(infoForPortifolio.services_section.title, {
    x: 50,
    y,
    size: 18,
    font: fontBold,
    color: themeColors.text,
  });
  y -= 20;

  page.drawText(infoForPortifolio.services_section.description, {
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

  infoForPortifolio.services_section.services?.forEach((service) => {
    page.drawText(service.title, {
      x: 50,
      y,
      size: 14,
      font: fontBold,
      color: themeColors.text,
    });
    y -= 18;

    page.drawText(service.description, {
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

    if (service.starting_price) {
      page.drawText(`Preço inicial: ${formatPrice(service.starting_price)}`, {
        x: 50,
        y,
        size: 12,
        font,
        color: themeColors.primary,
        opacity: 0.7,
      });
      y -= 25;
    }
  });

  // separa a próxima sessão
  y -= 10;

  return { y };
}
