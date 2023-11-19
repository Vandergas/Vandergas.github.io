import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../user.entity';

export const getUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
