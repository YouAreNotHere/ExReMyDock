import { useEffect } from 'react';
import TodoForm from './Todo.form';
import { useSelector, useDispatch } from 'react-redux';
import AddTodo from './AddTodo.form';
import { useRequest } from '../../../shared/hooks/useRequest';
import { loadTodos } from '../../../actions';
import {ITodos} from "../types/ITodosRequest";

const TodosForm = () => {
  const dispatch: any = useDispatch();
  const todos = useSelector((state: any) => state.todos);
  const currentFilter = useSelector((state: any) => state.todoFilters);
  let currentTodos: any = [];

  const activeTodos = todos.filter((todo: any) => todo.completed === false);
  const completeTodos = todos.filter((todo: any) => todo.completed === true);

  if (currentFilter == 'SHOW_COMPLETED') {
    currentTodos = completeTodos;
  } else if (currentFilter == 'SHOW_ACTIVE') {
    currentTodos = activeTodos;
  } else {
    currentTodos = todos;
  }

  const setTodosToState = (todos: any ) => {
    const newTodos = todos.map((todo: ITodos): any =>
      todo.completed === 0
        ? { ...todo, completed: true }
        : { ...todo, completed: false },
    );

    const newTodosMoreTodos : boolean =
      JSON.stringify(todos).length < JSON.stringify(newTodos).length;
    if (newTodosMoreTodos) {
      dispatch(loadTodos(newTodos));
    }
  };

  const {
    data,
    isLoading,
    errorMessage,
    makeRequest: getTodos,
  } = useRequest({
    method: 'GET',
    url: '/todos/getTodos',
    onSuccess: setTodosToState,
  });

  useEffect((): any => {
    getTodos();
  }, []);

  return (
    <div>
      <AddTodo />
      <ul>
        {currentTodos.map((todo: any) => {
          return (
            <TodoForm
              key={todo.id}
              todo={todo}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodosForm;
