import TodosPage from './todo/Todos.page';
import React, {useState} from "react";
import {useRequest} from "../shared/hooks/useRequest";
import { useNavigate } from 'react-router-dom';
import FilterBar from "../features/todo/ui/FilterBar.form";
import SearchInput from "../features/todo/ui/searchInput/SearchInput";
import "../app/App.css"
import AddTodo from "../features/todo/ui/AddTodo.form";
import Button from "../shared/button/Button";

const MainPage = () => {
  const navigate = useNavigate();
  const onLogoutSuccess = () => {
    navigate('/auth');
  };
  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
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
        <div className= "addTodo-searchInput-logout-bar">
          <Button
              id={"open-add-modal-button"}
              value={"Добавить задание"}
              className={"open-addTodo-modal__button"}
              onClick={() => setIsOpenAddModal(!isOpenAddModal)}
              disabled={false}/>
          <SearchInput/>
          <button onClick={logoutRequest} className="logout-button">
            {isLoading ? 'Загрузка...' : 'Выйти'}
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      <TodosPage />
        <FilterBar />
        <AddTodo className = {isOpenAddModal ? "add-todo-form" : "display-hidden"} />
      </div>
  )
};

export default MainPage;
