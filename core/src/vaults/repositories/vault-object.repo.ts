import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { ConditionInitializer } from 'dynamoose/dist/Condition';
import { VaultObject, VaultObjectModel } from '../entities/VaultObject';
import { VaultObjectDTO } from '../dtos/vault-object.dto';

@Injectable()
export class VaultObjectRepository {
  async insert(data: VaultObjectDTO): Promise<Partial<VaultObject>> {
    const vaultObject = await VaultObjectModel.create({
      id: v4(),
      key: data.key,
      content: data.content,
      vaultId: data.vaultId,
      hash: data.hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return vaultObject.serialize({ exclude: ['vaultId'] });
  }

  async get(id: string): Promise<Partial<VaultObject> | null> {
    const vaultObject = await VaultObjectModel.get(id);
    if (!vaultObject) return null;

    return vaultObject.serialize({ exclude: ['vaultId'] });
  }

  async query(options: ConditionInitializer): Promise<Partial<VaultObject[]>> {
    const vaultObjects: Partial<VaultObject[]> = [];

    return VaultObjectModel.query(options)
      .exec()
      .then((response) => {
        response?.forEach((vault) => {
          vaultObjects.push(
            vault.serialize({ exclude: ['secret'] }) as VaultObject,
          );
        });
        return vaultObjects;
      })

      .catch((err) => {
        throw err;
      });
  }
}
