import React from 'react';
import TodosForm from '../../features/todo/ui/Todos.form';
import FilterBar from '@/features/todo/ui/FilterBar/FilterBar.form';
import SearchInput from '@/features/todo/ui/search/SearchInput';
import {useNavigate} from 'react-router-dom';
import {useRequest} from '../../shared/hooks/useRequest';
import '../../app/App.scss'

interface TodosPageProps {
    ref?: any
}

const TodosPage = ({ref}: TodosPageProps) => {

    return (
        <TodosForm/>
    );
};

export default TodosPage;
