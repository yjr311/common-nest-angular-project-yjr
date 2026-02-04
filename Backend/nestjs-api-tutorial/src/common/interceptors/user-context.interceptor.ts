// src/common/interceptors/user-context.interceptor.ts
import { Injectable } from '@nestjs/common';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserContext } from '../services/user-context.service';

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  constructor(private readonly userContext: UserContext) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;  // 获取通过 JwtAuthGuard 注入的用户信息

    if (!user) {
      return next.handle();
    }

    return new Observable((subscriber) => {
      // 将用户信息存储到上下文中
      this.userContext.run(user, () => {
        next.handle().subscribe({
          next: (v) => subscriber.next(v),
          error: (e) => subscriber.error(e),
          complete: () => subscriber.complete(),
        });
      });
    });
  }
}
