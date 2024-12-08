import { ITodo } from './ITodosRequest';
import { VisibilityFilters } from '@/actions';

interface IRootState {
  todos: ITodo[];
  editedTodoId: number | null;
  todoFilters: string;
  todoIdInModal: number | null;
  currentUsername: string | undefined;
  isDarkMode: boolean;
}

export type { IRootState };
