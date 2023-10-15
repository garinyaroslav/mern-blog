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
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:tagName" element={<Tags />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
};
