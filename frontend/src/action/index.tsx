export const changeId = (userId: number): any =>{
    return ({
        type: "CHANGE_USER_ID",
        userId,
    })
}