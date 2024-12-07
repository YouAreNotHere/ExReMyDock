import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from '../../pages/auth/Auth.page';
import RegistrationPage from '../../pages/auth/Registration.page';
import TodosPage from '../../pages/todo/Todos.page';
import MainPage from "../../pages/Main.page";
import NotFoundPage from '../../pages/not-found.page';
import { Provider } from 'react-redux';
import {store, persistor} from '../../reducers';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect, useState } from 'react';

const Navigation = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export { Navigation };
