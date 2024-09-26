import {useState, useEffect} from "react";
import TodoForm from "./Todo.form";
import {useSelector, useDispatch} from "react-redux";
import AddTodo from "./AddTodo.form";
import {useRequest} from "../../../shared/hooks/useRequest";
import { loadTodos } from "../../../actions";

const TodosForm = () => {
    const [editedTodo, setEditedTodo] = useState("");
    const dispatch: any = useDispatch();
    const todos = useSelector((state: any) => state.todos);
    const userId = useSelector((state: any) => state.userId);
    const activeTodos = todos.filter((todo: any) => todo.completed === false);
    const completeTodos = todos.filter((todo: any) => todo.completed === true);
    const currentFilter = useSelector((state: any) => state.todoFilters);
    let currentTodos: any = [];

    if (currentFilter == "SHOW_COMPLETED"){
        currentTodos = completeTodos;
    } else if (currentFilter == "SHOW_ACTIVE"){
        currentTodos = activeTodos;
    }else {
        currentTodos = todos;
    };

    const setTodosToState = (todos: any) => {
        console.log("Тудушки загружены");
        const newTodos: any = data.map((todo: any): any =>
          todo.completed === 0 ? {...todo, completed: true} : {...todo, completed: false}
        )
        const newTodosMoreTodos = JSON.stringify(todos).length < JSON.stringify(newTodos).length;
        console.log(newTodos);
        //console.log("Новых тудушек больше? " + newTodosMoreTodos);
        if (newTodosMoreTodos){
          //console.log("Отправляем в состояние новые тудушки")
          dispatch(loadTodos(newTodos));
        }
      }

      const {
        data,
        isLoading,
        errorMessage,
        makeRequest: getTodos
      } = useRequest({method: 'GET', url: '/todos/getTodos', onSuccess: setTodosToState});
  
      useEffect(():any => {
          getTodos();
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