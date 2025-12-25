import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadsService {
  private s3: S3Client;
  private bucket: string;
  private publicBase: string;

  constructor() {
    const region = process.env.AWS_REGION;
    const bucket = process.env.AWS_S3_BUCKET;
    const publicUrl = process.env.STORJ_PUBLIC_URL_PREFIX;
    const endpoint = process.env.AWS_S3_ENDPOINT;

    if (!region || !bucket || !publicUrl) {
      // Lazy init with defaults; methods will throw if misconfigured
    }
    this.s3 = new S3Client({
      region: region || 'us-east-1',
      endpoint: endpoint,
      forcePathStyle: !!endpoint, // Storj/MinIO often require path style
    });
    this.bucket = bucket || '';
    this.publicBase = publicUrl || '';
  }

  async signPutUrl(opts: { key: string; contentType: string }) {
    if (!this.bucket || !this.publicBase) {
      throw new Error(
        'Uploads not configured: set AWS_REGION, AWS_S3_BUCKET, STORJ_PUBLIC_URL_PREFIX',
      );
    }
    const cmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: opts.key,
      ContentType: opts.contentType,
      ACL: 'public-read',
    });
    const url = await getSignedUrl(this.s3, cmd, { expiresIn: 60 });
    return { url, key: opts.key, publicUrl: `${this.publicBase}/${opts.key}` };
  }
}
