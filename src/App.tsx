import React from 'react';
import { useAppDispatch } from './redux/store';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login, NotFound, Tags } from './Pages';
import { fetchAuthMe } from './redux/slices/auth/asyncAction';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="mern-blog" element={<Home />} />
          <Route path="mern-blog/posts/:id" element={<FullPost />} />
          <Route path="mern-blog/posts/:id/edit" element={<AddPost />} />
          <Route path="mern-blog/add-post" element={<AddPost />} />
          <Route path="mern-blog/login" element={<Login />} />
          <Route path="mern-blog/register" element={<Registration />} />
          <Route path="mern-blog/tags/:tagName" element={<Tags />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
};
