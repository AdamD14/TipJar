import { BadRequestException } from '@nestjs/common';
import { TipsService } from './tips.service';

enum TipStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

enum UserRole {
  FAN = 'FAN',
  CREATOR = 'CREATOR',
  ADMIN = 'ADMIN',
}

describe('TipsService', () => {
  let service: TipsService;
  let prisma: any;
  let circle: any;
  let users: any;
  let config: any;

  beforeEach(() => {
    prisma = {
      tip: {
        create: jest.fn().mockResolvedValue({ id: 'tip1' }),
        update: jest.fn().mockResolvedValue({ id: 'tip1', status: TipStatus.COMPLETED }),
      },
    };
    circle = {
      initiateInternalTipTransfer: jest.fn().mockResolvedValue({ circleTransactionId: 'tx1', status: 'complete', txHash: '0xabc' }),
    };
    users = {
      findOneById: jest.fn(),
    };
    config = {
      get: jest.fn().mockReturnValue('TEST'),
    };
    service = new TipsService(prisma, config, circle, users);
  });

  it('processes USDC tip from fan', async () => {
    users.findOneById.mockImplementation((id: string) => {
      if (id === 'creator') return { id, circleWalletId: 'creatorWallet', role: UserRole.CREATOR };
      return { id, circleWalletId: 'fanWallet', role: UserRole.FAN };
    });

    const tip = await service.processNewTip({ amount: '1.00', creatorId: 'creator', fanId: 'fan' });

    expect(circle.initiateInternalTipTransfer).toHaveBeenCalled();
    expect(prisma.tip.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'tip1' },
      data: expect.objectContaining({ status: TipStatus.COMPLETED, circleTransferId: 'tx1' }),
    }));
    expect(tip.status).toBe(TipStatus.COMPLETED);
  });

  it('throws error when guest token missing', async () => {
    users.findOneById.mockResolvedValue({ id: 'creator', circleWalletId: 'creatorWallet', role: UserRole.CREATOR });

    await expect(service.processNewTip({ amount: '1.00', creatorId: 'creator', fanId: null })).rejects.toBeInstanceOf(BadRequestException);
  });
});
