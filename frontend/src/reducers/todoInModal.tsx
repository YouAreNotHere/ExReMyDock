
const todoIdInModal = (state = null, action: { [key: string]: string }) => {
    switch (action.type) {
        case 'CHANGE_TODO_ID_IN_MODAL':
            return action.todoIdInModal;
        default:
            return state;
    }
};

export default todoIdInModal;
