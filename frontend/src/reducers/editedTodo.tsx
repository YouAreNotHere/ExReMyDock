const editedTodoId = (state = null, action: { [key: string]: string }) => {
  switch (action.type) {
    case 'CHANGE_EDITED_TODO_ID':
      return action.editedTodoId;
    default:
      return state;
  }
};

export default editedTodoId;
