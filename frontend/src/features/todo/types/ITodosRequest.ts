interface IPostTodosRequest {
    userId: number;
    text: string;
    completed: boolean;
}

interface IGetTodosRequest {
    userId: number;
}

export type {IPostTodosRequest, IGetTodosRequest}