import puppeteer from "puppeteer";

/**
 * Generates a PDF from an HTML template using Puppeteer.
 *
 * @param template - The HTML template string.
 * @returns A promise that resolves with the generated PDF content as a Buffer,
 * or an Error if the PDF generation fails.
 *
 * @remarks
 * This function uses Puppeteer to render an HTML template and generate a PDF.
 * The generated PDF content is returned as a Buffer in case of success.
 * If an error occurs during the PDF generation process, the promise is rejected
 * with an Error containing an error message.
 */
async function generatePdf(template: string): Promise<Buffer | Error> {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setContent(template);

    const pdf = await page.pdf({ format: "A4" });

    await browser.close();

    return pdf as Buffer; // Cast pdf to Buffer
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("PDF generation failed");
  }
}

export default generatePdf;
