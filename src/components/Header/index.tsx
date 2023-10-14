import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/auth/slice';
import { selectIsAuth } from '../../redux/slices/auth/selectors';
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = (): void => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/mern-blog" className={styles.logo}>
            <span>MERN-BLOG</span>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/mern-blog/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/mern-blog/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/mern-blog/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
