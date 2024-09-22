const todos = (state: any = [], action: any) =>{
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    complete : false,
                }
            ]
        case "LOAD_TODOS":
            return action.todos
        case "LOAD_CURRENT_TODOS":
            return action.currentTodos
        case "EDIT_TODO":
            return state.map((todo: any)=>{
                if (todo.id !== action.id){
                    return todo
                }else{
                    return {...todo, text : action.text,}
                }
            })
        case "COMPLETE_TODO":
            return state.map((todo: any) =>
                todo.id === action.id ? {...todo, completed: !todo.completed} : todo)
        case "DELETE_TODO":
            return state.filter((todo: any) => todo.id !== action.id);
        default:
            return state
    }
};
export default todos;