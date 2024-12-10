import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../app/App.scss';
import { useRequest } from '../../../shared/hooks/useRequest';
import {
  changeEditedTodoId,
  deleteTodo,
  changeTodoIdInModal
} from '../../../actions';
import {ITodo, ITodosProps} from '../types/ITodosRequest';
import Button from "../../../shared/button/Button";
import EditButtonIcon from "../../../shared/button/EditButtonIcon";

interface Props {
  todo: ITodo;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const TodoForm = ({ todo, isModalOpen, setIsModalOpen}: Props) => {
  const dispatch = useDispatch();

  let todoContent;
  const { makeRequest: deleteTodoRequest } = useRequest({
    method: 'POST',
    body: { id: todo.id },
    url: '/todos/deleteTodo',
  });

  const onDeleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await deleteTodoRequest();
    dispatch(deleteTodo(todo.id));
  };

  const onTextClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(changeTodoIdInModal(todo.id));
    setIsModalOpen(!isModalOpen);
  }

  if (!todo) {
    todoContent = <p>Its place to your first todo!</p>;
  }
    todoContent = (
        <li key={todo.id} className= "todo_bar">
            <p
                onClick={onTextClickHandler}
                className={todo.completed ?'сompleted-text' : 'task-text' }>{todo.text}
            </p>
          <div className={"edit-delete__buttons-wrapper"}>
            <Button
                id={"edit-todo-button"}
                value={""}
                onClick={() => {
                  dispatch(changeEditedTodoId(todo.id))
                  dispatch(changeTodoIdInModal(todo.id))
                  setIsModalOpen(!isModalOpen)
                }}
                disabled={false}
                className={"edit-todo-button"}>
              <EditButtonIcon className={"edit-todo-icon"}/>
            </Button>
            <Button
                id={"delete-todo-button"}
                value={""}
                onClick={onDeleteHandler}
                disabled={false}
                className={"delete-todo__button"}/>
          </div>
        </li>
    );
  return todoContent;
};

export default TodoForm;
