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

interface ITodos {
  id: number;
  user_id: number;
  text: string;
  completed: boolean | number;
}

interface ITodosProps {
  todo: ITodos;
}

export type {
  IAddTodoRequest,
  IGetTodosRequest,
  IDeleteTodoRequest,
  ICompleteTodoRequest,
  ISaveEditedTodoRequest,
  ITodos,
  ITodosProps,
};
