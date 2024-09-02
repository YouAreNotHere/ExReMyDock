interface IPostTodosRequest {
    //id: number;
    userId: number;
    text: string;
    status: string;
}

interface IGetTodosRequest {
    userId: number;
}

export type {IPostTodosRequest, IGetTodosRequest}