import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogStatus } from './blog-status-enum';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetBlogsFilterDto } from './dto/get-blogs-filter.dto';
import { Blog } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { getUser } from 'src/auth/dto/get-user.decorator';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  // getBlogs(): Blog[] {
  //   return this.blogs;
  // }

  async getBlogById(id: string): Promise<Blog> {
    const found = this.blogsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Blog with "${id}" not found! `);
    }
    return found;
  }

  // async createBlogs(CreateBlogDto: CreateBlogDto): Promise<Blog> {
  //   const { author, title, description } = CreateBlogDto;

  //   const blog = this.blogsRepository.create{
  //     author,
  //     title,
  //     description,
  //     status: BlogStatus.PUBLIC,
  //     time: new Date(),
  //   };

  //   await this.blogsRepository.save(blog);
  //   return blog;
  // }

  async createBlogs(CreateBlogDto: CreateBlogDto, user: User): Promise<Blog> {
    const { author, title, description } = CreateBlogDto;

    const blog = this.blogsRepository.create({
      author,
      title,
      description,
      status: BlogStatus.PUBLIC,
      time: new Date(),
      user,
    });

    await this.blogsRepository.save(blog);
    return blog;
  }

  //   this.blogs.push(blog);
  //   return blog;
  // }

  // async deleteBlog(id: string, user: User): Promise<DeleteResult> {
  //   const result = await this.blogsRepository.delete(id, user);

  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Task with id:"${id}" not found`);
  //   }

  //   return result;
  // }

  async getBlog(id: string, user: User): Promise<Blog> {
    const found = this.blogsRepository.findOne({
      where: {
        id: id,
        user: user,
      },
    });
    if (!found) {
      throw new NotFoundException(`Blog with "${id}" not found! `);
    }
    return found;
  }

  async deleteBlog(id: string, user: User): Promise<DeleteResult> {
    const result = await this.blogsRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return result;
  }

  async updateBlogStatus(
    id: string,
    status: BlogStatus,
    @getUser() user: User,
  ): Promise<Blog> {
    const blog = await this.getBlog(id, user);
    blog.status = status;
    await this.blogsRepository.save(blog);

    return blog;
  }

  async getBlogs(
    { status, search }: GetBlogsFilterDto,
    user: User,
  ): Promise<Blog[]> {
    const query = this.blogsRepository.createQueryBuilder('blog');
    query.where({
      user,
    });

    if (status) {
      {
        query.andWhere('blog.status = :status', { status });
      }
    }

    if (search) {
      query.andWhere(
        'LOWER(blog.title) LIKE LOWER(:search) OR LOWER(blog.description) LIKE LOWER(:search) OR LOWER(blog.author) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const blogs = await query.getMany();
    return blogs;
  }
}
