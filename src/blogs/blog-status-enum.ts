export interface Blog {
  id: string;
  author: string;
  title: string;
  description: string;
  status: BlogStatus;
  time: Date;
}

export enum BlogStatus {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}
