interface IAddTodoRequest {
  text: string;
  completed: boolean;
}

interface IGetTodosRequest {
  userId: number;
}

interface IDeleteTodoRequest {
  id: number;
}

interface ICompleteTodoRequest {
  id: number;
  completed: boolean;
}

interface ISaveEditedTodoRequest {
  id: number;
  text: string;
}

interface ITodo {
  id: number;
  user_id: number;
  text: string;
  completed: boolean | number;
  additionalText?: string | undefined;
}

interface ITodosProps {
  todo: ITodo;
}

export type {
  IAddTodoRequest,
  IGetTodosRequest,
  IDeleteTodoRequest,
  ICompleteTodoRequest,
  ISaveEditedTodoRequest,
  ITodo,
  ITodosProps,
};
