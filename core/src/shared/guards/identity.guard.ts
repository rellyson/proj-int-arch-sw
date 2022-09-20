import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { KeycloakClient } from '../clients/keycloak.client';

@Injectable()
export class IdentityGuard implements CanActivate {
  private logger = new Logger('IdentityGuardLogger');

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
      .catch((err) => {
        this.logger.warn(`Could not identify requester: ${err.message}`);
        return false;
      });
  }
}
