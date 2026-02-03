import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const token = localStorage.getItem('h-token');  // 获取 token

    if (!token) {
      // 如果没有 token，跳转到登录页面
      this.router.navigate(['/login']);
      return false;  // 阻止路由导航
    }

    return true;  // 允许路由导航
  }
}
