import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export class VaultItem extends Item {
  Id: string;
  Name: string;
  UsernameOrEmail: string;
  Password: string;
  VaultId: string;
  Hash: string;
  Link: string;
  CreationDate: Date;
  UpdateDate: Date;
  DeletionDate: Date | null;
}

export const VaultItemModel = dynamoose.model<VaultItem>('VaultItem', {
  Id: String,
  Name: String,
  UsernameOrEmail: String,
  Password: String,
  VaultId: String,
  Hash: String,
  Link: String || null,
  CreationDate: Date,
  UpdateDate: Date,
  DeletionDate: Date || null,
});
