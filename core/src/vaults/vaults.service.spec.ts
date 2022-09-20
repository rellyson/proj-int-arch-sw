import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 } from 'uuid';
import { CryptoService } from '../shared/services/crypto.service';
import { VaultItemRepository } from './repositories/vault-item.repo';
import { VaultRepository } from './repositories/vault.repo';
import { VaultsService } from './vaults.service';

describe('VaultsService', () => {
  let service: VaultsService;
  let vaultRepo: VaultRepository;
  let vaultItemRepo: VaultItemRepository;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VaultsService,
        {
          provide: VaultRepository,
          useValue: {
            insert: jest.fn(),
            scan: jest.fn(),
            get: jest.fn(),
          },
        },
        {
          provide: VaultItemRepository,
          useValue: {
            insert: jest.fn(),
            remove: jest.fn(),
            scan: jest.fn(),
          },
        },
        {
          provide: CryptoService,
          useValue: {
            generateSecret: jest.fn(),
            encrypt: jest.fn(),
            decrypt: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VaultsService>(VaultsService);
    vaultRepo = module.get<VaultRepository>(VaultRepository);
    vaultItemRepo = module.get<VaultItemRepository>(VaultItemRepository);
    cryptoService = module.get<CryptoService>(CryptoService);
  });

  describe('When calling the getUserVault method', () => {
    it('should return a vault', async () => {
      const repoInsertResult = {
        Id: v4(),
        UserId: '1',
      };

      jest
        .spyOn(vaultRepo, 'scan')
        .mockImplementation(() => Promise.resolve([repoInsertResult as any]));

      const vault = await service.getUserVault('1');
      expect(vault).toStrictEqual([repoInsertResult]);
    });

    it('should throw an error if no vault was found', async () => {
      jest
        .spyOn(vaultRepo, 'scan')
        .mockImplementation(() => Promise.resolve([]));

      await service.getUserVault('1').catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
      });
    });
  });

  describe('When calling the createVaultItem method', () => {
    it('should create a vault item', async () => {
      jest
        .spyOn(vaultRepo, 'get')
        .mockImplementation(() =>
          Promise.resolve({ Id: v4(), Secret: 'a very powerful secret' }),
        );

      jest
        .spyOn(cryptoService, 'encrypt')
        .mockImplementation(() =>
          Promise.resolve({ hash: 'hash', encryptedValue: 'value' }),
        );

      const repoInsertResult = {
        Id: v4(),
        VaultId: '1',
      };

      jest
        .spyOn(vaultItemRepo, 'insert')
        .mockImplementation(() => Promise.resolve(repoInsertResult));

      const vault = await service.createVaultItem({
        name: 'name',
        usernameOrEmail: 'test@tst.com',
        password: '123',
        vaultId: '1',
      });

      expect(vault).toStrictEqual(repoInsertResult);
    });

    it('should return an error if vault is invalid', async () => {
      jest
        .spyOn(vaultRepo, 'get')
        .mockImplementation(() => Promise.resolve(null));

      await service
        .createVaultItem({
          name: 'name',
          usernameOrEmail: 'test@tst.com',
          password: '123',
          vaultId: '1',
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(BadRequestException);
        });
    });
  });

  describe('When calling the getVaultItems method', () => {
    it('should return a list of decrypted items', async () => {
      const fakeVaultItem = {
        Id: v4(),
        Name: 'test',
        UsernameOrEmail: 'decrypted value',
        Password: 'decrypted value',
        Hash: 'frufyrsipufgyhouiy3',
        Link: 'https://pudim.com.br',
        CreationDate: new Date(),
        UpdateDate: new Date(),
      };

      jest
        .spyOn(vaultItemRepo, 'scan')
        .mockImplementation(() => Promise.resolve([fakeVaultItem as any]));

      jest
        .spyOn(vaultRepo, 'get')
        .mockImplementation(() =>
          Promise.resolve({ Id: v4(), Secret: 'shiadfasfhuio' }),
        );

      jest
        .spyOn(cryptoService, 'decrypt')
        .mockImplementation(() => Promise.resolve('decrypted value'));

      const vaultItems = await service.getVaultItems('1');

      const { Hash, ...items } = fakeVaultItem;
      expect(vaultItems).toHaveLength(1);
      expect(vaultItems[0]).toStrictEqual(items);
    });

    it('should return an empty array if no items where found', async () => {
      jest
        .spyOn(vaultItemRepo, 'scan')
        .mockImplementation(() => Promise.resolve([]));

      const vaultItems = await service.getVaultItems('1');
      expect(vaultItems).toHaveLength(0);
    });
  });

  describe('When calling the deleteVaultItem method', () => {
    it('should delete a vault', async () => {
      jest
        .spyOn(vaultItemRepo, 'remove')
        .mockImplementation(() => Promise.resolve({} as any));

      await service.deleteVaultItem(v4()).then((response) => {
        expect(response).toBeDefined();
      });
    });
  });
});
