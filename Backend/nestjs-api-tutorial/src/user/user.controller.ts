import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from 'src/Dto/userDto/create-user.dto';
import { UpdateUserDto } from 'src/Dto/userDto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller('user') // 路由前缀 /user
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 查询所有用户
   * GET /user
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    // 调用 Service 方法
    return this.userService.findAll();
  }

  /**
   * 查询单个用户
   * GET /user/:id
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe 会把路由参数转换成数字
    return this.userService.findOne(id);
  }

  /**
   * 新增用户
   * POST /user
   */
  @Post('/save')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * 更新用户
   * PUT /user/update/:id
   */
  @Put('/update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * 删除用户
   * DELETE /user/delete/:id
   */
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  

  @Get('/ground/findGroup')
  findGroup() {
    return this.userService.complexQuery();
  }
}
