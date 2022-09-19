import { Injectable } from '@nestjs/common';
import { Vault, VaultModel } from '../entities/Vault';
import { v4 } from 'uuid';
import { ConditionInitializer } from 'dynamoose/dist/Condition';
import { SerializerOptions } from 'dynamoose/dist/Serializer';

@Injectable()
export class VaultRepository {
  async insert(
    data: Partial<Vault>,
    serialize?: SerializerOptions,
  ): Promise<Partial<Vault>> {
    const vault = await VaultModel.create({
      Id: v4(),
      Secret: data.Secret,
      UserId: data.UserId,
      CreationDate: new Date(),
      UpdateDate: new Date(),
    });

    return vault.serialize(serialize);
  }

  async get(
    id: string,
    serialize?: SerializerOptions,
  ): Promise<Partial<Vault> | null> {
    return await VaultModel.query({ Id: { eq: id } })
      .exec()
      .then((vaults) => {
        if (vaults.length > 1) return null;

        return vaults[0].serialize(serialize);
      });
  }

  async scan(
    options: ConditionInitializer,
    serialize?: SerializerOptions,
  ): Promise<Partial<Vault[]>> {
    const vaults: Partial<Vault[]> = [];

    return await VaultModel.scan(options)
      .all()
      .exec()
      .then((response) => {
        response?.forEach((vault) => {
          vaults.push(vault.serialize(serialize) as Vault);
        });

        return vaults;
      });
  }
}
