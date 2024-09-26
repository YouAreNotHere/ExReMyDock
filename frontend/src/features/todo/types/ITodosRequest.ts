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

interface ICompleteTodoRequest{
    id: number;
    completed: boolean;
}


export type {IAddTodoRequest, IGetTodosRequest, IDeleteTodoRequest, ICompleteTodoRequest}