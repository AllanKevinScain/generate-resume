import { PDFDocument, PDFPage } from "pdf-lib";
import type { PdfThemeColors } from "../styles/select-colors-by-theme";

type GenerateAvatarPartParamsType = {
  page: PDFPage;
  pdfDoc: PDFDocument;
  y: number;
  imageUrl?: string;
  themeColors: PdfThemeColors;
};

async function createCircularAvatar(
  url: string,
  size: number = 256,
): Promise<Blob> {
  const img = await fetch(url).then((r) => r.blob());
  const bitmap = await createImageBitmap(img);

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Não foi possível obter o contexto do canvas");
  }

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(bitmap, 0, 0, size, size);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (!result) {
        reject(new Error("Falha ao criar Blob do canvas"));
        return;
      }
      resolve(result);
    }, "image/png");
  });

  return blob;
}

export async function generateAvatarPart(params: GenerateAvatarPartParamsType) {
  const { page, pdfDoc, y, imageUrl, themeColors } = params;

  if (imageUrl) {
    const circularAvatar = await createCircularAvatar(imageUrl);
    const avatarBytes = await circularAvatar.arrayBuffer();

    const avatarImage = await pdfDoc.embedPng(avatarBytes);

    page.drawImage(avatarImage, {
      x: 50,
      y: y - 62,
      width: 80,
      height: 80,
    });

    page.drawCircle({
      x: 90,
      y: y - 22,
      size: 40,
      borderWidth: 2,
      borderColor: themeColors.border,
    });
  }
}
