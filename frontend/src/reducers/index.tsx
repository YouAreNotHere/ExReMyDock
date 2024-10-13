import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import todos from './todos';
import todoFilters from './todoFilters';
import editedTodoId from './editedTodo';

const todoApp = combineReducers({ editedTodoId, todos, todoFilters });
const store = configureStore({ reducer: todoApp });

export default store;
