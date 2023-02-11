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
import { store } from './redux/store';

function App() {
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    dispatch(defaultState());
    dispatch(defaultArticles());
    localStorage.removeItem('accessToken');
  };

  const accessToken: boolean | null = useAppSelector(
    (state) => !!state.auth.accessToken
  );

  const handleAutoLoginFromAccessToken = async () => {
    const { dispatch } = store;

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    const user: { exp: number } = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (isExpired) {
      dispatch(defaultArticles());
      return dispatch(defaultState());
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
