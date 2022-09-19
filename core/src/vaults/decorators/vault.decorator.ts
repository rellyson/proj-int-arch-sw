import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Vault = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.vault?.[data] : request.vault;
  },
);
