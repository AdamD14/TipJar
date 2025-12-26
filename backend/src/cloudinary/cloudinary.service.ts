import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    // Config nadal potrzebny, żeby .url() wiedział jaki masz cloud_name
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  /**
   * Generuje URL dla Cloudinary Fetch.
   * Nie wykonuje żadnego żądania sieciowego w backendzie.
   * Nie zużywa Storage w Cloudinary (tylko cache).
   */
  generateOptimizedUrl(publicStorjUrl: string): string {
    // publicStorjUrl to np: https://link.storjshare.io/s/KLUCZ/bucket/avatar.jpg

    return cloudinary.url(publicStorjUrl, {
      type: 'fetch',
      secure: true,
    });
  }
}
