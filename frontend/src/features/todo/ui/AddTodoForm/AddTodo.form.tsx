import React, { useEffect, useRef, useState } from 'react';
import { useRequest } from '../../../../shared/hooks/useRequest';
import { useDispatch } from 'react-redux';
import { loadTodos } from '../../../../actions';
import '../../../../app/App.css'
import "./AddTodoForm.css"
import Button from '../../../../shared/button/Button';

interface Props{
  isOpenAddModal: boolean,
  setIsOpenAddModal: (isOpenAddModal: boolean) => void
}

const AddTodo = ({isOpenAddModal, setIsOpenAddModal}: Props) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [text, setText] = useState('');

  const { makeRequest: addTodo } = useRequest({
    method: 'POST',
    body: { text, completed: false },
    url: '/todos/addTodo',
  });

  const { data: todos, makeRequest: getTodos } = useRequest({
    method: 'GET',
    url: '/todos/getTodos',
  });

  useEffect(() => {
    dispatch(loadTodos(todos));
    setText('');
  }, [todos]);

  const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await addTodo();
    await getTodos();
    setIsOpenAddModal(!isOpenAddModal);
  };

  return (
    <div  className = {isOpenAddModal ? "add-todo-form" : "display-hidden"}>
      <input
          ref={ref}
          placeholder={"Задание"}
          onChange={(e) => setText(e.target.value)} value={text} />
      <Button
          id={"close-modal-button"}
          value={""}
          onClick={()=> setIsOpenAddModal(!isOpenAddModal)}
          disabled={false}
          className="close-add-modal-button"/>
      <textarea
          className="additional-text__input"
          placeholder={"Описание задания"}/>
      <button onClick={onClickHandler}>Добавить задание</button>
    </div>
  );
};

export default AddTodo;
