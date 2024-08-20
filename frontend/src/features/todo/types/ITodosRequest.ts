interface IPostTodosRequest {
    id: number;
    user_id: number;
    text: string;
    status: string;
}

interface IGetTodosRequest {
    user_id: number;
}

export type {IPostTodosRequest, IGetTodosRequest}