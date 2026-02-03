import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaderService } from '../headers/HttpHeader.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http:HttpClient,private headerServices:HttpHeaderService) { }


login(loginInfo: any){
  const headers = this.headerServices.getDefaultHeaders();
  return this.http.post('/api-test/useryjr/login',loginInfo, { headers } );
}

GetProduct(){
  const headers = this.headerServices.getDefaultHeaders();
  return this.http.get('/api-test/hospitals', { headers } );
}

inserHosData(data: any) {
  const headers = this.headerServices.getDefaultHeaders();
  return this.http.post('/api-test/hospitals/hos/save', data ,{ headers })
}

updateHosData(id: number, data: any) {
  const headers = this.headerServices.getDefaultHeaders();
  return this.http.patch(`/api-test/hospitals/update/${id}`, data ,{ headers })
}

deleteHosData(id: number) {
  const headers = this.headerServices.getDefaultHeaders();
  return this.http.delete(`/api-test/hospitals/delete/${id}` , { headers })
}


GetProductQuery(id:any){
  const headers = this.headerServices.getDefaultHeaders();
  return this.http.get(`/api-test/Index/index?id=${id}`, { headers } );
}

getCode(tel:any){
  const headers = this.headerServices.getDefaultHeaders();
   return this.http.post('/api-test/get/code',tel );
}

register(registerInfo:any){
  const headers = this.headerServices.getDefaultHeaders();
  return this.http.post('/api-test/useryjr/register',registerInfo , { headers } );
}

}
