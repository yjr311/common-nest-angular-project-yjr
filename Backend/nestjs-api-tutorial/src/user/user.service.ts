// src/user/user.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindUserResponseDto, successDataMsg, User } from './user.entity';
import { CreateUserDto } from 'src/Dto/userDto/create-user.dto';
import { UpdateUserDto } from 'src/Dto/userDto/update-user.dto';

// 告诉 Nest.js 这个类是 可注入的 Provider
// 可以被 Controller 或其他 Service 注入
@Injectable()
export class UserService {
  constructor(
    // 自动注入 User 表对应的 Repository Repository 自带 CRUD 方法（find(), findOne(), save(), update(), delete()）
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  /**
   * 
   * @returns 
   */
  async findAll(): Promise<FindUserResponseDto> {
    const users = await this.userRepository.find(); // 是异步的，你得 等它完成 才有真正的 User[]
    return {
      msg: '200',
      data: users
    }  // 查整张表
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async findOne(id: number): Promise<FindUserResponseDto> {
    const users = await this.userRepository.findOne({ where: { id } })
    return {
      msg: '200',
      data: users ? [users] : []
    };
  }


  async create(createUserDto: CreateUserDto): Promise<successDataMsg> {
    const user = this.userRepository.create(createUserDto); // 转成真正的 Entity
    const result = await this.userRepository.save(user);
    if (!result) {
      throw new InternalServerErrorException('插入数据失败');
    }
    return {
      msg: '200',
      data: '插入数据成功'
    };
  }


  /**
   * 更新用户
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<successDataMsg> {
    const result =  await this.userRepository.update(id, updateUserDto);
    // const users = await this.userRepository.findOne({ where: { id } });
    // return {
    //   msg: '200',
    //   data: users ? [users] : []
    // };
    if(!result) {
      throw new InternalServerErrorException('更新数据失败')
    }
    return {
      msg: '200',
      data: '更新数据成功'
    };
  }


  /**
  * 删除用户
  */
  async remove(id: number): Promise<successDataMsg> {
    const result = await this.userRepository.delete(id);

    if(!result) {
      throw new InternalServerErrorException('删除用户失败');
    }

    return {
      msg: '200',
      data: '删除用户成功'
    };
  }



  /**
   * 高级查询示例
   */
  async complexQuery(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id > :id', { id: 1 })
      .orderBy('user.id', 'DESC')
      .getMany();
  }


}