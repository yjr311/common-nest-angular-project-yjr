// src/common/services/user-context.service.ts
import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class UserContext {
  private readonly storage = new AsyncLocalStorage<any>();

  run(user, fn) {
    this.storage.run(user, fn);  // 在请求上下文中存储用户信息
  }

  get user() {
    return this.storage.getStore();  // 获取当前请求的用户信息
  }
}
