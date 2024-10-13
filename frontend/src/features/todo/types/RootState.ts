import { ITodos } from './ITodosRequest';
import { VisibilityFilters } from '@/actions';

interface IRootState {
  todos: ITodos[];
  editedTodoId: number;
  todoFilters: string;
}

export type { IRootState };
