const currentUsername = (state: string | null = null, action: {[key: string]: string}) =>{
    switch (action.type) {
        case 'CHANGE_CURRENT_USERNAME':
            return action.username
        default:
            return state;
    }
}

export default currentUsername;