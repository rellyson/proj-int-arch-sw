import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { KeycloakClient } from '../clients/keycloak.client';

@Injectable()
export class IdentityGuard implements CanActivate {
  constructor(private KeycloakClient: KeycloakClient) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers['authorization'];

    if (!authToken) {
      return false;
    }

    const subscription = this.KeycloakClient.getTokenInfo(authToken);

    return firstValueFrom(subscription)
      .then((res) => {
        request.user = res.data;
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
