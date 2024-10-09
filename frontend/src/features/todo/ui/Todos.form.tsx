import { useEffect } from 'react';
import TodoForm from './Todo.form';
import { useSelector, useDispatch } from 'react-redux';
import AddTodo from './AddTodo.form';
import { useRequest } from '../../../shared/hooks/useRequest';
import { loadTodos } from '../../../actions';
import { ITodos } from '../types/ITodosRequest';
import It = jest.It;

const TodosForm = () => {
  const dispatch: any = useDispatch();
  const todos = useSelector((state: any) => state.todos);
  const currentFilter = useSelector((state: any) => state.todoFilters);
  let currentTodos: Array<ITodos> = [];
  const activeTodos = todos.filter((todo: ITodos) => todo.completed === false);
  const completeTodos = todos.filter((todo: ITodos) => todo.completed === true);

  if (currentFilter == 'SHOW_COMPLETED') {
    currentTodos = completeTodos;
  } else if (currentFilter == 'SHOW_ACTIVE') {
    currentTodos = activeTodos;
  } else {
    currentTodos = todos;
  }

  const setTodosToState = (todos: ITodos[]) => {
    console.log('set to');
    const newTodos: any = todos.map(
      //Если поставить подходящий для ситуации ITodos[] на 38 строке в диспатче будет ошибка"
      (todo: ITodos): ITodos =>
        todo.completed === 0
          ? { ...todo, completed: true }
          : { ...todo, completed: false },
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

  useEffect((): any => {
    getTodos();
  }, []);

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
