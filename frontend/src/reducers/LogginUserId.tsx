const userId = (state: any = null, action: any) => {
  switch (action.type) {
    case 'CHANGE_USER_ID':
      return action.userId;
    default:
      return state;
  }
};

export default userId;
