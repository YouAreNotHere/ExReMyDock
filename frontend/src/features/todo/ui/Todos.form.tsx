import {getTodosRequest} from "../api/todos.request";
import {useState, useEffect} from "react";
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

    const [todos, setTodos ] = useState<any>([]);

    // if (currentFilter == "SHOW_COMPLETED"){
    //     currentTodos = completeTodos
    // } else if (currentFilter == "SHOW_ACTIVE"){
    //     currentTodos = activeTodos
    // }else {
    //     currentTodos = todos
    // };

    const getTodos = async (userId: any) => {

        try {
            const response: any = await getTodosRequest({userId});
            const data = await response.json();

            if (!response.ok) {
                console.log("Какая-то хуйня")
                const error = await response.json();
                setErrorMessage(error.message);
            }else{
                console.log("Тудушки загружены");
                setTodos(data)
                return data;
            }

        } catch (error) {
            setErrorMessage(JSON.stringify(error));
        }
    };

    useEffect(():any => {
        getTodos(userId);
    },[]);

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