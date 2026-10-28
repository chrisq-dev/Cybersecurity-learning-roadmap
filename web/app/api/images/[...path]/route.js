import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const ROOT_DIR = fs.realpathSync(path.resolve(/*turbopackIgnore: true*/ process.cwd(), '..'));
const MIME_TYPES = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const imagePathArray = resolvedParams.path || [];

  if (imagePathArray.some((segment) => segment === '..' || segment === '.')) {
    return new NextResponse('Invalid Path', { status: 400 });
  }

  const absolutePath = path.resolve(ROOT_DIR, ...imagePathArray);
  const relativePath = path.relative(ROOT_DIR, absolutePath);

  if (!relativePath || relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return new NextResponse('Invalid Path', { status: 400 });
  }

  let realPath;
  try {
    realPath = fs.realpathSync(absolutePath);
  } catch {
    return new NextResponse('Image Not Found', { status: 404 });
  }

  const realRelativePath = path.relative(ROOT_DIR, realPath);
  if (!realRelativePath || realRelativePath.startsWith('..') || path.isAbsolute(realRelativePath)) {
    return new NextResponse('Invalid Path', { status: 400 });
  }

  const ext = path.extname(realPath).toLowerCase();
  const mimeType = MIME_TYPES[ext];

  if (!mimeType) {
    return new NextResponse('Unsupported Media Type', { status: 415 });
  }

  try {
    const stats = fs.statSync(realPath);
    if (!stats.isFile()) {
      return new NextResponse('Image Not Found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(realPath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
