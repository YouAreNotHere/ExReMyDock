import {useState} from "react";
import {useSelector} from "react-redux";
import {ITodo} from "@/features/todo/types/ITodosRequest";
import {IRootState} from "@/features/todo/types/RootState";
import "./SearchInput.css"

const SearchInput = () => {
    const [text, setText] = useState('Поиск');
    const todos: ITodo[] = useSelector((state: IRootState) => state.todos);
    const likelyTodos = todos?.filter((todo: ITodo) => {
        const shortTodoText = todo.text.toLowerCase().split("").splice(0,text.length).join("");
        if (shortTodoText === text.toLowerCase() && text.length) return true;
    });


    return(
        <div>
            <input
                onChange={(e) => setText(e.target.value)}
                value={text} />
            <ul className="suggest-todos-list">
                {likelyTodos?.map((todo: ITodo) => (
                    <li key={todo.id} className= "suggest-todo">
                        <p>
                            {todo.text}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default SearchInput;