import { Test, TestingModule } from '@nestjs/testing';
import { TipsService } from './tips.service';
import { PrismaService } from '../prisma/prisma.service';


describe('TipsService', () => {
  let service: TipsService;
  let prisma: any;


    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipsService,
        { provide: PrismaService, useValue: prisma },

      ],
    }).compile();

    service = module.get<TipsService>(TipsService);
  });

  it('processes USDC tip from fan', async () => {

  });
});
