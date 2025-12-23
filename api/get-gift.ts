
import type { VercelRequest, VercelResponse } from '@vercel/node';
import OSS from 'ali-oss';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing ID' });
  }

  try {
    const client = new OSS({
      region: process.env.ALIYUN_REGION,
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
      bucket: process.env.ALIYUN_BUCKET,
      secure: true,
    });

    const fileName = `gifts/${id}.json`;
    const result = await client.get(fileName);
    
    // Parse the buffer content
    const content = JSON.parse(result.content.toString());

    // Cache for 1 hour
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(content);
  } catch (error: any) {
    console.error('OSS Fetch Error:', error);
    if (error.code === 'NoSuchKey' || error.status === 404) {
        return res.status(404).json({ error: 'Gift not found' });
    }
    return res.status(500).json({ error: 'Failed to fetch gift' });
  }
}
