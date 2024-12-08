import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from '../../pages/auth/Auth.page';
import RegistrationPage from '../../pages/auth/Registration.page';
import TodosPage from '../../pages/todo/Todos.page';
import MainPage from "../../pages/Main.page";
import NotFoundPage from '../../pages/not-found.page';
import { Provider, useSelector } from 'react-redux';
import {store, persistor} from '../../reducers';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect, useState } from 'react';
import { IRootState } from '../../features/todo/types/RootState';

const Navigation = () => {
  const isDarkMode = useSelector((state: IRootState) => state.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);


  return (

        <Router>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>

  );
};

export { Navigation };
