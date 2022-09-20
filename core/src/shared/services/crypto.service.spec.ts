import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { randomBytes } from 'crypto';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation(() => ''),
          },
        },
      ],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('When calling the generateSecret method', () => {
    it('should generate a secret with the given length', () => {
      const secretLength = 32;
      const secret = service.generateSecret(secretLength);

      expect(secret).toHaveLength(secretLength);
    });
  });

  describe('When calling the hash method', () => {
    it('should generate and return a hash salt pair', async () => {
      const secret = await service.hash('test_123');

      expect(secret).toHaveProperty('hash');
      expect(secret).toHaveProperty('salt');
    });
  });

  describe('When calling the compare method', () => {
    it('should compare too values', async () => {
      const value = 'test123';
      const hashSaltPair = await service.hash(value);
      const isEqual = await service.compare(hashSaltPair.hash, value);

      expect(isEqual).toBe(true);
    });
  });

  describe('When calling the encrypt method', () => {
    it('should encrypt a value with the given secret', async () => {
      jest.spyOn(configService, 'get').mockImplementation(() => 'aes-256-ctr');
      const iv = randomBytes(16);
      const secret = service.generateSecret(32);
      const encryptedValue = await service.encrypt(
        iv,
        'value to be encrypted',
        secret,
      );

      expect(encryptedValue).toHaveProperty('hash');
      expect(encryptedValue).toHaveProperty('encryptedValue');
    });
  });

  describe('When calling the decrypt method', () => {
    it('should decrypt a value with the given secret', async () => {
      jest.spyOn(configService, 'get').mockImplementation(() => 'aes-256-ctr');
      const valueToBeEncrypted = 'value to be encrypted';
      const iv = randomBytes(16);
      const secret = service.generateSecret(32);

      const value = await service.encrypt(iv, valueToBeEncrypted, secret);

      const decryptedValue = await service.decrypt(
        value.encryptedValue,
        value.hash,
        secret,
      );

      expect(decryptedValue).toBe(valueToBeEncrypted);
    });
  });
});
