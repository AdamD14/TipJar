# Emitowanie napiwku (np. w TipsService)

@Injectable()
export class TipsService {
constructor(
private readonly prisma: PrismaService,
private readonly liveFeed: LiveFeedGateway,
) {}

async createTip(dto: CreateTipDto) {
const tip = await this.prisma.tip.create({ data: { ...dto } });

```
// emit to live feed
this.liveFeed.broadcastTip(dto.creatorId, {
  id: tip.id,
  nickname: dto.fanName || 'Guest',
  avatarUrl: dto.fanAvatar,
  amount: dto.amount,
  message: dto.message,
});

return tip;

```

}
}