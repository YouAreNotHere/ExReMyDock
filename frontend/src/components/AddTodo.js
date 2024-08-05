import {useRef, useState} from "react";
import {useDispatch} from "react-redux"
import {addTodo} from "../actions";

const AddTodo = () =>{
    const ref = useRef();
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    return(
        <>
            <input
                ref = {ref}
                onChange={(e) => setText(e.target.value)}
                value = {text}
            />
            <button onClick={() => {
                dispatch(addTodo(text));
                setText("");
            }}>
                Add Todo
            </button>
        </>
    )
}

export default AddTodo;