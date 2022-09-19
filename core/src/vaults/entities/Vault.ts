import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export class Vault extends Item {
  Id: string;
  Secret: string;
  UserId: string;
  CreationDate: Date;
  UpdateDate: Date;
  DeletionDate: Date | null;
}

export const VaultModel = dynamoose.model<Vault>('Vault', {
  Id: String,
  Secret: String,
  UserId: String,
  CreationDate: Date,
  UpdateDate: Date,
  DeletionDate: Date || null,
});
