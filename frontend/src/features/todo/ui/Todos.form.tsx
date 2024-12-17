import {useEffect, useState, forwardRef} from 'react';
import TodoForm from './Todo.form';
import { useSelector, useDispatch } from 'react-redux';
import { useRequest } from '../../../shared/hooks/useRequest';
import {loadTodos} from '../../../actions';
import { ITodo } from '@/features/todo/types/ITodosRequest';
import { IRootState } from '@/features/todo/types/RootState';
import Modal from "./modal/Modal";
import '../../../app/App.scss'

const TodosForm = forwardRef(function TodosForm(props: any, ref){
  const dispatch = useDispatch();
  const todos: ITodo[] = useSelector((state: IRootState) => state.todos);
  const currentFilter = useSelector((state: IRootState) => state.todoFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getTodosCounter, setGetTodosCounter] = useState(0);
  const {getMap} = props;
  let currentTodos: Array<ITodo> = [];

  const dispatchTodos = (data: any) => {
    if (Array.isArray(data)){
      dispatch(loadTodos(data))
    }else{
      dispatch(loadTodos([]))
    }
  };

  const { makeRequest: getTodos} = useRequest({
    method: 'GET',
    url: '/todos/getTodos',
    onSuccess: dispatchTodos,
  });

  useEffect(() => {
    getTodos();
    setGetTodosCounter((n)=> n+1)
  }, []);

  if (Array.isArray(todos)) {
    if (currentFilter == 'SHOW_COMPLETED') {
      currentTodos = todos.filter((todo: ITodo) => todo.completed == 1);
    } else if (currentFilter == 'SHOW_ACTIVE') {
      currentTodos = todos.filter((todo: ITodo) => !todo.completed || todo.completed === "0");
    } else {
      currentTodos = todos;
    }
  }

  return (
      <div className="todos-wrapper">
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        <ul className="todos-list">
          {currentTodos.map((todo: ITodo) => {
            return (<li
                ref = {(node) => {
              const map = getMap();
              if (!!node){
                map?.set(todo.id, node);
              }else{
                map?.delete(todo.id);
              }
            }} key={todo.id}>
              <TodoForm
                  todo={todo}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
              />
            </li>)
          })}
        </ul>
      </div>
  );
})

export default TodosForm;
