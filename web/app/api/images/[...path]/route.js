import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const ROOT_DIR = path.resolve(/*turbopackIgnore: true*/ process.cwd(), '..');
const MIME_TYPES = {
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const imagePathArray = resolvedParams.path || [];
  
  // Security: Prevent directory traversal attacks
  if (imagePathArray.some(segment => segment === '..' || segment === '.')) {
    return new NextResponse('Invalid Path', { status: 400 });
  }

  const absolutePath = path.resolve(ROOT_DIR, ...imagePathArray);
  const relativePath = path.relative(ROOT_DIR, absolutePath);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return new NextResponse('Invalid Path', { status: 400 });
  }

  const ext = path.extname(absolutePath).toLowerCase();
  const mimeType = MIME_TYPES[ext];

  if (!mimeType) {
    return new NextResponse('Unsupported Media Type', { status: 415 });
  }

  if (!fs.existsSync(absolutePath)) {
    return new NextResponse('Image Not Found', { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(absolutePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
