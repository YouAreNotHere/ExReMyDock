import {useState} from "react";
import {useSelector} from "react-redux";
import {ITodo} from "@/features/todo/types/ITodosRequest";
import {IRootState} from "@/features/todo/types/RootState";
import "./SearchInput.css"

const SearchInput = ({onClickHandler}: any) => {
    const [text, setText] = useState('');
    let regText : RegExp;
    if (!!text) regText = new RegExp(`^${text}+`,"i");
    const todos: ITodo[] = useSelector((state: IRootState) => state.todos);
    const likelyTodos = todos?.filter((todo: ITodo) => regText?.test(todo.text));


    return(
        <div>
            <input
                className="modal-text__input"
                onChange={(e) => setText(e.target.value)}
                value={text}
                placeholder="Поиск" />
            <ul className="suggest-todos-list">
                {likelyTodos?.map((todo: ITodo) => (
                    <li key={todo.id} className= "suggest-todo" onClick={() => onClickHandler(todo.id)}>
                        <p className="suggest-todo__text">{todo.text}
                            {todo.text}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default SearchInput;