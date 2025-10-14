import puppeteer from 'puppeteer';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function generateGuidePdf(): Promise<string> {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    });

    const page = await browser.newPage();
    
    // Load the guide page
    const guideUrl = `${process.env.NEXTAUTH_URL}/ghid`;
    await page.goto(guideUrl, { waitUntil: 'networkidle0' });
    
    // Close email gate modal if present (simulate unlock for PDF generation)
    await page.evaluate(() => {
      const modal = document.querySelector('[data-email-gate]');
      if (modal) {
        (modal as HTMLElement).style.display = 'none';
      }
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm',
      },
      printBackground: true,
    });

    await browser.close();

    // Save to public directory
    const uploadDir = process.env.UPLOAD_DIR || '/app/uploads';
    const guideDir = path.join(uploadDir, 'guides');

    if (!existsSync(guideDir)) {
      await mkdir(guideDir, { recursive: true });
    }

    const filename = 'ghid-buget-marketing-startup-nation.pdf';
    const filepath = path.join(guideDir, filename);

    await writeFile(filepath, pdfBuffer);

    return filepath;
  } catch (error) {
    console.error('Guide PDF generation error:', error);
    throw new Error('Failed to generate guide PDF');
  }
}

export function getGuidePdfPath(): string {
  const uploadDir = process.env.UPLOAD_DIR || '/app/uploads';
  return path.join(uploadDir, 'guides', 'ghid-buget-marketing-startup-nation.pdf');
}

