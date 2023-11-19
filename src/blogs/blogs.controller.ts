import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './blog-status-enum';
import { CreateBlogDto } from './dto/create-blog.dto';
// import { GetBlogsFilterDto } from './dto/get-blogs-filter.dto';
import { UpdateBlogStatusDto } from './dto/update-blog-status.dto';
import { DeleteResult } from 'typeorm';
import { GetBlogsFilterDto } from './dto/get-blogs-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/dto/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('blogs')
@UseGuards(AuthGuard())
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  getBlogs(
    @Query() filterDto: GetBlogsFilterDto,
    @getUser() user: User,
  ): Promise<Blog[]> {
    return this.blogsService.getBlogs(filterDto, user);
  }

  @Post()
  createBlog(
    @Body() createBlogDto: CreateBlogDto,
    @getUser() user: User,
  ): Promise<Blog> {
    return this.blogsService.createBlogs(createBlogDto, user);
  }

  @Get('/:id')
  getBlogById(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.getBlogById(id);
  }

  getBlog(@Param('id') id: string, @getUser() user: User): Promise<Blog> {
    return this.blogsService.getBlog(id, user);
  }

  @Delete('/:id')
  deleteBlog(
    @Param('id') id: string,
    @getUser() user: User,
  ): Promise<DeleteResult> {
    return this.blogsService.deleteBlog(id, user);
  }

  @Patch('/:id/status')
  async updateBlogStatus(
    @Param('id') id: string,
    @Body() updateBlogStatusDto: UpdateBlogStatusDto,
    @getUser() user: User,
  ): Promise<Blog> {
    const { status } = updateBlogStatusDto;
    // return this.blogsService.updateBlogStatus(id, status, user);
    try {
      const updatedBlog = await this.blogsService.updateBlogStatus(
        id,
        status,
        user,
      );

      return updatedBlog;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new UnauthorizedException(
          'you do not have permission to update this blog',
        );
      }
    }
  }
}
