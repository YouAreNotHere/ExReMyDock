import React from "react";
import {FormLayout} from "../../shared/layouts/FormLayout";
import TodoForm from "../../features/todo/ui/Todo.form";

const TodosPage = () =>{
    return(
        <FormLayout>
            <TodoForm/>
        </FormLayout>
    )
};

export default TodosPage;