const isDarkMode = (state: boolean = false, action: {[key: string]: string}) =>{
  switch (action.type) {
    case 'CHANGE_CURRENT_THEME':
      return action.isDarkMode
    default:
      return state;
  }
}

export default isDarkMode;