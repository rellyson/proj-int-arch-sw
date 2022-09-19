import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { ConditionInitializer } from 'dynamoose/dist/Condition';
import { VaultItem, VaultItemModel } from '../entities/VaultItem';
import { SerializerOptions } from 'dynamoose/dist/Serializer';

@Injectable()
export class VaultItemRepository {
  async insert(
    data: Partial<VaultItem>,
    serialize?: SerializerOptions,
  ): Promise<Partial<VaultItem>> {
    const vaultItem = await VaultItemModel.create({
      Id: v4(),
      VaultId: data.VaultId,
      Name: data.Name,
      UsernameOrEmail: data.UsernameOrEmail,
      Password: data.Password,
      Hash: data.Hash,
      Link: data.Link,
      CreationDate: new Date(),
      UpdateDate: new Date(),
    });

    return vaultItem.serialize(serialize);
  }

  async get(
    id: string,
    serialize?: SerializerOptions,
  ): Promise<Partial<VaultItem> | null> {
    return await VaultItemModel.query({ Id: { eq: id } })
      .exec()
      .then((items) => {
        if (items.length > 1) return null;

        return items[0].serialize(serialize);
      });
  }

  async scan(
    options: ConditionInitializer,
    serialize?: SerializerOptions,
  ): Promise<Partial<VaultItem[]>> {
    const vaultItems: Partial<VaultItem[]> = [];

    return VaultItemModel.scan(options)
      .exec()
      .then((response) => {
        response?.forEach((vault) => {
          vaultItems.push(vault.serialize(serialize) as VaultItem);
        });
        return vaultItems;
      });
  }

  async update(
    id: string,
    item: Partial<VaultItem>,
    serialize?: SerializerOptions,
  ) {
    const vaultItem = await VaultItemModel.update({ Id: id }, { ...item });

    return vaultItem.serialize(serialize);
  }

  async remove(id: string) {
    return await VaultItemModel.delete(id, { return: 'request' });
  }
}
