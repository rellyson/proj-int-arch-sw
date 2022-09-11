import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CryptoService {
  generateSecret(length: number): string {
    const availableChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!&#+=-';
    let secret = '';

    for (let i = 0; i < length; i++)
      secret += availableChars.charAt(
        Math.floor(Math.random() * availableChars.length),
      );

    return secret;
  }

  async hash(value: string): Promise<{ hash: string; salt: string }> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(value, salt);

    return { hash, salt };
  }

  async compare(hash: string, value: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }

  async encrypt(value: any, secret: string): Promise<string> {
    const iv = Buffer.from(randomBytes(8)).toString('hex');
    const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const bufferedResult = Buffer.concat([
      cipher.update(value),
      cipher.final(),
    ]);

    return bufferedResult.toString();
  }

  async decrypt(value: any, secret: string): Promise<string> {
    const iv = Buffer.from(randomBytes(8)).toString('hex');
    const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);

    const decryptedValue = Buffer.concat([
      decipher.update(value),
      decipher.final(),
    ]);

    return decryptedValue.toString();
  }
}
