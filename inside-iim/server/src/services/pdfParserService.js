const fs = require('fs').promises;
const { PDFParse } = require('pdf-parse');

async function extractTextFromPdf(filePath) {
  const buffer = await fs.readFile(filePath);
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    return result.text?.trim() || '';
  } finally {
    await parser.destroy();
  }
}

module.exports = { extractTextFromPdf };
