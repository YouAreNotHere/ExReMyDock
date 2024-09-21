import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTodosRequest} from "../api/todos.request";
import {loadTodos} from "../../../actions";

const useGetTodos =  () => {
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch: any = useDispatch();
    const todos = useSelector((state: any) => state.todos);

    return async (userId: any) => {
        try {
            const response: any = await getTodosRequest({userId});
            const data = await response.json();

            if (!response.ok) {
                console.log("Тудушки не загружены")
                const error = await response.json();
                setErrorMessage(error.message);
            }else{
                console.log("Тудушки загружены");
                const newTodos: any = data.map((todo: any): any =>
                    todo.complete === 0 ? {...todo, completed: true} : {...todo, completed: false}
                )
                const newTodosMoreTodos = JSON.stringify(todos).length < JSON.stringify(newTodos).length;
                console.log("Новых тудушек больше? " + newTodosMoreTodos);
                if (newTodosMoreTodos){
                    console.log("Отправляем в состояние новые тудушки")
                    dispatch(loadTodos(newTodos));
                }
            }
        } catch (error) {
            setErrorMessage(JSON.stringify(error));
        }
    }
};

export default useGetTodos;