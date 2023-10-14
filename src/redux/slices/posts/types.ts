export interface PostSliceState {
  posts: {
    items: PostData[];
    status: string;
  };
  tags: {
    items: string[];
    status: string;
  };
}

export interface PostData {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  imageUrl?: string;
  commentsCount?: number;
  user: {
    _id: string;
    fullName: string;
    email: string;
    passwordHash: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export enum Status {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}
