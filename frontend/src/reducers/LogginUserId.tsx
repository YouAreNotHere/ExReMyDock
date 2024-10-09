const userId = (state: any = null, action: { [key: string]: string }) => {
  switch (action.type) {
    case 'CHANGE_USER_ID':
      return action.userId;
    default:
      return state;
  }
};

export default userId;
