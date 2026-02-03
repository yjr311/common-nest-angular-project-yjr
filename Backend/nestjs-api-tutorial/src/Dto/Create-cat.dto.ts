import { IsNotEmpty, IsInt, IsString, IsOptional } from "class-validator";

export class CreateCatDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional() // 可选
    @IsInt()
    age?: number;

    @IsString()
    @IsNotEmpty()
    bread: string;
}



export class FindCatResponseDto {
  msg: string;
  data: CreateCatDto[];
}