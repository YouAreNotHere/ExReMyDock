import {useState, useEffect} from "react";
import TodoForm from "./Todo.form";
import {useSelector, useDispatch} from "react-redux";
import AddTodo from "./AddTodo.form";
import {loadTodos} from "../../../actions";
import {useRequest} from "../../../shared/hooks/useRequest";

const TodosForm = () => {
    const [editedTodo, setEditedTodo] = useState("");
    const [currentFilter, setCurrentFilter] = useState("SHOW_ALL");
    // const activeTodos = todos.filter(todo => todo.complete === false);
    // const completeTodos = todos.filter(todo => todo.complete === true);
    const dispatch: any = useDispatch();
    const todos = useSelector((state: any) => state.todos);
    const userId = useSelector((state: any) => state.userId);

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
