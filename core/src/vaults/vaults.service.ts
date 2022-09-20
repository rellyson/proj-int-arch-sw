import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { CryptoService } from '../shared/services/crypto.service';
import { VaultItemDTO } from './dtos/vault-item.dto';
import { VaultDTO } from './dtos/vault.dto';
import { VaultModel } from './entities/Vault';
import { VaultItem } from './entities/VaultItem';
import { VaultItemRepository } from './repositories/vault-item.repo';
import { VaultRepository } from './repositories/vault.repo';

@Injectable()
export class VaultsService {
  constructor(
    private vaultRepo: VaultRepository,
    private vaultItemRepo: VaultItemRepository,
    private cryptoService: CryptoService,
  ) {}

  async createVault(data: VaultDTO) {
    const secret = this.cryptoService.generateSecret(128);

    return await this.vaultRepo.insert(
      { UserId: data.userId, Secret: secret },
      { exclude: ['Secret'] },
    );
  }

  async getUserVault(userId: string) {
    const vault = await this.vaultRepo.scan(
      { UserId: { eq: userId } },
      { exclude: ['Secret'] },
    );

    if (vault.length < 1) {
      throw new NotFoundException('user has no vault registered');
    }

    return vault;
  }

  async createVaultItem(data: VaultItemDTO) {
    const vault = await this.vaultRepo.get(data.vaultId);

    if (!vault) {
      throw new BadRequestException('the provided vaultId is not valid');
    }

    const iv = randomBytes(16);
    const usernameOrEmail = await this.cryptoService.encrypt(
      iv,
      data.usernameOrEmail,
      vault.Secret!,
    );

    const password = await this.cryptoService.encrypt(
      iv,
      data.password,
      vault.Secret!,
    );

    const vaultItem: Partial<VaultItem> = {
      Name: data.name,
      UsernameOrEmail: usernameOrEmail.encryptedValue,
      Password: password.encryptedValue,
      VaultId: vault.Id,
      Hash: iv.toString('hex'),
      Link: data.link,
    };

    return await this.vaultItemRepo.insert(vaultItem, { exclude: ['Hash'] });
  }

  async getVaultItems(vaultId: string) {
    const decryptedItems: Partial<VaultItem>[] = [];

    await this.vaultItemRepo
      .scan({
        VaultId: { eq: vaultId },
      })
      .then(async (vaultItems) => {
        if (vaultItems.length < 1) {
          throw new NotFoundException('vault has no registered item');
        }

        for await (const vaultItem of vaultItems) {
          const vault = await this.vaultRepo.get(vaultItem!.VaultId);

          const decryptedItem = {
            Id: vaultItem?.Id!,
            Name: vaultItem?.Name!,
            UsernameOrEmail: await this.cryptoService.decrypt(
              vaultItem?.UsernameOrEmail!,
              vaultItem?.Hash!,
              vault?.Secret!,
            ),
            Password: await this.cryptoService.decrypt(
              vaultItem?.Password!,
              vaultItem?.Hash!,
              vault?.Secret!,
            ),
            Link: vaultItem?.Link!,
            CreationDate: vaultItem?.CreationDate!,
            UpdateDate: vaultItem?.UpdateDate!,
          };

          decryptedItems.push(decryptedItem);
        }
      });

    return decryptedItems;
  }

  async updateVaultItem(
    id: string,
    vaultId: string,
    data: Partial<VaultItemDTO>,
  ) {
    const vault = await VaultModel.get(vaultId);

    if (!vault) {
      throw new BadRequestException('the provided vaultId is not valid');
    }

    const itemUpdateFields: Partial<VaultItem> = {};
    const iv = randomBytes(16);

    if (data.name) {
      itemUpdateFields.Name = data.name;
    }

    if (data.usernameOrEmail) {
      const updatedUsernameOrEmail = await this.cryptoService.encrypt(
        iv,
        data.usernameOrEmail!,
        vault.Secret,
      );

      itemUpdateFields.UsernameOrEmail = updatedUsernameOrEmail.encryptedValue;
    }

    if (data.password) {
      const updatedPassword = await this.cryptoService.encrypt(
        iv,
        data.password!,
        vault.Secret,
      );

      itemUpdateFields.Password = updatedPassword.encryptedValue;
    }

    return await this.vaultItemRepo
      .update(id, itemUpdateFields, {
        exclude: ['Hash', 'VaultId'],
      })
      .then((vaultItem: VaultItem) => {
        return {
          ...vaultItem,
          usernameOrEmail: data.usernameOrEmail,
          password: data.password,
        };
      });
  }

  async deleteVaultItem(id: string) {
    return await this.vaultItemRepo.remove(id);
  }
}
