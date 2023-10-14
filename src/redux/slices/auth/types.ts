import { Status } from '../posts/types';

export interface AuthSliceState {
  data: null | AuthSliceData;
  status: Status;
}

export interface AuthSliceData {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
}
