import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router, RouterLink } from '@angular/router';


interface userInfo  {
  avatar:string,
  name:string
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[NzDropDownModule,NzAvatarModule,NzIconModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  userInfo:userInfo = {
    avatar:'',
    name:''
  }

  constructor(private router:Router) { }

  ngOnInit() {
      const userInfo1 = localStorage.getItem('userInfo') || '';
      
      if(userInfo1){
        const userInfo = JSON.parse(userInfo1)
        console.log(userInfo)
        this.userInfo.avatar = userInfo.avatar
        this.userInfo.name = userInfo.name
      }
      

  }

  logout(){
    localStorage.removeItem('h-token');
    localStorage.removeItem('userInfo');
    window.location.reload(); // 刷新页面
  }

  ToCategories(id:any){
    this.router.navigate(['/Categories',id]);
  }

}
