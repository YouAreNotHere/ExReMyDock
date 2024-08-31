import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
// import todos from "./todos"
// import todoFilters from "./todoFilters"
// import editedTodoId from "./editedTodoId";

const userId = (state: any = null, action: any) => {
    if (!action.user){
        return null
    }
    switch (action.type){
        case "CHANGE_USER_ID":
            return action.userId
    }
}
const todoApp = combineReducers({userId});
const store = configureStore({reducer: todoApp, });

export default store;