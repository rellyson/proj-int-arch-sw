import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CryptoService } from '../../shared/services/crypto.service';
import { VaultRepository } from '../repositories/vault.repo';

@Injectable()
export class VaultInterceptor implements NestInterceptor {
  private logger = new Logger('VaultInterceptorLogger');

  constructor(
    private vaultRepo: VaultRepository,
    private cryptoService: CryptoService,
  ) {}

  async intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = ctx.switchToHttp().getRequest();

    let userVault = await this.vaultRepo
      .scan({
        UserId: { eq: request.user.sub },
      })
      .then(async (vault) => {
        if (vault.length < 1) {
          this.logger.log(`Creating new vault for user ${request.user.sub}`);
          const secret = this.cryptoService.generateSecret(128);

          return await this.vaultRepo.insert(
            { UserId: request.user.sub, Secret: secret },
            { exclude: ['Secret'] },
          );
        }

        return vault[0];
      });

    request.vault = userVault;

    return next.handle();
  }
}
