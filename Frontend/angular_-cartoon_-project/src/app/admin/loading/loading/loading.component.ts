import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent implements OnInit {

  username: string = '';

  constructor() { }

  ngOnInit(): void {
    //  || ''
   const userInfo1 =  localStorage.getItem('userInfo');
   if(userInfo1){
    const userInfo = JSON.parse(userInfo1)
    this.username =  userInfo.name;
   }else{
    this.username = 'Game Master';
   }
   
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
  }
}
