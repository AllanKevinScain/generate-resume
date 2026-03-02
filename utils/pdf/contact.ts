import { PDFFont, PDFPage } from "pdf-lib";
import type { PdfThemeColors } from "./styles/select-colors-by-theme";
import { drawUnderlinedText } from "./styles";
import type { InfoForPortifolioType } from "@/types";

type GenerateContactPartParamsType = {
  page: PDFPage;
  font: PDFFont;
  fontBold: PDFFont;
  y: number;
  infoForPortifolio: InfoForPortifolioType;
  themeColors: PdfThemeColors;
};

export async function generateContactPart(
  params: GenerateContactPartParamsType,
) {
  const { page, font, fontBold, infoForPortifolio, themeColors } = params;
  let { y } = params;

  page.drawText("Contato", {
    x: 50,
    y,
    size: 18,
    font: fontBold,
    color: themeColors.text,
  });
  y -= 25;

  const contact = infoForPortifolio.footer.contact;

  drawUnderlinedText({
    page,
    x: 50,
    y,
    size: 12,
    font,
    color: themeColors.secondary,
    text: `Email: ${contact.email}`,
  });
  y -= 18;

  drawUnderlinedText({
    page,
    x: 50,
    y,
    size: 12,
    font,
    color: themeColors.secondary,
    text: `Telefone: ${contact.phone}`,
  });
  y -= 25;

  Object.entries(contact.social_media).forEach(([key, value]) => {
    if (value) {
      drawUnderlinedText({
        page,
        x: 50,
        y,
        size: 12,
        font,
        color: themeColors.secondary,
        text: `${key}: ${value}`,
      });
      y -= 18;
    }
  });
}
