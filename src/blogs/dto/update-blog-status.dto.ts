import { IsEnum } from 'class-validator';
import { BlogStatus } from '../blog-status-enum';

export class UpdateBlogStatusDto {
  @IsEnum(BlogStatus)
  status: BlogStatus;
}
