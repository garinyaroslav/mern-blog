import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/auth/selectors';
import { useAppDispatch } from '../../redux/store';
import { useForm } from 'react-hook-form';
import { Typography, TextField, Paper, Button } from '@mui/material';
import { fetchAuth } from '../../redux/slices/auth/asyncAction';

import styles from './Login.module.scss';

export type AuthData = Record<string, string>;

export const Login: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'test@test.com',
      password: '12345',
    },
  });

  const onSubmit = async (values: AuthData) => {
    const data: any = await dispatch(fetchAuth(values));

    if (!data.payload) return alert('Не удалось авторизоваться');

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          {...register('email', { required: 'Укажите почту' })}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          {...register('password', { required: 'Укажите пароль' })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
