import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  TransformationOptions,
} from 'cloudinary';

export interface MulterFile {
  buffer: Buffer;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async upload(file: MulterFile): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'tipjar/avatars',
          width: 1200,
          height: 1200,
          crop: 'limit',
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error) return reject(new Error(error.message));
          if (!result) return reject(new Error('Upload failed'));
          resolve(result);
        },
      );

      upload.end(file.buffer);
    });
  }

  async uploadFromS3(
    url: string,
    publicId?: string,
  ): Promise<UploadApiResponse> {
    return cloudinary.uploader.upload(url, {
      folder: 'tipjar/avatars',
      public_id: publicId,
      width: 1200,
      height: 1200,
      crop: 'limit',
      quality: 'auto:good',
      fetch_format: 'auto',
      overwrite: true,
    });
  }

  url(publicId: string, options?: TransformationOptions): string {
    return cloudinary.url(publicId, options);
  }
}
