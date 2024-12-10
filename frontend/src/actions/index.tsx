import { ITodo } from '../features/todo/types/ITodosRequest';

// export const changeCurrentUser = (userName: string, userId: number) => ({
//     type: 'CHANGE_CURRENT_USER',
//     userName,
//     userId,
// });

export const changeCurrentUser = (userName: string, userId: number) => {
  console.log("action")
  return {
  type: 'CHANGE_CURRENT_USER',
  userName,
  userId,
}};

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

export const changeCurrentFilter = (filter: string) => ({
  type: 'CHANGE_FILTER',
  filter: filter,
});

let nextId = 0;

export const loadTodos = (todos: ITodo[]) => ({
  type: 'LOAD_TODOS',
  todos: todos,
});

export const loadCurrentTodos = (currentTodos: ITodo) => ({
  type: 'LOAD_CURRENT_TODOS',
  currentTodos: currentTodos,
});

export const editTodo = (text: string | undefined, id: number | undefined, additionalText: string | undefined) => ({
  type: 'EDIT_TODO',
  id: id,
  text: text,
  additionalText: additionalText,
});

export const deleteTodo = (id: number) => ({
  type: 'DELETE_TODO',
  id: id,
});

export const completeTodo = (id: number | undefined) => ({
  type: 'COMPLETE_TODO',
  id: id,
});

export const addTodo = (id: string,
                        userId: number,
                        text: string | undefined,
                        complited: boolean,
                        additionalText: string | undefined) => ({
  type: "ADD_TODO",
  id,
  userId,
  text,
  complited,
  additionalText,
})

export const changeEditedTodoId = (editedTodoId: number | null) => ({
  type: 'CHANGE_EDITED_TODO_ID',
  editedTodoId: editedTodoId,
});

export const changeTodoIdInModal = (todoId: number | null) => ({
  type: "CHANGE_TODO_ID_IN_MODAL",
  todoIdInModal: todoId,
})

export const changeCurrentTheme = (isDarkMode: boolean) => ({
  type: 'CHANGE_CURRENT_THEME',
  isDarkMode,
})