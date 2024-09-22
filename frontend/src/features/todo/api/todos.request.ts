import {IGetTodosRequest, IAddTodoRequest, IDeleteTodoRequest, ICompleteTodoRequest} from "../types/ITodosRequest";

const getTodosRequest = async (payload: IGetTodosRequest) =>
    await fetch('http://localhost:8081/todos/getTodos', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });

const addTodoRequest = async (payload: IAddTodoRequest) =>
    await fetch('http://localhost:8081/todos/addTodo', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });

const deleteTodoRequest = async (payload: IDeleteTodoRequest) =>
    await fetch('http://localhost:8081/todos/deleteTodo', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });

const completeTodoRequest = async (payload: ICompleteTodoRequest) =>{
    console.log(payload);
    await fetch('http://localhost:8081/todos/completeTodo', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


export {getTodosRequest, addTodoRequest, deleteTodoRequest, completeTodoRequest}