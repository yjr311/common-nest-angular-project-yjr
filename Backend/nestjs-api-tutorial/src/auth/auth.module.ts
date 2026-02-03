import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CateService } from "src/Service/CatServiece";
import { JwtStrategy } from './jwt.strategy';

@Module({
    controllers: [ AuthController ],
    providers: [ AuthService,CateService, JwtStrategy ],

    // providers = Service / Strategy / Repository / 工具类

    // imports = 依赖的其他模块

    // exports = 把 providers 暴露给外部模块
})

export class AuthModule {}