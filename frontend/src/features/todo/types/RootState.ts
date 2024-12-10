import { ITodo } from './ITodosRequest';
import { VisibilityFilters } from '@/actions';

interface IRootState {
  todos: ITodo[];
  editedTodoId: number | null;
  todoFilters: string;
  todoIdInModal: number | null;
  currentUser: {userName: string ,userId: number};
  isDarkMode: boolean;
}

export type { IRootState };
