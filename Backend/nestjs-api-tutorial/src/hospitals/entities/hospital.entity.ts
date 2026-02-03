import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hospitals')
export class Hospital {
    /**
     * TypeORM 只会把「带 @Column 装饰器的属性」当成数据库字段
     * 没写 @Column() 的字段
     * 在 TypeORM 眼里 = 不存在
     * synchronize: true 时
     * 数据库里多出来的字段会被当成“垃圾字段”删掉
     */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  rank: string;

  @Column()
  label: string;

  @Column({ type: 'text' })
  intro: string;

  @Column()
  avatar_url: string;


  // 归属用户
  @Column()
  userId: number;
}
