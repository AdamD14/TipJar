export class ReserveSlotDto {
  userId: string;
  slotId: number;
  s3Key: string;
  publicUrl: string;
}

export class ConfirmUploadDto {
  userId: string;
  slotId: number;
}
