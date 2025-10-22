import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ValidatedUser } from '../auth.service';

export const ROLES_KEY = 'roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: ValidatedUser | undefined = request.user;
    if (!user) throw new ForbiddenException('Unauthenticated');
    const primary = (user as any).role as UserRole | undefined;
    const many = Array.isArray((user as any).roles)
      ? ((user as any).roles as UserRole[])
      : [];
    const has = (r: UserRole) => primary === r || many.includes(r);
    const ok = requiredRoles.some(has);
    if (!ok) throw new ForbiddenException('Insufficient role');
    return true;
  }
}
