import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { CryptoService } from 'src/shared/services/crypto.service';
import { VaultObjectDTO } from './dtos/vault-object.dto';
import { VaultDTO } from './dtos/vault.dto';
import { VaultModel } from './entities/Vault';
import { VaultObjectRepository } from './repositories/vault-object.repo';
import { VaultRepository } from './repositories/vault.repo';

@Injectable()
export class VaultsService {
  constructor(
    private vaultRepo: VaultRepository,
    private vaultObjectRepo: VaultObjectRepository,
    private cryptoService: CryptoService,
  ) {}

  async createVault(data: VaultDTO) {
    const secret = this.cryptoService.generateSecret(32);
    return await this.vaultRepo.insert({ userId: data.userId, secret });
  }

  async getUserVault(userId: string) {
    const vault = await this.vaultRepo.query({ userId: { eq: userId } });

    if (vault.length < 1) {
      throw new NotFoundException('user has no registered vault');
    }

    return vault;
  }

  async createVaultObject(data: VaultObjectDTO) {
    const vault = await VaultModel.get(data.vaultId);

    if (!vault) {
      throw new BadRequestException('the provided vaultId is not valid');
    }
    const iv = randomBytes(16);

    const key = await this.cryptoService.encrypt(iv, data.key, vault.secret);

    const content = await this.cryptoService.encrypt(
      iv,
      data.content,
      vault.secret,
    );

    const vaultObject: VaultObjectDTO = {
      key: key.encryptedValue,
      content: content.encryptedValue,
      vaultId: vault.id,
      hash: iv.toString('hex'),
    };

    return await this.vaultObjectRepo.insert(vaultObject);
  }

  async getVaultObjects(vaultId: string) {
    const decryptedObjects: any[] = [];

    await this.vaultObjectRepo
      .query({
        id: { eq: vaultId },
      })
      .then(async (vaultObjects) => {
        if (vaultObjects.length < 1) {
          throw new NotFoundException('user has no registered object');
        }

        for await (const vaultObject of vaultObjects) {
          const vault = await this.vaultRepo.get(vaultObject!.vaultId);

          const decryptedObject = {
            id: vaultObject?.id,
            key: await this.cryptoService.decrypt(
              vaultObject?.key!,
              vaultObject?.hash!,
              vault?.secret!,
            ),
            content: await this.cryptoService.decrypt(
              vaultObject?.content!,
              vaultObject?.hash!,
              vault?.secret!,
            ),
            vaultId: vaultObject?.vaultId,
            createdAt: vaultObject?.createdAt,
            updatedAt: vaultObject?.updatedAt,
          };

          decryptedObjects.push(decryptedObject);
        }
      });

    return decryptedObjects;
  }
}
