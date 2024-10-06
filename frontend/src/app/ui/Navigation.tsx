import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from '../../pages/auth/Auth.page';
import RegistrationPage from '../../pages/auth/Registration.page';
import TodosPage from '../../pages/todo/Todos.page';
import MainPage from '../../pages/Main.page';
import NotFoundPage from '../../pages/not-found.page';
import { Provider } from 'react-redux';
import store from '../../reducers';

const Navigation = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<TodosPage />} />
          <Route path='/auth' element={<AuthPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export { Navigation };
