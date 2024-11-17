import { ITodos } from './ITodosRequest';
import { VisibilityFilters } from '@/actions';

interface IRootState {
  todos: ITodos[];
  editedTodoId: number | null;
  todoFilters: string;
  todoIdInModal: number | null;
}

export type { IRootState };
