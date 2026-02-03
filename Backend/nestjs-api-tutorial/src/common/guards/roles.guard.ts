import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

// 请求进来时访问
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //  读取 @Roles() 设置的角色
    //  reflector: Nest 用来“读装饰器标签”的工具 => Nest 用来“读装饰器标签”的工具
    //  等价于 => 给我这个 handler 或 class 上的 metadata['roles']
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()], // 先看方法上有没有 @Roles，
                                                  // 没有的话，再看类上有没有
    );

    // 没写 @Roles → 不限制
    if (!requiredRoles) return true;

    //  取当前登录用户
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    //  判断是否有权限
    return requiredRoles.includes(user.role);
  }
}
