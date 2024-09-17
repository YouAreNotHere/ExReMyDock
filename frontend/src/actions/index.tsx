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

let nextId = 0;

export const addTodo = (text: string) => ({
    type: "ADD_TODO",
    id: nextId++,
    text: text,
});

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

export const changeCurrentFilter= (filter: any) =>({
    type: "CHANGE_FILTER",
    filter: filter,
});

export const changeEditedTodoId= (editedTodoId: number | null) => ({
    type: "CHANGE_EDITED_TODO_ID",
    editedTodoId: editedTodoId,
});
