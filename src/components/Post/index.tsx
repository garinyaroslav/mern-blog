import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import clsx from 'clsx';
import styles from './Post.module.scss';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Clear';
import { UserInfo } from '../UserInfo';

import { PostSkeleton } from './PostSkeleton';
import { fetchRemovePost } from '../../redux/slices/posts/asyncActions';

export interface PostProps {
  id?: string;
  title?: string;
  imageUrl?: string;
  user?: {
    avatarUrl?: string | null;
    fullName?: string;
  };
  createdAt?: string;
  viewsCount?: number;
  commentsCount?: number;
  tags?: string[];
  isEditable?: boolean;
  children?: ReactNode;
  isFullPost?: boolean;
  isLoading?: boolean;
}

export const Post: React.FC<PostProps> = ({
  id = '',
  title,
  createdAt = '',
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags = [],
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useAppDispatch();
  if (isLoading) return <PostSkeleton />;

  const onClickRemove = (id: any) => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={() => onClickRemove(id)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} createdAt={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name, i) => (
              <li key={i}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
