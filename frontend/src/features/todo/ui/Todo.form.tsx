import {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import "../../../app/App.css";
import {editTodo, changeEditedTodoId, deleteTodo, completeTodo} from "../../../actions";

const TodoForm = ({todo, editedTodo, setEditedTodo, setTodos}: any) => {
    const [newTodoText, setNewTodoText] = useState("");
    const inputRef = useRef<any>();
    const dispatch = useDispatch();

    let todoContent;

    if (!todo){
        todoContent=(
            <p>Its place to your first todo!</p>
        )
    }
    if (editedTodo===todo.id) {
        todoContent = (
            <div id={todo.id}>
                <input
                    ref={inputRef}
                    value={newTodoText}
                    onChange={(e) => {
                        setNewTodoText(e.target.value);
                    }}
                />
                <button onClick={() => {
                    dispatch(editTodo(newTodoText, todo.id,));
                    dispatch(changeEditedTodoId(null));
                    setNewTodoText("");
                }}>
                    Save
                </button>
            </div>
        )
    }else{
        todoContent = (
            <li key={todo.id} className={todo.complete ? "сompleted" : ""}>
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
};

export default TodoForm;