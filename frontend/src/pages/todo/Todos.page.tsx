import React from "react";
import {FormLayout, FilterLayout} from "../../shared/layouts/FormLayout";
import TodosForm from "../../features/todo/ui/Todos.form";
import FilterBar from "../../features/todo/ui/FilterBar.form";

import {useRequest} from "../../shared/hooks/useRequest";
import {useNavigate} from "react-router-dom";

const TodosPage = () => {

    // стоит убрать логику логаута из TodosPage куда-нибудь в shared, например, ибо эта логика не относится к todos
    const navigate = useNavigate();
    const onLogoutSuccess = () => {
        navigate('/auth');
    };

    const {
        isLoading,
        errorMessage,
        makeRequest: logoutRequest,
    } = useRequest({method: 'POST', url: '/auth/logout', onSuccess: onLogoutSuccess});

    return(  <>
        <button onClick={logoutRequest}>{isLoading ? 'loading...' : 'logout'}</button>
        {errorMessage && <p>{errorMessage}</p>}
        <TodosForm/>
        <FilterLayout/>
      </>
    )
};

export default TodosPage;