import {IGetTodosRequest, IPostTodosRequest} from "../types/ITodosRequest";

const getTodosRequest = async (payload: { userId: number }) =>
    await fetch('http://localhost:8081/todos/getTodos', {
        method: 'GET',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });

const postTodosRequest = async (payload: IPostTodosRequest) =>
    await fetch('http://localhost:8081/todos/add', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });


export {getTodosRequest, postTodosRequest}