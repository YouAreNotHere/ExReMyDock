import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import todos from "./todos"
import todoFilters from "./todoFilters"
import editedTodoId from "./editedTodo";
import userId from "./LogginUserId";


const todoApp = combineReducers({userId, editedTodoId, todos, todoFilters});
const store = configureStore({reducer: todoApp, });

export default store;