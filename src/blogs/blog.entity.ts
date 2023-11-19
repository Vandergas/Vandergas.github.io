import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlogStatus } from './blog-status-enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BlogStatus;

  @Column()
  time: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => User, (user) => user.blog, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
