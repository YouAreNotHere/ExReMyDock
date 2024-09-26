//Допилить actions errorMessege, isLoading, чтобы было 3 вида экшона на бэк.

export const changeId = (userId: any): any =>{
    return ({
        type: "CHANGE_USER_ID",
        userId: userId.userId,
    })
};

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const changeCurrentFilter = (filter: string) =>({
    type: "CHANGE_FILTER",
    filter: filter,
});

let nextId = 0;

// export const addTodo = (text: string) => ({
//     type: "ADD_TODO",
//     id: nextId++,
//     text: text,
// });

export const loadTodos = (todos: any) => ({
    type: "LOAD_TODOS",
    todos: todos,
})

export const loadCurrentTodos = (currentTodos: any) => ({
    type: "LOAD_CURRENT_TODOS",
    currentTodos: currentTodos,
})

export const editTodo = (text: string, id: number) => ({
    type: "EDIT_TODO",
    id: id,
    text: text,
});

export const deleteTodo = (id: number) => ({
    type: "DELETE_TODO",
    id: id,
});

export const completeTodo = (id: number) => ({
    type: "COMPLETE_TODO",
    id: id,
});

export const changeEditedTodoId= (editedTodoId: number | null) => ({
    type: "CHANGE_EDITED_TODO_ID",
    editedTodoId: editedTodoId,
});