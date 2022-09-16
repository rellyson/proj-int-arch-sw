import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

export class Vault extends Item {
  id: string;
  secret: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export const VaultModel = dynamoose.model<Vault>('Vault', {
  id: String,
  secret: String,
  userId: String,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date || null,
});
