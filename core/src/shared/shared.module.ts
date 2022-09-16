import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KeycloakClient } from './clients/keycloak.client';
import { dynamodbProvider } from './providers/dynamodb.provider';
import { CryptoService } from './services/crypto.service';

@Module({
  imports: [HttpModule],
  providers: [dynamodbProvider, CryptoService, KeycloakClient],
  exports: [dynamodbProvider, CryptoService, KeycloakClient],
})
export class SharedModule {}
