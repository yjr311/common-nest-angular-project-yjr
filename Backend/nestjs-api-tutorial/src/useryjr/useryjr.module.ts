import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserYjr } from './useryjr.entity';
import { useryjrController } from './useryjr.controller';
import { UserYjrService } from './useryjr.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserYjr])], // 注册实体，即可用表
    controllers: [useryjrController],
    providers: [UserYjrService],
})
export class UserYjrModule {}
