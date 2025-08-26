
import { Prisma, Tip, TipStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CircleService } from '../circle/circle.service';

  amount: string;
  creatorId: string;
  fanId: string | null;
  message?: string;
  isAnonymous?: boolean;
  paymentGatewayToken?: string;
}

@Injectable()
export class TipsService {

    }
  }
}

