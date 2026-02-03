import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { WebFooterComponent } from '../web-footer/web-footer.component';
import { WebSideComponent } from '../web-side/web-side.component';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
@Component({
  selector: 'app-web-layout',
  standalone: true,
  imports: [NzLayoutModule, WebFooterComponent, WebSideComponent, RouterOutlet, RouterModule, NzMenuModule, NzBreadCrumbModule, NzIconModule,CommonModule, NzDropDownModule, NzAvatarModule],
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.less']
})
export class WebLayoutComponent implements OnInit {
  isCollapsed:boolean = false;
  breadcrumb:string[] = [];
  constructor(private router:Router) { }

  ngOnInit() {
  }
  setBreadcrumb(path:string[]){
    this.breadcrumb = path;
    console.log(path)
  }

  ToLogin(){
    // const token = localStorage.getItem('h-token');
    // const userInfo = localStorage.getItem('h-userInfo');
    // const userInfoData = JSON.parse(userInfo!);
    // if(token && userInfoData){
      
    // }

    localStorage.removeItem('h-token');
    localStorage.removeItem('userInfo');
    // window.location.reload(); // 刷新页面

    this.router.navigateByUrl('/login');
    
  }
}
