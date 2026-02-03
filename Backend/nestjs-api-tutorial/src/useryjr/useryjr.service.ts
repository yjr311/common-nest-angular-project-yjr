import { BadGatewayException, BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { successUyDataMsg, UserYjr } from "./useryjr.entity";
import { CreateUserYjrDto } from "src/Dto/user-yjr/create-user.dto";
import * as bcrypt from 'bcrypt';
import { success } from "src/common/response";
import { LoginUserYjrDto } from "src/Dto/user-yjr/login-user.dto";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserYjrService {
    constructor(
        @InjectRepository(UserYjr)
        private readonly userRepository: Repository<UserYjr>,
        private jwtService: JwtService,
    ) { }



    async create(createUserYjrDto: CreateUserYjrDto): Promise<successUyDataMsg> {
        const { username, password } = createUserYjrDto;

        const exisUser = await this.userRepository.findOne({
            where: { username }
        })

        if (exisUser) throw new BadRequestException('用户名已存在');

        // 密码加密
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = this.userRepository.create({
            username,
            password: hashedPassword
        })

        await this.userRepository.save(user);

        return {
            msg: '200',
            data: '用户注册成功'
        }
    }


    async login(dto: LoginUserYjrDto) {
        const user = await this.userRepository.findOne({ where: { username: dto.username } });
        console.log("user::", user?.username)
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('用户名或密码错误');
        }

        // JWT payload（不要放敏感信息）
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role
        };

        const token = this.jwtService.sign(payload);

        return success({
            token,
            expiresIn: 7200,
            name: user?.username
        }, '登录成功');


    }
}