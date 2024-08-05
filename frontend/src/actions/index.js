export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

let nextId = 0;
//Возможно, понадобится заменить на Ref
export const addTodo = (text) => ({
        type: "ADD_TODO",
        id: nextId++,
        text: text,
});

export const editTodo = (text, id) => ({
        type: "EDIT_TODO",
        id: id,
        text: text,
});

export const deleteTodo = (id) => ({
        type: "DELETE_TODO",
        id: id,
});

export const completeTodo = (id) => ({
        type: "COMPLETE_TODO",
        id: id,
});

export const changeCurrentFilter= (filter) =>({
        type: "CHANGE_FILTER",
        filter: filter,
});

export const changeEditedTodoId= (editedTodoId) => ({
        type: "CHANGE_EDITED_TODO_ID",
        editedTodoId: editedTodoId,
});

