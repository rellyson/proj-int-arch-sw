import { Module } from '@nestjs/common';
import { dynamodbProvider } from './providers/dynamodb.provider';
import { CryptoService } from './services/crypto.service';
import { KeycloakService } from './services/keycloak.service';

@Module({
  providers: [dynamodbProvider, CryptoService, KeycloakService],
  exports: [KeycloakService],
})
export class SharedModule {}
