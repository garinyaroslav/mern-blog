import React from 'react';
import axios from '../../axios';

import styles from './AddComment.module.scss';

import { TextField, Avatar, Button } from '@mui/material';

export const AddComment: React.FC<Record<string, string>> = ({ postId, fullName, avatarUrl }) => {
  const [text, setText] = React.useState<string>('');

  const onSubmit = async () => {
    try {
      const fields = {
        postId,
        user: {
          fullName,
          avatarUrl,
        },
        text,
      };
      const { data } = await axios.post('/comments', fields);
      setText('');
    } catch (err) {
      console.error(err);
      alert('Ошибка при отправке комментария в базу данных');
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            value={text}
            onChange={(event) => setText(event.target.value)}
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
