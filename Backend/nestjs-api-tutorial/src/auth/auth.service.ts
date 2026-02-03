import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {

    singup(){
        return {  message: 'I am signup endpoint' };
    }

     singin(){
        return 'I am signin endpoint';
    }
}