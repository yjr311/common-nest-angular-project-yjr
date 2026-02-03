import { IsNotEmpty, isNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserYjrDto {
    @IsString()
    @IsNotEmpty()
    username: string;


    @IsString()
    @MinLength(6)
    password: string;
}