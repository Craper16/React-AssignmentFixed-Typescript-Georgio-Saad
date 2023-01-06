import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { defaultState } from './redux/auth/authSlice';
import { defaultArticles } from './redux/articles/articlesSlice';

import Home from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import Error from './pages/Error';
import MainNavbar from './components/MainNavbar';

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
