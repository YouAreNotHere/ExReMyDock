// import {getTodosRequest} from "../api/todos.request";
// import {useState} from "react";
// import {user_id} from "../../auth/signin";

const TodosForm = () => {
    // let currentTodos;
    // let todos;
    // const [currentFilter, setCurrentFilter] = useState("SHOW_ALL");
    // const activeTodos = todos.filter(todo => todo.complete === false);
    // const completeTodos = todos.filter(todo => todo.complete === true);
    // const [errorMessage, setErrorMessage] = useState('');
    //
    // if (currentFilter == "SHOW_COMPLETED"){
    //     currentTodos = completeTodos
    // } else if (currentFilter == "SHOW_ACTIVE"){
    //     currentTodos = activeTodos
    // }else {
    //     currentTodos = todos
    // };
    //
    // const getTodos = async (e: any) => {
    //     e.preventDefault();
    //     try {
    //         const response = await getTodosRequest({user_id});
    //
    //         if (!response.ok) {
    //             const error = await response.json();
    //             setErrorMessage(error.message);
    //         }
    //
    //         if (response.ok){
    //             console.log("Тудушки загружены");
    //             todos = JSON.parse(response);
    //             return todos;
    //         }
    //
    //     } catch (error) {
    //         setErrorMessage(JSON.stringify(error));
    //     }
    // };
    //
    // return(
    //     <ul>
    //         {currentTodos.map(todo => <Todo key = {todo.id} todo = {todo}/>)}
    //     </ul>
    // )
}

export default TodosForm;