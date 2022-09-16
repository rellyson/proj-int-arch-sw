import { Injectable } from '@nestjs/common';
import { Vault, VaultModel } from '../entities/Vault';
import { v4 } from 'uuid';
import { ConditionInitializer } from 'dynamoose/dist/Condition';
import { VaultDTO } from '../dtos/vault.dto';

@Injectable()
export class VaultRepository {
  async insert(data: VaultDTO): Promise<Partial<Vault>> {
    const vault = await VaultModel.create({
      id: v4(),
      secret: data.secret,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return vault.serialize({ exclude: ['secret'] });
  }

  async get(id: string): Promise<Partial<Vault> | null> {
    const vault = await VaultModel.get(id);
    if (!vault) return null;

    return vault;
  }

  async query(options: ConditionInitializer): Promise<Partial<Vault[]>> {
    const vaults: Partial<Vault[]> = [];

    return VaultModel.query(options)
      .exec()
      .then((response) => {
        response?.forEach((vault) => {
          vaults.push(vault.serialize({ exclude: ['secret'] }) as Vault);
        });
        return vaults;
      })

      .catch((err) => {
        throw err;
      });
  }
}
