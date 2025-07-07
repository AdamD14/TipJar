import { Test, TestingModule } from '@nestjs/testing';
import { TipsService } from './tips.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CircleService } from '../circle/circle.service';
import { ConfigService } from '@nestjs/config';

jest.mock('@prisma/client', () => ({
  TipStatus: { PENDING: 'PENDING', COMPLETED: 'COMPLETED', FAILED: 'FAILED' },
  UserRole: { CREATOR: 'CREATOR', FAN: 'FAN' },
}));

import { TipStatus, UserRole } from '@prisma/client';
import { InternalServerErrorException } from '@nestjs/common';

describe('TipsService', () => {
  let service: TipsService;
  let prisma: any;
  let usersService: any;
  let circleService: any;
  let config: any;

  beforeEach(async () => {
    prisma = {
      tip: {
        create: jest.fn(),
        update: jest.fn(),
      },
    };
    usersService = { findOneById: jest.fn() };
    circleService = { initiateInternalTipTransfer: jest.fn() };
    config = {
      get: jest.fn((key: string, def?: any) => {
        if (key === 'DEFAULT_BLOCKCHAIN') return 'MATIC-AMOY';
        if (key === 'USDC_TOKEN_ID') return 'usdc-token';
        return def;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipsService,
        { provide: PrismaService, useValue: prisma },
        { provide: UsersService, useValue: usersService },
        { provide: CircleService, useValue: circleService },
        { provide: ConfigService, useValue: config },
      ],
    }).compile();

    service = module.get<TipsService>(TipsService);
  });

  it('processes USDC tip from fan', async () => {
    usersService.findOneById.mockImplementation((id: string) => {
      if (id === 'creator')
        return { id, circleWalletId: 'cwC', role: UserRole.CREATOR };
      return { id, circleWalletId: 'cwF', role: UserRole.FAN };
    });
    prisma.tip.create.mockResolvedValue({ id: '1' });
    prisma.tip.update.mockResolvedValue({ id: '1', status: TipStatus.COMPLETED });
    circleService.initiateInternalTipTransfer.mockResolvedValue({
      circleTransactionId: 'tx',
      status: 'complete',
      txHash: '0x1',
    });

    const result = await service.processNewTip({
      amount: '10',
      creatorId: 'creator',
      fanId: 'fan',
    });

    expect(circleService.initiateInternalTipTransfer).toHaveBeenCalled();
    expect(prisma.tip.update).toHaveBeenLastCalledWith(
      expect.objectContaining({
        where: { id: '1' },
        data: expect.objectContaining({
          status: TipStatus.COMPLETED,
          circleTransferId: 'tx',
        }),
      }),
    );
    expect(result.status).toBe(TipStatus.COMPLETED);
  });

  it('fails when USDC transfer throws', async () => {
    usersService.findOneById.mockImplementation((id: string) => {
      if (id === 'creator')
        return { id, circleWalletId: 'cwC', role: UserRole.CREATOR };
      return { id, circleWalletId: 'cwF', role: UserRole.FAN };
    });
    prisma.tip.create.mockResolvedValue({ id: '2' });
    prisma.tip.update.mockResolvedValue({ id: '2', status: TipStatus.FAILED });
    circleService.initiateInternalTipTransfer.mockRejectedValue(new Error('fail'));

    await expect(
      service.processNewTip({ amount: '5', creatorId: 'creator', fanId: 'fan' }),
    ).rejects.toThrow(InternalServerErrorException);
    expect(prisma.tip.update).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: { status: TipStatus.FAILED },
      }),
    );
  });

  it('processes guest fiat tip', async () => {
    usersService.findOneById.mockResolvedValue({
      id: 'creator',
      circleWalletId: 'cwC',
      role: UserRole.CREATOR,
    });
    prisma.tip.create.mockResolvedValue({ id: '3' });
    prisma.tip.update.mockResolvedValue({ id: '3', status: TipStatus.COMPLETED });

    const result = await service.processNewTip({
      amount: '5',
      creatorId: 'creator',
      fanId: null,
      paymentGatewayToken: 'tok',
    });

    expect(prisma.tip.update).toHaveBeenLastCalledWith(
      expect.objectContaining({
        where: { id: '3' },
        data: expect.objectContaining({
          status: TipStatus.COMPLETED,
          paymentGatewayChargeId: expect.any(String),
        }),
      }),
    );
    expect(result.status).toBe(TipStatus.COMPLETED);
  });

  it('fails guest fiat tip when payment fails', async () => {
    usersService.findOneById.mockResolvedValue({
      id: 'creator',
      circleWalletId: 'cwC',
      role: UserRole.CREATOR,
    });
    prisma.tip.create.mockResolvedValue({ id: '4' });
    prisma.tip.update.mockResolvedValue({ id: '4', status: TipStatus.FAILED });

    await expect(
      service.processNewTip({
        amount: '5',
        creatorId: 'creator',
        fanId: null,
        paymentGatewayToken: 'fail',
      }),
    ).rejects.toThrow(InternalServerErrorException);
    expect(prisma.tip.update).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: { status: TipStatus.FAILED },
      }),
    );
  });
});
