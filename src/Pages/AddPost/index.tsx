import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth/selectors';
import axios from '../../axios';
import SimpleMDE from 'react-simplemde-editor';
import { TextField, Paper, Button } from '@mui/material';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

interface GetOneRes {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  tags: string[];
  viewsCount: number;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const AddPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [tags, setTags] = React.useState<string>('');
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const isEditing = Boolean(id);
  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files) return;
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post<Record<string, string>>('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.error(err);
      alert('Ошибка при загрузке файла...');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onClickCancel = async () => {
    navigate('/');
  };

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        text,
        imageUrl,
        tags: tags.split(','),
      };
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.error(err);
      alert('Ошибка при создании статьи!');
    }
  };

  React.useEffect(() => {
    (async () => {
      isEditing &&
        (await axios
          .get<GetOneRes>(`/posts/${id}`)
          .then(({ data }) => {
            setTitle(data.title);
            setText(data.text);
            setImageUrl(data.imageUrl);
            setTags(data.tags.join(','));
          })
          .catch((err) => {
            console.error(err);
            alert('Ошибка при получении статьи!');
          }));
    })();
  }, []);

  const options = React.useMemo(
    () =>
      ({
        spellChecker: false,
        maxHeight: '400px',
        autofocus: true,
        placeholder: 'Введите текст...',
        status: false,
        autosave: {
          enabled: true,
          delay: 1000,
        },
      }) as any,
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) return <Navigate to="/" />;

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current?.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button
            sx={{ marginLeft: '30px' }}
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img
            className={styles.image}
            // src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
            src={imageUrl}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(event) => setTags(event.target.value)}
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <span>
          <Button onClick={onClickCancel} sx={{ marginLeft: '15px' }} size="large">
            Отмена
          </Button>
        </span>
      </div>
    </Paper>
  );
};
