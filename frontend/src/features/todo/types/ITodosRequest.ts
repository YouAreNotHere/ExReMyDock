interface IAddTodoRequest {
    userId: number;
    text: string;
    completed: boolean;
}

interface IGetTodosRequest {
    userId: number;
}

interface IDeleteTodoRequest{
    id: number;
}

export type {IAddTodoRequest, IGetTodosRequest, IDeleteTodoRequest}