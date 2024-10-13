import React from 'react';
import TodosForm from '../../features/todo/ui/Todos.form';
import FilterBar from '../../features/todo/ui/FilterBar.form';
import { useNavigate } from 'react-router-dom';
import { useRequest } from '../../shared/hooks/useRequest';

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
    <>
      <button onClick={logoutRequest}>
        {isLoading ? 'loading...' : 'logout'}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
      <TodosForm />
      <FilterBar />
    </>
  );
};

export default TodosPage;
