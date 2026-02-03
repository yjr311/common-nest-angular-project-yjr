import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LoadingComponent } from '../loading/loading/loading.component';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NzButtonModule, LoadingComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [
    trigger('formToggle', [
      state('void', style({ opacity: 0, height: 0 })),
      state('*', style({ opacity: 1, height: '*' })),
      transition('void <=> *', animate('500ms ease-in-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {



  loginInfo: any = {
    username: '',
    password: ''
  }

  registerInfo: any = {
    //tel: '',
    username: '',
    password: '',
    //validCode: ''
  }

  code: string = '';
  countdown: number = 0;
  timer: any;

  isLoading: boolean = false;
  isRegisterMode = false; // 默认显示登录表单

  constructor(private router: Router,
    private productService: ProductService,
    private message: NzMessageService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  Tolgin() {
    if (this.loginInfo.username == 'admin' && this.loginInfo.password == '123') {

      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;

        this.router.navigateByUrl('/landing');

      }, 10000)
    } else {
      try {
        this.productService.login(this.loginInfo).subscribe({
          next: (res: any) => {
            if (res.code === 200) {
              this.isLoading = true;
              localStorage.setItem('h-token', res.data.token);
              localStorage.setItem('userInfo', JSON.stringify(res.data));
              this.message.success('login success');
              setTimeout(() => {
                this.router.navigateByUrl('/product');
              }, 10000);
              
            } else {
              this.message.error(res.message || 'login fail');
            }
          },
          error: (err) => {
            console.log('http error:', err);

            const msg =
              err.error?.message ||
              err.error ||
              '登录失败';

            this.message.error(msg);
          }
        });
      } catch (error: any) {
        this.message.error(error.error.message);
        console.log('error::', error);
      }
    }

  }

  toggleMode() {
    console.log(this.isRegisterMode)
    this.isRegisterMode = !this.isRegisterMode;
    console.log(this.isRegisterMode)
  }

  sendCode() {
    console.log(this.registerInfo.tel)
    this.productService.getCode({ tel: this.registerInfo.tel }).subscribe((res: any) => {
      console.log(res);
      if (res.code == 10000) {
        this.message.success('code send success');
        this.countdown = 60;
        this.timer = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(this.timer);
          }
        })
      } else {
        if (this.registerInfo.tel == '') {
          this.message.error('phone is empty');
        } else {
          this.message.error('code send fail');
        }

      }
    })

  }

  register() {
    this.productService.register({
      "username": this.registerInfo.username,
      "password": this.registerInfo.password,
      // "validCode": this.registerInfo.validCode
    }).subscribe((res: any) => {
      if (res.msg == 200) {
        this.message.success('register success');
        this.isRegisterMode = false; // 切换回登录模式
        this.registerInfo = {}; // 清空注册信息
      } else {
        this.message.error('register fail');
      }
    })
  }

}
