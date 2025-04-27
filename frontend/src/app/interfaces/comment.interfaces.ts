export interface Comment {
  _id: string;
  toy: string;
  user: {
    _id: string;
    name: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentDto {
  content: string;
}
