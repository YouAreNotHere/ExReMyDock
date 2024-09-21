import {useRef, useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"
import useGetTodos from "./useGetTodos";
import {getTodosRequest, addTodoRequest} from "../api/todos.request";

const AddTodo = () =>{
    const ref: any = useRef();
    const [text, setText] = useState("");
    const userId = useSelector((state:any) => state.userId);
    const getTodos: any = useGetTodos();

    const onClickHandler = async (e: any) => {
        await addTodoRequest({userId, text, completed: false});
        getTodos(userId);
        setText("");
    }

    return (
        <>
            <input
                ref = {ref}
                onChange={(e) => setText(e.target.value)}
                value = {text}
            />
            <button onClick={onClickHandler}>
                Add Todo
            </button>
        </>
    )
}

export default AddTodo;