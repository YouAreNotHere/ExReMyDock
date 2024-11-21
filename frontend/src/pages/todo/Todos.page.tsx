import React from 'react';
import TodosForm from '../../features/todo/ui/Todos.form';
import FilterBar from '../../features/todo/ui/FilterBar.form';
import SearchInput from '../../features/todo/ui/searchInput/SearchInput';
import { useNavigate } from 'react-router-dom';
import { useRequest } from '../../shared/hooks/useRequest';
import '../../app/App.css'

const TodosPage = () => {

  return (
      <TodosForm />
  );
};

export default TodosPage;
