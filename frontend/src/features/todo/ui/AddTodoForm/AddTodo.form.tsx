import React, { useEffect, useRef, useState } from 'react';
import { useRequest } from '../../../../shared/hooks/useRequest';
import { useDispatch, useSelector } from 'react-redux';
import { loadTodos, addTodo } from '../../../../actions';
import '../../../../app/App.scss'
import "./AddTodoForm.css"
import Button from '../../../../shared/button/Button';
import Spinner from '../../../../shared/effects/spinner/Spinner';
import { v4 as uuidv4 } from 'uuid';
import { IRootState } from '@/features/todo/types/RootState';

interface Props{
  isOpenAddModal: boolean,
  setIsOpenAddModal: (isOpenAddModal: boolean) => void
}

const AddTodo = ({isOpenAddModal, setIsOpenAddModal}: Props) => {
  const dispatch = useDispatch();
  const ref: any = useRef(null);
  const [text, setText] = useState('');
  const [additionalText, setAdditionalText] = useState('');
  const currentUser = useSelector((state: IRootState) => state.currentUser);

  useEffect(() => {
    if (!!ref.current) ref.current.focus();
  }, [isOpenAddModal]);
  const newId = uuidv4();

  const { makeRequest: addNewTodo, isLoading : isAddTodoLoading  } = useRequest({
    method: 'POST',
    body: { id: newId, text, additionalText, completed: false },
    url: '/todos/addTodo',
  });

  const { data: todos, makeRequest: getTodos, isLoading: isGetTodosLoading,  } = useRequest({
    method: 'GET',
    url: '/todos/getTodos',
    onSuccess: (data)=>dispatch(loadTodos(data))
  });

  useEffect(() => {
    dispatch(loadTodos(todos));
    setText('');
  }, [todos]);

  const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await addNewTodo();
    dispatch(addTodo(newId, currentUser.userId, text, false, additionalText));

    // await getTodos();
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
      <Button
        id={"add-todo-button"}
        value={"Добавить задание"}
        onClick={onClickHandler}
        disabled={isGetTodosLoading || isAddTodoLoading}/>
      <Spinner isLoading={isGetTodosLoading || isAddTodoLoading}/>
    </div>
  );
};

export default AddTodo;
