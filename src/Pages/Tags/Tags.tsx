import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from '../../axios';

import styles from './Tags.module.scss';
import { Post } from '../../components';
import { PostData } from '../../redux/slices/posts/types';
import { selectAuthData } from '../../redux/slices/auth/selectors';

export const Tags: React.FC = () => {
  const params = useParams();
  const [items, setItems] = React.useState<PostData[]>();
  const userData = useSelector(selectAuthData);

  const tagName = params.tagName;

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<PostData[]>(`/posts/tags/${tagName}`);
        setItems(data);
      } catch (err) {
        console.error(err);
        alert('Ошибка при получении статетей по тегам...');
      }
    })();
  }, []);

  return (
    <div className={styles.root}>
      <span className={styles.name}>#{tagName?.toUpperCase()}</span>
      {items &&
        items.map((item, index) => (
          <Post
            key={index}
            id={item._id}
            title={item.title}
            imageUrl={item.imageUrl ? `http://localhost:4444${item.imageUrl}` : ''}
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
        ))}
    </div>
  );
};
