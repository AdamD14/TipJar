import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreatorStep1Dto {
  @IsString()
  @IsNotEmpty()
  industry: string;
}

export class CreatorStep2Dto {
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

export class CreatorStep3Dto {
  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  websiteUrl?: string;

  // Socials will be handled via a separate endpoint or added here if simple
  // For now, let's keep it aligned with the plan (Bio input Step 3 page)
  // The SocialConnect component might save incrementally or we pass it here.
  // The plan said "SocialConnect (mock)" originally, now functional.
  // We'll likely save social links here if they are passed as a JSON object or similar.
  // But strictly for this DTO based on the prompt: "bio: string (max 200 chars)"
  // I will add socialLinks as an optional object/array too just in case.
}

export class CreatorStep4Dto {
  @IsString()
  @IsNotEmpty()
  goalLabel: string;

  @IsNumber()
  goalTarget: number;
}
