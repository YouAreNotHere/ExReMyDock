import React from "react";
import {FormLayout, FilterLayout} from "../../shared/layouts/FormLayout";
import TodosForm from "../../features/todo/ui/Todos.form";
import FilterBar from "../../features/todo/ui/FilterBar.form";

const TodosPage = () =>{
    return(
        <>
            <FormLayout>
                <TodosForm/>
            </FormLayout>
            <FilterLayout>
                <FilterBar/>
            </FilterLayout>
        </>

    )
};

export default TodosPage;