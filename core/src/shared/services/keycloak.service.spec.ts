import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakService } from './keycloak.service';

describe('KeycloakService', () => {
  let service: KeycloakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeycloakService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation(() => {
              return 'mocked value';
            }),
          },
        },
      ],
    }).compile();

    service = module.get<KeycloakService>(KeycloakService);
  });

  describe('When calling the createKeycloakConnectOptions method', () => {
    it('should create a configured keycloak instance', () => {
      const keycloakConfig = service.createKeycloakConnectOptions();

      expect(keycloakConfig).toBeDefined();
    });
  });
});
