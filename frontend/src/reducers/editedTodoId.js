const editedTodoId = (state = null, action) =>{
    switch (action.type) {
        case "CHANGE_EDITED_TODO_ID":
            return action.editedTodoId
        default:
            return state
    }
}

export default editedTodoId;