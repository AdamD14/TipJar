import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadsService {
  private s3: S3Client;
  private bucket: string;
  private publicBase: string;

  constructor() {
    const accessKey = process.env.STORJ_ACCESS_KEY;
    const secretKey = process.env.STORJ_SECRET_KEY;
    const bucket = process.env.STORJ_BUCKET;
    const publicUrl = process.env.STORJ_PUBLIC_URL_PREFIX;
    const endpoint = process.env.STORJ_ENDPOINT;

    // POPRAWKA 1: Fail Fast - aplikacja krzyczy przy starcie
    if (!accessKey || !secretKey || !bucket || !publicUrl || !endpoint) {
      throw new Error('MISSING STORJ CONFIG IN .ENV');
    }

    this.s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      region: 'us-east-1',
      endpoint: endpoint,
      forcePathStyle: true,
    });
    this.bucket = bucket;
    this.publicBase = publicUrl;
  }

  async signPutUrl(opts: { key: string; contentType: string }) {
    const cmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: opts.key,
      ContentType: opts.contentType,
    });

    // POPRAWKA 3: Wydłużenie czasu do 15 minut
    const url = await getSignedUrl(this.s3, cmd, { expiresIn: 900 });

    // POPRAWKA 2: Bezpieczne łączenie URL
    const cleanBase = this.publicBase.replace(/\/$/, '');
    const cleanKey = opts.key.replace(/^\//, '');

    return {
      url,
      key: opts.key,
      publicUrl: `${cleanBase}/${cleanKey}`,
    };
  }
}
