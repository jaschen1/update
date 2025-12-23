
import type { VercelRequest, VercelResponse } from '@vercel/node';
import OSS from 'ali-oss';
import { Buffer } from 'buffer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customId, photoUrls } = req.body;

  if (!customId || !/^[a-zA-Z0-9-_]+$/.test(customId)) {
    return res.status(400).json({ error: 'Invalid ID. Use alphanumeric characters, dashes, or underscores.' });
  }

  if (!photoUrls || !Array.isArray(photoUrls)) {
    return res.status(400).json({ error: 'Invalid photo configuration.' });
  }

  try {
    const client = new OSS({
      region: process.env.ALIYUN_REGION,
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
      bucket: process.env.ALIYUN_BUCKET,
      secure: true,
    });

    const fileName = `gifts/${customId}.json`;

    // 1. Check if file exists (Safety Logic)
    try {
      await client.head(fileName);
      // If head succeeds, the file exists. Return Conflict.
      return res.status(409).json({ error: 'This Gift ID is already taken. Please choose another.' });
    } catch (error: any) {
      // If error is 404 (NoSuchKey), we are good to proceed.
      if (error.code !== 'NoSuchKey' && error.status !== 404) {
        throw error; // Rethrow real errors
      }
    }

    // 2. Save the file
    const data = JSON.stringify({ photoUrls, createdAt: new Date().toISOString() });
    await client.put(fileName, Buffer.from(data));

    return res.status(200).json({ success: true, id: customId });
  } catch (error: any) {
    console.error('OSS Error:', error);
    return res.status(500).json({ error: 'Failed to save gift.', details: error.message });
  }
}