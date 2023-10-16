import React from 'react';
import axios from '../axios';
import { useParams } from 'react-router-dom';

import { AddComment, Post, CommentsBlock } from '../components';
import ReactMarkdown from 'react-markdown';
import { PostData } from '../redux/slices/posts/types';
import { AuthSliceData } from '../redux/slices/auth/types';

export interface CommentsData {
  postId: string;
  user: Record<string, string>;
  text: string;
  _id: string;
  _v: number;
}

export const FullPost: React.FC = () => {
  const [data, setData] = React.useState<PostData>({
    _id: '',
    title: '',
    text: '',
    tags: [],
    viewsCount: 0,
    imageUrl: '',
    commentsCount: 0,
    user: {
      _id: '',
      fullName: '',
      email: '',
      passwordHash: '',
      avatarUrl: '',
      createdAt: '',
      updatedAt: '',
      __v: 0,
    },
    createdAt: '',
    updatedAt: '',
    __v: 0,
  });
  const [user, setUser] = React.useState<AuthSliceData>({
    _id: '',
    fullName: '',
    email: '',
    avatarUrl: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
    token: '',
  });
  const [comments, setComments] = React.useState<CommentsData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      await axios.get<AuthSliceData>('/auth/me').then((res) => setUser(res.data));
      await axios
        .get<PostData>(`/posts/${id}`)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      await axios
        .post<CommentsData[]>('/comments/allposts', { id: data._id })
        .then((res) => setComments(res.data))
        .catch((err) => {
          console.error(err);
        });
    })();
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        // imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        imageUrl={data.imageUrl ? data.imageUrl : ''}
        user={{
          avatarUrl: data.user.avatarUrl,
          fullName: data.user.fullName,
        }}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments} isLoading={false}>
        <AddComment postId={data._id} fullName={user.fullName} avatarUrl={user.avatarUrl} />
      </CommentsBlock>
    </>
  );
};
