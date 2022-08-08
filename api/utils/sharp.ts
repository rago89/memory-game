import sharp from 'sharp';

export const compressSharpAvatar = async (
  imagePath: string
): Promise<Buffer> => {
  const imageResized = await sharp(imagePath)
    .resize(200, 200, {
      kernel: sharp.kernel.nearest,
      fit: 'inside',
      background: { r: 255, g: 255, b: 255, alpha: 0.5 },
    })
    .toBuffer();
  return imageResized;
};
