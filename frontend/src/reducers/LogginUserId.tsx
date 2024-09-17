const userId = (state: any = null, action: any) => {
    if (!action.userId){
        return null
    }
    switch (action.type){
        case "CHANGE_USER_ID":
            return action.userId
    }
}

export default userId;