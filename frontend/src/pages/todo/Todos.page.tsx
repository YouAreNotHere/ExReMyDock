import React from "react";
import {FormLayout} from "../../shared/layouts/FormLayout";
import TodosForm from "../../features/todo/ui/Todos.form";

const TodosPage = () =>{
    return(
        <FormLayout>
            <TodosForm/>
        </FormLayout>
    )
};

export default TodosPage;