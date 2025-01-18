import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/users/domain/entities/user.entity';
import { Permission } from 'src/modules/permissions/domain/permission.entity';
import { PERMISSIONS_KEY } from 'src/decorators/permission.decorator';

  
  /**
   * Checks if the user has the required permissions (matching name).
   */
  @Injectable()
  export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
        PERMISSIONS_KEY,
        [context.getHandler(), context.getClass()],
      );
  
      if (!requiredPermissions) return true;
      
  
      const request = context.switchToHttp().getRequest();
      const user: User = request.user;
  
      if (!user || !user.role) throw new ForbiddenException('No roles found on user');
      
  

      const userPermissions = user.role.reduce((acc: Permission[], role) => {
        if (role.permission) {
          acc.push(...role.permission);
        }
        return acc;
      }, []);
  
      const hasPermission = requiredPermissions.every((perm) =>
        userPermissions.map((p) => p.name).includes(perm),
      );
  
      if (!hasPermission) {
        throw new ForbiddenException('Insufficient permissions');
      }
  
      return true;
    }
  }
  