import {useEffect, useRef, useState, forwardRef} from 'react';
import TodoForm from './Todo.form';
import { useSelector, useDispatch } from 'react-redux';
import AddTodo from './AddTodoForm/AddTodo.form';
import { useRequest } from '../../../shared/hooks/useRequest';
import {changeTodoIdInModal, loadTodos} from '../../../actions';
import { ITodo } from '@/features/todo/types/ITodosRequest';
import { IRootState } from '@/features/todo/types/RootState';
import Modal from "./modal/Modal";
import '../../../app/App.scss'
import SearchInput from "@/features/todo/ui/search/SearchInput";

const TodosForm = forwardRef(function TodosForm(props: any, ref){
  const dispatch = useDispatch();
  const todos: ITodo[] = useSelector((state: IRootState) => state.todos);
  const currentFilter = useSelector((state: IRootState) => state.todoFilters);
  const todoInModal: number | null = useSelector((state: IRootState) => state.todoIdInModal);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {getMap} = props;
  let currentTodos: Array<ITodo> = [];

  const setTodosToState = (todos: ITodo[]) => {
    const newTodos: ITodo[] = todos.map(
        (todo: ITodo): ITodo =>
            todo.completed === "0"
                ? { ...todo, completed: false }
                : { ...todo, completed: true },
    );

    const newTodosMoreTodos: boolean =
        JSON.stringify(todos).length < JSON.stringify(newTodos).length;
    if (newTodosMoreTodos) {
      dispatch(loadTodos(newTodos));
    }
  };

  // const setTodosToState =  (todos: any) =>{
  //   dispatch(loadTodos(newTodos))
  // }

  const { makeRequest: getTodos, data: newTodos } = useRequest({
    method: 'GET',
    url: '/todos/getTodos',
    // onSuccess: setTodosToState,
  });

  useEffect(() => {
    const setTodosToState = async () =>{
      await getTodos();
      // console.log(newTodos);
      // await dispatch(loadTodos(newTodos))
    }
    setTodosToState()
  }, []);
  //Dobavit todos, choby ne pererenderivalos`.

  if (todos) {
    if (!Array.isArray(todos)) return
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
})

export default TodosForm;
