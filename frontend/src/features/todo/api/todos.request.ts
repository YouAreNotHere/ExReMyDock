import {IGetTodosRequest, IPostTodosRequest} from "../types/ITodosRequest";

const getTodosRequest = async (payload: IGetTodosRequest) =>
    await fetch('http://localhost:8081/todo', {
        method: 'GET',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });

const postTodosRequest = async (payload: IPostTodosRequest) =>
    await fetch('http://localhost:8081/todo', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });


export {getTodosRequest, postTodosRequest}