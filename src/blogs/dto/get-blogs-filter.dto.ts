import { BlogStatus } from '../blog-status-enum';

export class GetBlogsFilterDto {
  status?: BlogStatus;
  search?: string;
}
