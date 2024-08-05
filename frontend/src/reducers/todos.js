const todos = (state = [], action) =>{
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
        case "EDIT_TODO":
            return state.map(todo=>{
                if (todo.id !== action.id){
                    return todo
                }else{
                    return {...todo, text : action.text,}
                }
            })
        case "COMPLETE_TODO":
            return state.map(todo =>
            todo.id === action.id ? {...todo, complete: !todo.complete} : todo)
        case "DELETE_TODO":
            return state.filter(todo => todo.id !==action.id);
        default:
            return state
    }
};
export default todos;