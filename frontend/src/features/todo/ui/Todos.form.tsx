import {useState, useEffect} from "react";
import TodoForm from "./Todo.form";
import {useSelector, useDispatch} from "react-redux";
import AddTodo from "./AddTodo.form";
import useGetTodos from "./useGetTodos";

const TodosForm = () => {
    const [editedTodo, setEditedTodo] = useState("");
    const dispatch: any = useDispatch();
    const todos = useSelector((state: any) => state.todos);
    const userId = useSelector((state: any) => state.userId);
    const activeTodos = todos.filter((todo: any) => todo.completed === false);
    const completeTodos = todos.filter((todo: any) => todo.completed === true);
    const getTodos: any = useGetTodos();
    const currentFilter = useSelector((state: any) => state.todoFilters);
    let currentTodos: any = [];

    if (currentFilter == "SHOW_COMPLETED"){
        currentTodos = completeTodos;
    } else if (currentFilter == "SHOW_ACTIVE"){
        currentTodos = activeTodos;
    }else {
        currentTodos = todos;
    };

    useEffect(():any => {
        getTodos(userId);
    },[]);

    return(
           <div>
                   <AddTodo/>
            <ul>
                {currentTodos.map((todo: any) => {
                    return (<TodoForm
                        key = {todo.id}
                        todo = {todo}
                        editedTodo = {editedTodo}
                        setEditedTodo = {setEditedTodo}/>)})}
            </ul>
           </div>
    )
};

export default TodosForm;