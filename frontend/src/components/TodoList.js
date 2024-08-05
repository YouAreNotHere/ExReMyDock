import Todo from "./Todo";
import {useSelector} from "react-redux";

function TodoList() {
    const todos = useSelector(state => state.todos);
    const currentFilter = useSelector(state => state.todoFilters);
    const activeTodos = todos.filter(todo => todo.complete === false);
    const completeTodos = todos.filter(todo => todo.complete === true);
    let currentTodos;

    // switch (currentFilter){
    //     case "SHOW_ALL":
    //         currentTodos = todos;
    //     case "SHOW_COMPLETED":
    //          currentTodos = completeTodos;
    //     case "SHOW_ACTIVE":
    //          currentTodos = activeTodos;
    //     default:
    //         currentTodos = todos;
    // }
    //Почему-то не работает

    if (currentFilter == "SHOW_COMPLETED"){
        currentTodos = completeTodos
    } else if (currentFilter == "SHOW_ACTIVE"){
        currentTodos = activeTodos
    }else {
        currentTodos = todos
    };

    return(
        <ul>
            {currentTodos.map(todo => <Todo key = {todo.id} todo = {todo}/>)}
        </ul>
    )
}

export default TodoList;