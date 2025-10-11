import puppeteer from 'puppeteer';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { contractTemplate } from './templates/startup-nation';

interface ContractData {
  clientId: string;
  clientName: string;
  clientCIF: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  packageName: string;
  packagePrice: number;
  contractNumber: string;
  contractDate: string;
  legalRepName: string;
  legalRepRole: string;
}

export async function generateContract(data: ContractData): Promise<string> {
  try {
    // Generate HTML from template
    const html = contractTemplate(data);

    // Setup Puppeteer
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
    await page.setContent(html, { waitUntil: 'networkidle0' });

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

    // Save to volume
    const uploadDir = process.env.UPLOAD_DIR || '/app/uploads';
    const contractDir = path.join(uploadDir, 'contracts', data.clientId);

    // Create directory if it doesn't exist
    if (!existsSync(contractDir)) {
      await mkdir(contractDir, { recursive: true });
    }

    // Generate filename
    const filename = `contract-${data.contractNumber}-${Date.now()}.pdf`;
    const filepath = path.join(contractDir, filename);

    // Save PDF
    await writeFile(filepath, pdfBuffer);

    return filepath;
  } catch (error) {
    console.error('Contract generation error:', error);
    throw new Error('Failed to generate contract');
  }
}

export function getContractPath(clientId: string, filename: string): string {
  const uploadDir = process.env.UPLOAD_DIR || '/app/uploads';
  return path.join(uploadDir, 'contracts', clientId, filename);
}

