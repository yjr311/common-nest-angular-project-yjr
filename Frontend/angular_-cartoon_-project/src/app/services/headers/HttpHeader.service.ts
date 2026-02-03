import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpHeaderService {

constructor() { }

getDefaultHeaders(): HttpHeaders {
  const token = localStorage.getItem('h-token') || '';
  console.log('token::', token)
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // 你的授权 token
      //'terminal': 'h5'        // 自定义 header 1
    });
  }
}
