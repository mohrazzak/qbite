import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthRequest } from 'src/shared';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest<IAuthRequest>();
    return +request.user?.id;
  },
);
