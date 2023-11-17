import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './blog-status-enum';
import { CreateBlogDto } from './dto/create-blog.dto';
// import { GetBlogsFilterDto } from './dto/get-blogs-filter.dto';
import { UpdateBlogStatusDto } from './dto/update-blog-status.dto';
import { DeleteResult } from 'typeorm';
import { GetBlogsFilterDto } from './dto/get-blogs-filter.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  getTasks(@Query() filterDto: GetBlogsFilterDto): Promise<Blog[]> {
    return this.blogsService.getBlogs(filterDto);
  }

  @Post()
  createBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogsService.createBlogs(createBlogDto);
  }

  @Get('/:id')
  getBlogById(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.getBlogById(id);
  } // nếu public mới được get

  @Delete('/:id')
  deleteBlog(@Param('id') id: string): Promise<DeleteResult> {
    return this.blogsService.deleteBlog(id);
  }

  @Patch('/:id/status')
  updateBlogStatus(
    @Param('id') id: string,
    @Body() updateBlogStatusDto: UpdateBlogStatusDto,
  ): Promise<Blog> {
    const { status } = updateBlogStatusDto;
    return this.blogsService.updateBlogStatus(id, status);
  }
}
