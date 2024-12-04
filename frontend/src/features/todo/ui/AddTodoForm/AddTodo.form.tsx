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
  const ref: any = useRef(null);
  const [text, setText] = useState('');
  const [additionalText, setAdditionalText] = useState('');
  useEffect(() => {
    if (!!ref.current) ref.current.focus();
  }, [isOpenAddModal]);

  const { makeRequest: addTodo, isLoading : isAddTodoLoading  } = useRequest({
    method: 'POST',
    body: { text, additionalText, completed: false },
    url: '/todos/addTodo',
  });

  const { data: todos, makeRequest: getTodos, isLoading: isGetTodosLoading  } = useRequest({
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
          disabled={isGetTodosLoading || isAddTodoLoading}
          className="close-add-modal-button"/>
      <textarea
          value={additionalText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAdditionalText(e.target.value)}
          className="additional-text__input"
          placeholder={"Описание задания"} />
      <button onClick={onClickHandler}>Добавить задание</button>
    </div>
  );
};

export default AddTodo;
