import { Test, TestingModule } from '@nestjs/testing';
import { TipsService } from './tips.service';
import { PrismaService } from '../prisma/prisma.service';
import { CircleService } from '../circle/circle.service';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
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
import { InternalServerErrorException, BadRequestException } from '@nestjs/common';

describe('TipsService', () => {
  let service: TipsService;
  let prisma: any;
  let circleService: any;
  let usersService: any;
  let configService: any;

  beforeEach(async () => {
    prisma = { tip: { create: jest.fn(), update: jest.fn() } };
    circleService = { initiateInternalTipTransfer: jest.fn() };
    usersService = { findOneById: jest.fn() };
    configService = { get: jest.fn(() => 'test') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipsService,
        { provide: PrismaService, useValue: prisma },
        { provide: CircleService, useValue: circleService },
        { provide: UsersService, useValue: usersService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<TipsService>(TipsService);
  });

  it('processes USDC tip from fan', async () => {
    usersService.findOneById
      .mockResolvedValueOnce({ id: 'creator', circleWalletId: 'cWallet', role: UserRole.CREATOR })
      .mockResolvedValueOnce({ id: 'fan', circleWalletId: 'fWallet' });

    prisma.tip.create.mockResolvedValue({ id: 'tip1' });
    prisma.tip.update.mockResolvedValue({ id: 'tip1', status: TipStatus.COMPLETED });
    circleService.initiateInternalTipTransfer.mockResolvedValue({ circleTransactionId: 'tx1', status: 'complete' });

    const result = await service.processNewTip({ amount: '1', creatorId: 'creator', fanId: 'fan' });

    expect(circleService.initiateInternalTipTransfer).toHaveBeenCalled();
    expect(result.status).toBe(TipStatus.COMPLETED);
  });

  it('fails if circle service throws', async () => {
    usersService.findOneById
      .mockResolvedValueOnce({ id: 'creator', circleWalletId: 'cWallet', role: UserRole.CREATOR })
      .mockResolvedValueOnce({ id: 'fan', circleWalletId: 'fWallet' });

    prisma.tip.create.mockResolvedValue({ id: 'tip1' });
    prisma.tip.update.mockResolvedValue({});
    circleService.initiateInternalTipTransfer.mockRejectedValue(new Error('fail'));

    await expect(service.processNewTip({ amount: '1', creatorId: 'creator', fanId: 'fan' })).rejects.toBeInstanceOf(InternalServerErrorException);
    expect(prisma.tip.update).toHaveBeenCalledWith({ where: { id: 'tip1' }, data: { status: TipStatus.FAILED } });
  });

  it('processes guest fiat payment', async () => {
    usersService.findOneById.mockResolvedValue({ id: 'creator', circleWalletId: 'cWallet', role: UserRole.CREATOR });

    prisma.tip.create.mockResolvedValue({ id: 'tip2' });
    prisma.tip.update.mockResolvedValue({ id: 'tip2', status: TipStatus.COMPLETED, paymentGatewayChargeId: 'charge' });

    const result = await service.processNewTip({ amount: '2', creatorId: 'creator', fanId: null, paymentGatewayToken: 'tok' });

    expect(result.status).toBe(TipStatus.COMPLETED);
    expect(result.paymentGatewayChargeId).toBeDefined();
  });

  it('throws when guest token missing', async () => {
    usersService.findOneById.mockResolvedValue({ id: 'creator', circleWalletId: 'cWallet', role: UserRole.CREATOR });
    prisma.tip.create.mockResolvedValue({ id: 'tip3' });
    prisma.tip.update.mockResolvedValue({});

    await expect(service.processNewTip({ amount: '2', creatorId: 'creator', fanId: null })).rejects.toBeInstanceOf(BadRequestException);
  });
});
