import {useRef, useState} from "react";
import {useSelector} from "react-redux"
import {getTodosRequest, postTodosRequest} from "../api/todos.request";


const AddTodo = () =>{
    const ref: any = useRef();
    const [text, setText] = useState("");
    const userId = useSelector((state:any) => state.userId);
    return (
        <>
            <input
                ref = {ref}
                onChange={(e) => setText(e.target.value)}
                value = {text}
            />
            <button onClick={() => {
                postTodosRequest({userId, text, completed: false});
                //getTodosRequest({userId});
                setText("");
            }}>
                Add Todo
            </button>
        </>
    )
}

export default AddTodo;