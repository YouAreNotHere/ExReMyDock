import { VisibilityFilters } from '../actions/index';

const todoFilters = (
  state = VisibilityFilters.SHOW_ALL,
  action: { [key: string]: string },
) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default todoFilters;
