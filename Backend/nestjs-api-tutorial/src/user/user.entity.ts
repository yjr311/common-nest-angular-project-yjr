import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')  // 表名
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100 })
  email: string;
}


export class FindUserResponseDto {
  msg: string;
  data: User[];
}


export class successDataMsg {
  msg: string;
  data: string
}