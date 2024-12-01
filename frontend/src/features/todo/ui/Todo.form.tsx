import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../app/App.css';
import { useRequest } from '../../../shared/hooks/useRequest';
import {
  editTodo,
  changeEditedTodoId,
  deleteTodo,
  completeTodo,
  changeTodoIdInModal
} from '../../../actions';
import {ITodo, ITodosProps} from '../types/ITodosRequest';
import { IRootState } from '../types/RootState';
import Button from "../../../shared/button/Button";
import SuggestButtonIcon from "../../../shared/button/SuggestButtonIcon";
import EditButtonIcon from "../../../shared/button/EditButtonIcon";

interface Props {
  todo: ITodo;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const TodoForm = ({ todo, isModalOpen, setIsModalOpen}: Props) => {
  const [newTodoText, setNewTodoText] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const editedTodo = useSelector((state: IRootState) => state.editedTodoId);

  let todoContent;
  const { makeRequest: deleteTodoRequest } = useRequest({
    method: 'POST',
    body: { id: todo.id },
    url: '/todos/deleteTodo',
  });

  const { makeRequest: saveEditedTodoRequest } = useRequest({
    method: 'POST',
    body: { id: todo.id, text: newTodoText },
    url: '/todos/saveEditedTodo',
  });

  const onDeleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await deleteTodoRequest();
    dispatch(deleteTodo(todo.id));
  };

  const onSavedEditedHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    await saveEditedTodoRequest();
    //dispatch(editTodo(newTodoText, todo.id, additionalText));
    dispatch(changeEditedTodoId(null));
    setNewTodoText('');
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
                className={todo.completed || todo.completed !== "0" ? 'сompleted-text' : 'task-text'}>{todo.text}
            </p>
          <div className={"buttons-wrapper"}>
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
