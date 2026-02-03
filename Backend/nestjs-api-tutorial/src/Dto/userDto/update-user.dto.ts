import { CreateUserDto } from "./create-user.dto";
import { PartialType } from '@nestjs/mapped-types';


// PartialType
/**
 * 自动把所有属性变成可选
 * 
   用于 PUT/PATCH 请求更新部分字段
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
    
}