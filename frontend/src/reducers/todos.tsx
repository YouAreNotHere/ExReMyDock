import { ITodo } from '@/features/todo/types/ITodosRequest';
import { IRootState } from '@/features/todo/types/RootState';

const initialState: ITodo[] = [];

const todos = (
  state: ITodo[] = initialState,
  action: { [key: string]: string | number },
) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log(state);
      return [
        ...state,
        {
          id: action.id,
          userId: action.userId,
          text: action.text,
          completed: 0,
          additionalText: action.additionalText,
        },
      ];
    case 'LOAD_TODOS':
      return action.todos;
    case 'EDIT_TODO':
      return state.map((todo: ITodo) => {
        if (todo.id !== action.id) {
          return todo;
        } else {
          return { ...todo, text: action.text, additionalText: action.additionalText };
        }
      });
    case 'COMPLETE_TODO':
      return state.map((todo: ITodo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );
    case 'DELETE_TODO':
      console.log(state)
      console.log(state.filter((todo: ITodo) => todo.id !== action.id))
      return state.filter((todo: ITodo) => todo.id !== action.id);
    default:
      return state;
  }
};
export default todos;
