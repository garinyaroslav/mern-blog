import React from 'react';
import { Typography, TextField, Paper, Button, Avatar } from '@mui/material';
import { selectIsAuth } from '../../redux/slices/auth/selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { useForm } from 'react-hook-form';
import { fetchRegister } from '../../redux/slices/auth/asyncAction';
import { AuthData } from '../Login';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.scss';

export const Registration: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'Вася Пупкин',
      email: 'vasya@test.ru',
      password: '1234',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: AuthData) => {
    const data: any = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) return <Navigate to="/mern-blog" />;

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите полное имя' })}
          label="Полное имя"
          fullWidth
        />
        <TextField
          className={styles.field}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          label="email"
          type="email"
          fullWidth
        />
        <TextField
          className={styles.field}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
          label="Пароль"
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
