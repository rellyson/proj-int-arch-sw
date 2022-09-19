import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { VaultRepository } from '../repositories/vault.repo';

@Injectable()
export class VaultInterceptor implements NestInterceptor {
  constructor(private vaultRepo: VaultRepository) {}

  async intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = ctx.switchToHttp().getRequest();

    const userVault = await this.vaultRepo.scan({
      UserId: { eq: request.user.sub },
    })

    request.vault = userVault[0];

    return next.handle();
  }
}
