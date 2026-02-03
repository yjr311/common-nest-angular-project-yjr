import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserYjrDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
