import {useRef, useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"
import useGetTodos from "./useGetTodos";
import {getTodosRequest, postTodosRequest} from "../api/todos.request";
import {addTodo} from "../../../actions";
import {get} from "node:http";


const AddTodo = () =>{
    const ref: any = useRef();
    const [text, setText] = useState("");
    const userId = useSelector((state:any) => state.userId);
    const dispatch = useDispatch();
    const getTodos: any = useGetTodos();

    const onClickHandler = async (e: any) => {
        await postTodosRequest({userId, text, completed: false});
        //getTodosRequest({userId});
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