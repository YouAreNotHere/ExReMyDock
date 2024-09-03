import {getTodosRequest} from "../api/todos.request";
import {useState} from "react";
import TodoForm from "./Todo.form";
import {useSelector} from "react-redux";
import AddTodo from "./AddTodo.form";


const TodosForm = () => {
    const [editedTodo, setEditedTodo] = useState("");
    const [currentFilter, setCurrentFilter] = useState("SHOW_ALL");
    // const activeTodos = todos.filter(todo => todo.complete === false);
    // const completeTodos = todos.filter(todo => todo.complete === true);
    const [errorMessage, setErrorMessage] = useState('');
    const userId = useSelector((state: any) => state.userId);

    // if (currentFilter == "SHOW_COMPLETED"){
    //     currentTodos = completeTodos
    // } else if (currentFilter == "SHOW_ACTIVE"){
    //     currentTodos = activeTodos
    // }else {
    //     currentTodos = todos
    // };

    const getTodos = async (e: any) => {
        try {
            const response: any = await getTodosRequest({userId});

            if (!response.ok) {
                console.log("Какая-то хуйня")
                const error = await response.json();
                setErrorMessage(error.message);
            }else{
                console.log("Тудушки загружены");
                todos = await response.json();
                return todos;
            }

        } catch (error) {
            setErrorMessage(JSON.stringify(error));
        }
    };
    let todos: any = getTodos(userId);

    //console.log(todos);

    return(
           <div>
               <div>
                   <AddTodo/>
               </div>
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