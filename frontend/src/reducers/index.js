import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import todos from "./todos"
import todoFilters from "./todoFilters"
import editedTodoId from "./editedTodoId";

const preloadedState = {
    currentFilter : "ShowAll",
    editedTodoId: null,
    todos : [
        {
            id : 0,
            text : "Add some todos!",
            complete : false,
            PIZDA_BLYAT: 1,
        },
    ],
};

const todoApp = combineReducers({editedTodoId, todos, todoFilters});

const store = configureStore({reducer: todoApp, }); //preloadedState

// const store = configureStore({
//     reducer: {
//         todos: todos,
//         editedTodoId: editedTodoId,
//         todoFilters: todoFilters,
//     }
// });

export default store;
