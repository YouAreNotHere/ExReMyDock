import '../App.css';
import {deleteTodo, changeEditedTodoId, completeTodo, editTodo} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";

const Todo = ({todo}) => {
    const dispatch = useDispatch();
    const editedTodoId = useSelector((state) => state.editedTodoId);
    const [newTodoText, setNewTodoText] = useState("");
    const inputRef = useRef();
    let todoContent;

    if (editedTodoId===todo.id){
        todoContent = (
            <div id={todo.id}>
                <input
                    ref={inputRef}
                    value={newTodoText}
                    onChange={(e) => {
                        setNewTodoText(e.target.value);
                    }}
                />
                <button onClick={()=>{
                    dispatch(editTodo(newTodoText, todo.id, ));
                    dispatch(changeEditedTodoId(null));
                    setNewTodoText("");
                }}>
                    Save
                </button>
            </div>
        )
    }else{
        todoContent = (
            <li key={todo.id} className={todo.complete ? "сompleted" : "normal"}>
                {todo.text}
                <button className="addPadding" onClick={() => dispatch(deleteTodo(todo.id))}>
                    Delete todo
                </button>
                <button className="addPadding" onClick={() => dispatch(changeEditedTodoId(todo.id))}>
                    Edit
                </button>
                <button onClick={() => dispatch(completeTodo(todo.id))} className="addPadding">
                    {todo.complete ? "Uncomplete" : "Complete"}
                </button>
            </li>
        )
    }
    return todoContent;
}

export default Todo