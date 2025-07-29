import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FanService } from './fan.service';

/**
 * The FanController exposes endpoints allowing a signed–in fan to
 * retrieve information about their managed wallet and past tipping
 * activity.  All routes are protected by the JwtAuthGuard, so an
 * authenticated user is required.  The controller delegates the
 * heavy lifting to the FanService.
 */
@UseGuards(JwtAuthGuard)
@Controller('api/v1/fan')
export class FanController {
  constructor(private readonly fanService: FanService) {}

  /**
   * Returns the available USDC balance for the current user.  If the
   * user's account has not yet been provisioned with a Circle wallet
   * the service will throw.  The response simply wraps the numeric
   * balance returned from Circle into an object for consistency.
   */
  @Get('wallet/balance')
  async getWalletBalance(@Request() req) {
    const userId: string = req.user?.id;
    const balance = await this.fanService.getWalletBalance(userId);
    return { balance };
  }

  /**
   * Returns a list of all tips the current user has sent to creators.
   * Tips are ordered with the most recent first.
   */
  @Get('tips/history')
  async getTipsHistory(@Request() req) {
    const userId: string = req.user?.id;
    return this.fanService.getTipsHistory(userId);
  }
}
