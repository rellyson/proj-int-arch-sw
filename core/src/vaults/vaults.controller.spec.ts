import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from '../shared/services/crypto.service';
import { KeycloakClient } from '../shared/clients/keycloak.client';
import { VaultRepository } from './repositories/vault.repo';
import { VaultsController } from './vaults.controller';
import { VaultsService } from './vaults.service';

describe('VaultsController', () => {
  let controller: VaultsController;
  let service: VaultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaultsController],
      providers: [
        {
          provide: KeycloakClient,
          useValue: {
            getTokenInfo: jest.fn().mockImplementation(() => true),
          },
        },
        {
          provide: VaultRepository,
          useValue: {
            scan: jest.fn(),
            insert: jest.fn(),
          },
        },
        {
          provide: CryptoService,
          useValue: {
            generateSecret: jest.fn(),
          },
        },
        {
          provide: VaultsService,
          useValue: {
            createVault: jest.fn(),
            getUserVault: jest.fn(),
            createVaultItem: jest.fn(),
            getVaultItems: jest.fn(),
            updateVaultItem: jest.fn(),
            deleteVaultItem: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VaultsController>(VaultsController);
    service = module.get<VaultsService>(VaultsService);
  });

  describe('when calling GET /vaults', () => {
    it('should return succesfully', async () => {
      const fakeVault = {
        Id: '1',
        UserId: '1',
      };
      jest
        .spyOn(service, 'getUserVault')
        .mockImplementation(() => Promise.resolve([fakeVault as any]));
      const response = await controller.getUserVault('1');

      expect(response[0]).toStrictEqual(fakeVault);
    });

    it('should return an error if service throws', async () => {
      jest
        .spyOn(service, 'getUserVault')
        .mockImplementation(() => Promise.reject(new Error()));

      await controller.getUserVault('1').catch((err) => {
        expect(err).toBeInstanceOf(Error);
      });
    });
  });

  describe('when calling POST /vaults/item', () => {
    it('should return succesfully', async () => {
      const fakeItemVault = {
        Id: '1',
        VaultId: '1',
        Name: 'test',
      };
      jest
        .spyOn(service, 'createVaultItem')
        .mockImplementation(() => Promise.resolve(fakeItemVault));
      const response = await controller.createVaultItem('1', {});

      expect(response).toStrictEqual(fakeItemVault);
    });

    it('should return an error if service throws', async () => {
      jest
        .spyOn(service, 'createVaultItem')
        .mockImplementation(() => Promise.reject(new Error()));

      await controller.createVaultItem('1', {}).catch((err) => {
        expect(err).toBeInstanceOf(Error);
      });
    });
  });

  describe('when calling GET /vaults/items', () => {
    it('should return succesfully', async () => {
      const fakeItemVault = {
        Id: '1',
        VaultId: '1',
        Name: 'test',
      };
      jest
        .spyOn(service, 'getVaultItems')
        .mockImplementation(() => Promise.resolve([fakeItemVault as any]));
      const response = await controller.getVaultItems('1');

      expect(response[0]).toStrictEqual(fakeItemVault);
    });

    it('should return an error if service throws', async () => {
      jest
        .spyOn(service, 'getVaultItems')
        .mockImplementation(() => Promise.reject(new Error()));

      await controller.getVaultItems('1').catch((err) => {
        expect(err).toBeInstanceOf(Error);
      });
    });
  });

  describe('when calling PATCH /vaults/item/:id', () => {
    it('should return succesfully', async () => {
      const fakeItemVault = {
        Id: '1',
        VaultId: '1',
        Name: 'test',
      };
      jest
        .spyOn(service, 'updateVaultItem')
        .mockImplementation(() => Promise.resolve(fakeItemVault as any));
      const response = await controller.updateVaultItem('1', '1', {});

      expect(response).toStrictEqual(fakeItemVault);
    });

    it('should return an error if service throws', async () => {
      jest
        .spyOn(service, 'updateVaultItem')
        .mockImplementation(() => Promise.reject(new Error()));

      await controller.updateVaultItem('1', '1', {}).catch((err) => {
        expect(err).toBeInstanceOf(Error);
      });
    });
  });

  describe('when calling DELETE /vaults/item/:id', () => {
    it('should return succesfully', async () => {
      const fakeItemVault = {
        Id: '1',
        VaultId: '1',
        Name: 'test',
      };
      jest
        .spyOn(service, 'deleteVaultItem')
        .mockImplementation(() => Promise.resolve(fakeItemVault as any));
      const response = await controller.deleteVaultItem('1');

      expect(response).toStrictEqual(fakeItemVault);
    });

    it('should return an error if service throws', async () => {
      jest
        .spyOn(service, 'deleteVaultItem')
        .mockImplementation(() => Promise.reject(new Error()));

      await controller.deleteVaultItem('1').catch((err) => {
        expect(err).toBeInstanceOf(Error);
      });
    });
  });
});
