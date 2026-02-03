import { Body, Controller, Post } from "@nestjs/common";
import { UserYjrService } from "./useryjr.service";
import { CreateUserYjrDto } from "src/Dto/user-yjr/create-user.dto";
import { LoginUserYjrDto } from "src/Dto/user-yjr/login-user.dto";

@Controller('useryjr')
export class useryjrController {
    constructor(private readonly userYjrService: UserYjrService) {}


    @Post('/register')
    register(@Body() dto: CreateUserYjrDto) {
        return this.userYjrService.create(dto);
    }

    @Post('/login')
    login(@Body() dto: LoginUserYjrDto) {
        return this.userYjrService.login(dto);
    }
}