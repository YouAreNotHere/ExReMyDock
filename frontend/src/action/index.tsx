export const changeId = (userId: any): any =>{
    return ({
        type: "CHANGE_USER_ID",
        userId: userId.userId,
    })
}