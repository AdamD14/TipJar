import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,

    return this.circleService.provisionUserWallet(
      user.id,
      user.email,
      user.role,
    );
  }

  @Get('wallet')

    return this.circleService.listAllWallets();
  }
}
