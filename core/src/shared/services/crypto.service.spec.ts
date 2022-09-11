import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
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
      const secret = service.generateSecret(32);
      const encryptedValue = await service.encrypt(
        'value to be encrypted',
        secret,
      );

      expect(typeof encryptedValue).toBe('string');
    });
  });

  describe('When calling the decrypt method', () => {
    it('should decrypt a value with the given secret', async () => {
      const secret = service.generateSecret(32);
      const encryptedValue = await service.encrypt(
        'value to be encrypted',
        secret,
      );

      const decryptedValue = await service.decrypt(encryptedValue, secret);

      expect(typeof decryptedValue).toBe('string');
    });
  });
});
