import React from 'react';
import { useSelector } from 'react-redux';
import { fetchPosts, fetchPostsPop, fetchTags } from '../redux/slices/posts/asyncActions';
import { useAppDispatch } from '../redux/store';
import { PostData, Status } from '../redux/slices/posts/types';
import axios from '../axios';

import { Post, TagsBlock, CommentsBlock } from '../components';
import { Grid, Tabs, Tab } from '@mui/material';
import { postsSelector } from '../redux/slices/posts/selectors';
import { selectAuthData } from '../redux/slices/auth/selectors';
import { CommentsData } from './FullPost';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useSelector(selectAuthData);
  const { posts, tags } = useSelector(postsSelector);
  const [tabValue, setTabValue] = React.useState<number>(0);
  const [comments, setComments] = React.useState<CommentsData[]>([]);

  const isPostsLoading = posts.status === Status.LOADING;
  const isTagsLoading = tags.status === Status.LOADING;

  React.useEffect(() => {
    tabValue === 0 ? dispatch(fetchPosts()) : dispatch(fetchPostsPop());
    dispatch(fetchTags());
  }, [tabValue]);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get('/comments');
      setComments(data);
    })();
  }, [comments]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        sx={{ marginBottom: '15px' }}
        aria-label="basic tabs example">
        <Tab label="Новые" value={0} />
        <Tab label="Популярные" value={1} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((item: PostData, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={item._id}
                title={item.title}
                imageUrl={item.imageUrl ? `${process.env.REACT_APP_API_URL}${item.imageUrl}` : ''}
                user={{
                  avatarUrl: item.user?.avatarUrl,
                  fullName: item.user?.fullName,
                }}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={item.commentsCount}
                tags={item.tags}
                isEditable={userData?._id === item.user._id}
              />
            ),
          )}
        </Grid>
        <Grid item xs={4}>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments} isLoading={false} />
        </Grid>
      </Grid>
    </>
  );
};
