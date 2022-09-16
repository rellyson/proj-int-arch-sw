import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export class VaultObject extends Item {
  id: string;
  key: string;
  content: string;
  vaultId: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export const VaultObjectModel = dynamoose.model<VaultObject>('VaultObject', {
  id: String,
  key: String,
  content: String,
  vaultId: String,
  hash: String,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date || null,
});
