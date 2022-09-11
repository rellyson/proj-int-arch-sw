import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakService implements KeycloakConnectOptionsFactory {
  constructor(private configService: ConfigService) {}

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.configService.get('KEYCLOAK_URL'),
      realm: this.configService.get('KEYCLOAK_REALM'),
      clientId: this.configService.get('KEYCLOAK_CLIENT_ID'),
      secret: this.configService.get('KEYCLOAK_CLIENT_SECRET')!,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
