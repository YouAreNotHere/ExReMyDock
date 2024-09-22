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

interface ISaveEditedTodoRequest{
    id: number;
    text: string;
}


export type {IAddTodoRequest, IGetTodosRequest, IDeleteTodoRequest, ICompleteTodoRequest, ISaveEditedTodoRequest}