const currentTheme = (state: boolean = false, action: {[key: string]: string}) =>{
  switch (action.type) {
    case 'CHANGE_CURRENT_THEME':
      return action.isDark
    default:
      return state;
  }
}

export default currentTheme;