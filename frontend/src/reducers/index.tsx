import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
// import todos from "./todos"
// import todoFilters from "./todoFilters"
// import editedTodoId from "./editedTodoId";

const user_id = (state: any = null, action: any) => {
    return action
}
const todoApp = combineReducers({user_id});
const store = configureStore({reducer: todoApp, });

export default store;