import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../app/App.css';
import {
  editTodo,
  changeEditedTodoId,
  deleteTodo,
  completeTodo,
} from '../../../actions';
import {
  deleteTodoRequest,
  completeTodoRequest,
  saveEditedTodoRequest,
} from '../api/todos.request';

const TodoForm = ({ todo }: any) => {
  const [newTodoText, setNewTodoText] = useState('');
  const inputRef = useRef<any>();
  const dispatch = useDispatch();
  const editedTodo = useSelector((state: any) => state.editedTodoId);

  let todoContent;

  const onDeleteHandler = async (e: any) => {
    await deleteTodoRequest({ id: todo.id });
    dispatch(deleteTodo(todo.id));
  };

  const onCompleteHandler = async (e: any) => {
    await completeTodoRequest({ id: todo.id, completed: !todo.completed });
    dispatch(completeTodo(todo.id));
  };

  const onSavedEditedHandler = async (e: any) => {
    await saveEditedTodoRequest({ id: todo.id, text: newTodoText });
    dispatch(editTodo(newTodoText, todo.id));
    dispatch(changeEditedTodoId(null));
    setNewTodoText('');
  };

  if (!todo) {
    todoContent = <p>Its place to your first todo!</p>;
  }
  if (editedTodo === todo.id) {
    todoContent = (
      <div id={todo.id}>
        <input
          ref={inputRef}
          value={newTodoText}
          onChange={(e) => {
            setNewTodoText(e.target.value);
          }}
        />
        <button className='addPadding' onClick={onSavedEditedHandler}>
          Save
        </button>
      </div>
    );
  } else {
    todoContent = (
      <li key={todo.id} className={todo.completed ? 'сompleted' : ''}>
        {todo.text}
        <button className='addPadding' onClick={onDeleteHandler}>
          Delete todo
        </button>
        <button
          className='addPadding'
          onClick={() => dispatch(changeEditedTodoId(todo.id))}
        >
          Edit
        </button>
        <button onClick={onCompleteHandler} className='addPadding'>
          {!todo.completed ? 'Complete' : 'Uncomplete'}
        </button>
      </li>
    );
  }
  return todoContent;
};

export default TodoForm;
