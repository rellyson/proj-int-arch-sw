import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export class VaultObject extends Item {
  id: number;
  key: string;
  content: string;
  vaultId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export const VaultObjectModel = dynamoose.model<VaultObject>('VaultObject', {
  id: Number,
  key: String,
  content: String,
  vaultId: String,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date || null,
});
