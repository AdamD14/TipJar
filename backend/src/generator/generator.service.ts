import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeneratorService {
  private readonly logger = new Logger(GeneratorService.name);
  private readonly geminiApiKey: string;

  constructor(private configService: ConfigService) {
    this.geminiApiKey = this.configService.get<string>('GEMINI_API_KEY', '');
  }

  async generateHashtags(
    topic: string,
    platform: string,
    generator = 'gemini',
  ): Promise<string[]> {
    if (generator !== 'gemini') {
      this.logger.warn(
        `Unknown generator ${generator}, falling back to gemini`,
      );
    }
    if (!this.geminiApiKey) {
      this.logger.error('GEMINI_API_KEY not configured');
      throw new InternalServerErrorException('Generator not available');
    }
    const prompt = `Podaj 5 hasztagów na platformę ${platform} dotyczących tematu: ${topic}. Zwróć je w jednym wierszu, oddzielone przecinkami.`;
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        },
      );
      if (!response.ok) {
        this.logger.error(
          `Gemini API error: ${response.status} ${response.statusText}`,
        );
        throw new InternalServerErrorException('Generator API error');
      }
      const data = await response.json();
      const text: string | undefined =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        this.logger.error('Invalid response from Gemini API');
        throw new InternalServerErrorException(
          'Generator API invalid response',
        );
      }
      return text
        .split(/[,\n]/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0);
    } catch (err) {
      this.logger.error(`Error calling Gemini API: ${(err as Error).message}`);
      throw new InternalServerErrorException('Generator API request failed');
    }
  }
}
