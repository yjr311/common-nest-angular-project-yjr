import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserYjrModule } from './useryjr/useryjr.module';
import { JwtModule } from '@nestjs/jwt';
import { HospitalsModule } from './hospitals/hospitals.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserContextInterceptor } from './common/interceptors/user-context.interceptor';
import { UserContextModule } from './common/user-context.module';


@Module({
  imports: [ // 用来注册模块
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',      // 或你的 MySQL 地址
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],  // 实体/表
      synchronize: true,     // 开发时可用，生产建议关掉用迁移
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY || 'dev_secret_123',
      signOptions: { expiresIn: '2h' },
    }),
    AuthModule, UserModule,UserYjrModule, HospitalsModule, UserContextModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UserContextInterceptor,
    },
  ], // 用来注册服务、处理器、管道、拦截器等依赖项
})
export class AppModule {}
