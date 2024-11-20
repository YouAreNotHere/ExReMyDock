import {useEffect, useRef, useState} from 'react';
import TodoForm from './Todo.form';
import { useSelector, useDispatch } from 'react-redux';
import AddTodo from './AddTodo.form';
import { useRequest } from '../../../shared/hooks/useRequest';
import { loadTodos } from '../../../actions';
import { ITodo } from '@/features/todo/types/ITodosRequest';
import { IRootState } from '@/features/todo/types/RootState';
import Modal from "./modal/Modal";
import '../../../app/App.css'
import SearchInput from "./searchInput/SearchInput";

const TodosForm = () => {
  const dispatch = useDispatch();
  const todos: ITodo[] = useSelector((state: IRootState) => state.todos);
  const currentFilter = useSelector((state: IRootState) => state.todoFilters);
  const todoInModal: number | null = useSelector((state: IRootState) => state.todoIdInModal);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsRef: any = useRef<ITodo[]>(null);
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

  const getMap = () => {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }else{
      return itemsRef.current;
    }
  }

  const scrollById = (id: string) => {
    const map = getMap();
    const node = map.get(id);
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    const text = node.querySelector("p");
    text.className = "focused-todo"
    setTimeout(() => text.className = "task-text", 1500);
  }

  return (
    <div className="app-wrapper">
      <SearchInput onClickHandler = {scrollById}/>
      <AddTodo />
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <ul className="todos-list">
        {currentTodos.map((todo: ITodo) => {
          return (<li ref = {(node) => {
            const map = getMap();
            if (!!node){
              map?.set(todo.id, node);
            }else{
              map?.delete(todo.id);
            }
          }}>
            <TodoForm
                key={todo.id}
                todo={todo}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
          </li>)
        })}
      </ul>
    </div>
  );
};

export default TodosForm;
