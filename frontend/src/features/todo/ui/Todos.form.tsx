import {useState, useEffect} from "react";
import TodoForm from "./Todo.form";
import {useSelector, useDispatch} from "react-redux";
import AddTodo from "./AddTodo.form";
import useGetTodos from "./useGetTodos";
import {loadTodos} from "../../../actions";

const TodosForm = () => {
    const [editedTodo, setEditedTodo] = useState("");
    const [currentFilter, setCurrentFilter] = useState("SHOW_ALL");
    // const activeTodos = todos.filter(todo => todo.complete === false);
    // const completeTodos = todos.filter(todo => todo.complete === true);
    const dispatch: any = useDispatch();
    const todos = useSelector((state: any) => state.todos);
    const userId = useSelector((state: any) => state.userId);

    const getTodos: any = useGetTodos();

    // if (currentFilter == "SHOW_COMPLETED"){
    //     currentTodos = completeTodos
    // } else if (currentFilter == "SHOW_ACTIVE"){
    //     currentTodos = activeTodos
    // }else {
    //     currentTodos = todos
    // };

    useEffect(():any => {
        getTodos(userId);
    },[todos]);


    return(
           <div>
                   <AddTodo/>
            <ul>
                {todos.map((todo: any) => {
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