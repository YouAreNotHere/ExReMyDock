import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import todos from './todos';
import todoFilters from './todoFilters';
import editedTodoId from './editedTodo';
import todoIdInModal from "./todoInModal";
import currentUsername from "./currentUsername";
import currentTheme from './currentTheme';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const todoApp: any = combineReducers({ editedTodoId, todos, todoFilters, todoIdInModal, currentUsername, currentTheme});
const persistedReducer = persistReducer(persistConfig, todoApp);
export const store = configureStore({ reducer: persistedReducer});

export const persistor = persistStore(store);
