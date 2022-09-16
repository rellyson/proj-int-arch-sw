import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { VaultObjectRepository } from './repositories/vault-object.repo';
import { VaultRepository } from './repositories/vault.repo';
import { VaultsController } from './vaults.controller';
import { VaultsService } from './vaults.service';

@Module({
  imports: [SharedModule],
  controllers: [VaultsController],
  providers: [VaultsService, VaultRepository, VaultObjectRepository],
})
export class VaultsModule {}
