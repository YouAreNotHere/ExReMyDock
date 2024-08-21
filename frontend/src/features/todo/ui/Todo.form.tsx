import {postTodosRequest} from "../api/todos.request";
import {useState} from "react";

const TodoForm = async (e: any) => {
    // e.preventDefault();
    // try {
    //     const response = await postTodosRequest({id, user_id, text, status})
    //
    //     if (!response.ok) {
    //         const error = await response.json();
    //         setErrorMessage(error.message);
    //     }
    //     if (response.ok){
    //         alert("Авторизация пройдена");
    //         navigate("../../todo");
    //         return <Navigate to="../../todo"/>
    //     }
    //
    // } catch (error) {
    //     setErrorMessage(JSON.stringify(error));
    // }
};

export default TodoForm;