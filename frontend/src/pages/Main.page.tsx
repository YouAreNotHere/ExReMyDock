import TodosPage from './todo/Todos.page';
import React, {useRef, useState} from "react";
import {useRequest} from "../shared/hooks/useRequest";
import { useNavigate } from 'react-router-dom';
import FilterBar from "../features/todo/ui/FilterBar/FilterBar.form";
import SearchInput from "../features/todo/ui/searchInput/SearchInput";
import "../app/App.css"
import AddTodo from "../features/todo/ui/AddTodoForm/AddTodo.form";
import TodosForm from "../features/todo/ui/Todos.form";
import Button from "../shared/button/Button";
import {ITodo} from "../features/todo/types/ITodosRequest";

const MainPage = () => {
  const navigate = useNavigate();
  const onLogoutSuccess = () => {
    navigate('/auth');
  };
  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const itemsRef: any = useRef<ITodo[]>(null);

  const {
    isLoading,
    errorMessage,
    makeRequest: logoutRequest,
  } = useRequest({
    method: 'POST',
    url: '/auth/logout',
    onSuccess: onLogoutSuccess,
  });


  const getMap = () => {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }else{
      return itemsRef.current;
    }
  }

  return (
      <div className="app-wrapper">
        <div className= "addTodo-searchInput-logout-bar">
          <Button
              id={"open-add-modal-button"}
              value={"Добавить задание"}
              className={"open-addTodo-modal__button"}
              onClick={() => setIsOpenAddModal(!isOpenAddModal)}
              disabled={false}/>
          <SearchInput ref = {itemsRef} getMap = {() => getMap()}/>
          <button onClick={logoutRequest} className="logout-button">
            {isLoading ? 'Загрузка...' : 'Выйти'}
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      <TodosForm ref = {itemsRef} getMap = {() => getMap()}/>
        <FilterBar />
        <AddTodo isOpenAddModal = {isOpenAddModal} setIsOpenAddModal = {setIsOpenAddModal} />
      </div>
  )
};

export default MainPage;
