import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { defaultState, setUser } from './redux/auth/authSlice';
import { defaultArticles } from './redux/articles/articlesSlice';

import Home from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import Error from './pages/Error';
import MainNavbar from './components/MainNavbar';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
import { useToast } from '@chakra-ui/react';

function App() {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleLogout = (): void => {
    dispatch(defaultState());
    dispatch(defaultArticles());
    localStorage.removeItem('accessToken');
  };

  const accessToken: boolean | null = useAppSelector(
    (state) => !!state.auth.accessToken
  );

  const handleAutoLoginFromAccessToken = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    const user: { exp: number } = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (isExpired) {
      dispatch(defaultArticles());
      dispatch(defaultState());
      return toast({
        title: 'You must login again to access articles',
        description: 'Your access token has expired',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    return dispatch(setUser({ accessToken: accessToken }));
  };

  useEffect(() => {
    handleAutoLoginFromAccessToken();
  }, []);

  return (
    <>
      <Router>
        <MainNavbar handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={!accessToken ? <Navigate to="/login" /> : <Home />}
          />
          <Route
            path="/login"
            element={accessToken ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="*"
            element={<Error />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
