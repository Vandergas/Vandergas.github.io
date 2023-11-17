import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BlogStatus } from './blog-status-enum';

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
}
