import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('useryjr')
export class UserYjr {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}


export class successUyDataMsg {
  msg: string;
  data: string
}


