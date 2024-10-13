import { useEffect } from 'react';
import TodoForm from './Todo.form';
import { useSelector, useDispatch } from 'react-redux';
import AddTodo from './AddTodo.form';
import { useRequest } from '../../../shared/hooks/useRequest';
import { loadTodos } from '../../../actions';
import { ITodos } from '@/features/todo/types/ITodosRequest';
import { IRootState } from '@/features/todo/types/RootState';

const TodosForm = () => {
  const dispatch = useDispatch();
  const todos: ITodos[] = useSelector((state: IRootState) => state.todos);
  const currentFilter = useSelector((state: IRootState) => state.todoFilters);
  let currentTodos: Array<ITodos> = [];

  const setTodosToState = (todos: ITodos[]) => {
    console.log('set to');
    const newTodos: ITodos[] = todos.map(
      (todo: ITodos): ITodos =>
        todo.completed === 0
          ? { ...todo, completed: false }
          : { ...todo, completed: true },
    );

    const newTodosMoreTodos: boolean =
      JSON.stringify(todos).length < JSON.stringify(newTodos).length;
    if (newTodosMoreTodos) {
      console.log('N' + newTodos.length);
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
    const activeTodos: ITodos[] = todos.filter(
      (todo: ITodos) => todo.completed === false,
    );
    const completeTodos: ITodos[] = todos.filter(
      (todo: ITodos) => todo.completed === true,
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
    <div>
      <AddTodo />
      <ul>
        {currentTodos.map((todo: ITodos) => {
          return <TodoForm key={todo.id} todo={todo} />;
        })}
      </ul>
    </div>
  );
};

export default TodosForm;
