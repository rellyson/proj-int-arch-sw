import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { VaultInterceptor } from './interceptors/vault.interceptor';
import { VaultItemRepository } from './repositories/vault-item.repo';
import { VaultRepository } from './repositories/vault.repo';
import { VaultsController } from './vaults.controller';
import { VaultsService } from './vaults.service';

@Module({
  imports: [SharedModule],
  controllers: [VaultsController],
  providers: [
    VaultInterceptor,
    VaultsService,
    VaultRepository,
    VaultItemRepository,
  ],
})
export class VaultsModule {}
