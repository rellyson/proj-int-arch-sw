import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { User } from 'src/shared/decorators/user.decorator';
import { IdentityGuard } from 'src/shared/guards/identity.guard';
import { VaultsService } from './vaults.service';

@Controller('vaults')
@UseGuards(IdentityGuard)
export class VaultsController {
  constructor(private vaultService: VaultsService) {}

  @Post()
  async createVault(@User() user: { sub: string }) {
    return await this.vaultService.createVault({ userId: user.sub });
  }

  @Get()
  async getUserVault(@User() user: { sub: string }) {
    return await this.vaultService.getUserVault(user.sub);
  }

  @Post('/:id/objects')
  async createVaultObject(
    @Param('id') vaultId: string,
    @Body() body: { key: string; content: string },
  ) {
    return await this.vaultService.createVaultObject({
      vaultId,
      key: body.key,
      content: body.content,
    });
  }

  @Get('/:id/objects')
  async getVaultObjects(@Param('id') vaultId: string) {
    return await this.vaultService.getVaultObjects(vaultId);
  }
}
