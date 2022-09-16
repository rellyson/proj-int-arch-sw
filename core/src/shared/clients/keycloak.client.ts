import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class KeycloakClient {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getTokenInfo(token: string): Observable<any> {
    const keycloakUrl = this.configService.get<string>('KEYCLOAK_URL')!;
    return this.httpService.get('/protocol/openid-connect/userinfo?', {
      baseURL: keycloakUrl,
      headers: {
        Authorization: token,
      },
    });
  }
}
