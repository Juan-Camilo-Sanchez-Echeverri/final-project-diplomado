import { Comment } from './comment.interfaces';

interface Image {
  url: string;
  _id: string;
}

export interface Toy {
  _id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  createdBy: string;
  cover: string;
  images: Image[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}
