import {useEffect, useState} from 'react';
import TodoForm from './Todo.form';
import { useSelector, useDispatch } from 'react-redux';
import AddTodo from './AddTodo.form';
import { useRequest } from '../../../shared/hooks/useRequest';
import { loadTodos } from '../../../actions';
import { ITodo } from '@/features/todo/types/ITodosRequest';
import { IRootState } from '@/features/todo/types/RootState';
import Modal from "./modal/Modal";
import '../../../app/App.css'

const TodosForm = () => {
  const dispatch = useDispatch();
  const todos: ITodo[] = useSelector((state: IRootState) => state.todos);
  const currentFilter = useSelector((state: IRootState) => state.todoFilters);
  const todoInModal: number | null = useSelector((state: IRootState) => state.todoIdInModal);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let currentTodos: Array<ITodo> = [];

  const setTodosToState = (todos: ITodo[]) => {
    const newTodos: ITodo[] = todos.map(
      (todo: ITodo): ITodo =>
        todo.completed === 0
          ? { ...todo, completed: false }
          : { ...todo, completed: true },
    );

    const newTodosMoreTodos: boolean =
      JSON.stringify(todos).length < JSON.stringify(newTodos).length;
    if (newTodosMoreTodos) {
      dispatch(loadTodos(newTodos));
    }
  };

  const { makeRequest: getTodos } = useRequest({
    method: 'GET',
    url: '/todos/getTodos',
    onSuccess: setTodosToState,
  });

  useEffect(() => {
    getTodos();
  }, []);

  if (todos) {
    const activeTodos: ITodo[] = todos.filter(
      (todo: ITodo) => todo.completed === false,
    );
    const completeTodos: ITodo[] = todos.filter(
      (todo: ITodo) => todo.completed === true,
    );

    if (currentFilter == 'SHOW_COMPLETED') {
      currentTodos = completeTodos;
    } else if (currentFilter == 'SHOW_ACTIVE') {
      currentTodos = activeTodos;
    } else {
      currentTodos = todos;
    }
  }

  return (
    <div className="app-wrapper">
      <AddTodo />
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <ul className="todos-list">
        {currentTodos.map((todo: ITodo) => {
          return <TodoForm key={todo.id} todo={todo} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>;
        })}
      </ul>
    </div>
  );
};

export default TodosForm;
