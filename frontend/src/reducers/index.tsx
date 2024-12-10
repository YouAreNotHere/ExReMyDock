import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import todos from './todos';
import todoFilters from './todoFilters';
import editedTodoId from './editedTodo';
import todoIdInModal from "./todoInModal";
import currentUser from "./currentUser";
import isDarkMode from './isDarkMode';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const todoApp: any = combineReducers({ editedTodoId, todos, todoFilters, todoIdInModal, currentUser, isDarkMode});
const persistedReducer = persistReducer(persistConfig, todoApp);
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       } // Временно отключаем проверку
//     }),});
export const store = configureStore({ reducer: persistedReducer});
export const persistor = persistStore(store);
