import {useState} from "react";
import {useSelector} from "react-redux";
import {ITodo} from "@/features/todo/types/ITodosRequest";
import {IRootState} from "@/features/todo/types/RootState";
import "./SearchInput.css"
import Button from "../../../../shared/button/Button";

const SearchInput = ({getMap}: any) => {
    const [text, setText] = useState('');
    const [showShortSuggest, setShowShortSuggest] = useState(true);
    let regText : RegExp;
    if (!!text) regText = new RegExp(`^${text}+`,"i");
    const todos: ITodo[] = useSelector((state: IRootState) => state.todos);
    let isMoreThenFiveSuggest: boolean;
    let currentSuggest: ITodo[];
    if (Array.isArray(todos)){
        const likelyTodos: ITodo[] = todos?.filter((todo: ITodo) => regText?.test(todo.text));
        const shortSuggestList: ITodo[] = likelyTodos?.filter((todo: ITodo, index) => index < 5);
        isMoreThenFiveSuggest = likelyTodos?.length >= 6;
        currentSuggest = showShortSuggest ? shortSuggestList : likelyTodos;
    }else {
        isMoreThenFiveSuggest = false;
        currentSuggest = [];
    }

    const scrollById = (id: number) => {
        const map = getMap();
        const node = map.get(id);
        node.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
        const text = node.querySelector("p");
        text.className = "focused-todo"
        setTimeout(() => text.className = "task-text", 1500);
    }

    return(
        <div className="suggest-input-and-list__wrapper">
            <input
                className="suggest-todo__input"
                onChange={(e) => setText(e.target.value)}
                value={text}
                placeholder="Поиск" />
            <ul className={currentSuggest.length > 0 ? "suggest-list" : "suggest-list-hidden"}>
                { currentSuggest?.map((todo: ITodo) => (
                    <li
                      key={todo.id}
                      className= "suggest-todo"
                      onClick={() => {
                          scrollById(todo.id)
                          setText("")}}>
                        <p className="suggest-todo__text">
                            {todo.text}
                        </p>
                    </li>
                ))}
                {isMoreThenFiveSuggest ? (  <Button
                    id={"show-more-suggest-todo-button"}
                    value={showShortSuggest ? "Показать больше" : "Показать меньше"}
                    onClick={()=> setShowShortSuggest(!showShortSuggest)}
                    disabled={false}
                    className="show-more-suggest-todo__button"
                />):
                null}
            </ul>
        </div>
    )
};

export default SearchInput;