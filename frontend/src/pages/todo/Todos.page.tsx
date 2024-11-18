import React from 'react';
import TodosForm from '../../features/todo/ui/Todos.form';
import FilterBar from '../../features/todo/ui/FilterBar.form';
import SearchInput from '../../features/todo/ui/searchInput/SearchInput';
import { useNavigate } from 'react-router-dom';
import { useRequest } from '../../shared/hooks/useRequest';
import '../../app/App.css'

const TodosPage = () => {
  const navigate = useNavigate();
  const onLogoutSuccess = () => {
    navigate('/auth');
  };

  const {
    isLoading,
    errorMessage,
    makeRequest: logoutRequest,
  } = useRequest({
    method: 'POST',
    url: '/auth/logout',
    onSuccess: onLogoutSuccess,
  });

  return (
    <div className="app-wrapper">
      <button onClick={logoutRequest}>
        {isLoading ? 'Загрузка...' : 'Выйти'}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
        <SearchInput/>
      <TodosForm />
      <FilterBar />
    </div>
  );
};

export default TodosPage;
