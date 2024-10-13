import { ITodos } from '@/features/todo/types/ITodosRequest';
import { IRootState } from '@/features/todo/types/RootState';

const todos = (
  state: ITodos[] = [],
  action: { [key: string]: string | number },
) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          complete: false,
        },
      ];
    case 'LOAD_TODOS':
      return action.todos;
    case 'EDIT_TODO':
      return state.map((todo: ITodos) => {
        if (todo.id !== action.id) {
          return todo;
        } else {
          return { ...todo, text: action.text };
        }
      });
    case 'COMPLETE_TODO':
      return state.map((todo: ITodos) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );
    case 'DELETE_TODO':
      return state.filter((todo: ITodos) => todo.id !== action.id);
    default:
      return state;
  }
};
export default todos;
