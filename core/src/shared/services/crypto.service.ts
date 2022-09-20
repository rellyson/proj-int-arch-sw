import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CryptoService {
  constructor(private configService: ConfigService) {}

  generateSecret(length: number): string {
    let secret = '';
    const availableChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!&#+=-';

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

  async encrypt(
    iv: Buffer,
    value: string,
    secret: string,
  ): Promise<{ hash: string; encryptedValue: string }> {
    const encryptionAlgorithm = this.configService.get<string>(
      'ENCRYPTION_ALGORITHM',
    )!;
    const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;
    const cipher = createCipheriv(encryptionAlgorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);

    return {
      hash: iv.toString('hex'),
      encryptedValue: encrypted.toString('hex'),
    };
  }

  async decrypt(value: string, hash: string, secret: string): Promise<string> {
    const encryptionAlgorithm = this.configService.get<string>(
      'ENCRYPTION_ALGORITHM',
    )!;
    const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv(
      encryptionAlgorithm,
      key,
      Buffer.from(hash, 'hex'),
    );
    const decryptedValue = Buffer.concat([
      decipher.update(Buffer.from(value, 'hex')),
      decipher.final(),
    ]);

    return decryptedValue.toString();
  }
}
