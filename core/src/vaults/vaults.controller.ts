import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  UseInterceptors,
  Delete,
  Patch,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { User } from '../shared/decorators/user.decorator';
import { IdentityGuard } from '../shared/guards/identity.guard';
import { Vault } from './decorators/vault.decorator';
import { VaultItemDTO } from './dtos/vault-item.dto';
import { VaultInterceptor } from './interceptors/vault.interceptor';
import { VaultsService } from './vaults.service';

@Controller('vaults')
@UseGuards(IdentityGuard)
@UseInterceptors(VaultInterceptor)
export class VaultsController {
  constructor(private vaultService: VaultsService) {}

  @Get()
  async getUserVault(@User('sub') userId: string) {
    return await this.vaultService.getUserVault(userId);
  }

  @Post('/item')
  @HttpCode(HttpStatus.CREATED)
  async createVaultItem(
    @Vault('Id') vaultId: string,
    @Body() body: Partial<VaultItemDTO>,
  ) {
    return await this.vaultService.createVaultItem({
      vaultId,
      name: body.name!,
      usernameOrEmail: body.usernameOrEmail!,
      password: body.password!,
      link: body.link!,
    });
  }

  @Get('/items')
  async getVaultItems(@Vault('Id') vaultId: string) {
    return await this.vaultService.getVaultItems(vaultId);
  }

  @Patch('/item/:id')
  async updateVaultItem(
    @Param('id') itemId: string,
    @Vault('id') vaultId: string,
    @Body() body: Partial<VaultItemDTO>,
  ) {
    return await this.vaultService.updateVaultItem(itemId, vaultId, {
      name: body.name!,
      usernameOrEmail: body.usernameOrEmail!,
      password: body.password!,
      link: body.link!,
    });
  }

  @Delete('/item/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVaultItem(@Param('id') itemId: string) {
    return await this.vaultService.deleteVaultItem(itemId);
  }
}
