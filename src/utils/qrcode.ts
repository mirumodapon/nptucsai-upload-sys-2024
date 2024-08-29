import { PassThrough } from 'node:stream';
import qrcode from 'qrcode';

export async function generateQrcodeWithStream(
  content: string | qrcode.QRCodeSegment[],
  options: qrcode.QRCodeToFileStreamOptions
) {
  const stream = new PassThrough();
  await qrcode.toFileStream(stream, content, options);

  return stream;
}
