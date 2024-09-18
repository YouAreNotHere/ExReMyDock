import {getTodosRequest} from "../api/todos.request";
import {useState, useEffect} from "react";
import TodoForm from "./Todo.form";
import {useSelector, useDispatch} from "react-redux";
import AddTodo from "./AddTodo.form";
import {addTodo, loadTodos} from "../../../actions";


const TodosForm = () => {
    const [editedTodo, setEditedTodo] = useState("");
    const [currentFilter, setCurrentFilter] = useState("SHOW_ALL");
    // const activeTodos = todos.filter(todo => todo.complete === false);
    // const completeTodos = todos.filter(todo => todo.complete === true);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch: any = useDispatch();
    const userId = useSelector((state: any) => state.userId);
    const todos = useSelector((state: any) => state.todos);


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
                console.log("Тудушки не загружены")
                const error = await response.json();
                setErrorMessage(error.message);
            }else{
                console.log("Тудушки загружены");
                const todos = data.map((todo: any): any =>
                    todo.complete == 0 ? {...todo, completed: true} : {...todo, completed: false}
                )
                console.log(todos);
                dispatch(loadTodos(todos));
                return data;
            }

        } catch (error) {
            setErrorMessage(JSON.stringify(error));
        }
    };

    useEffect(():any => {
        getTodos(userId);
    },[]);
    //console.log("todos = " + todos);

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