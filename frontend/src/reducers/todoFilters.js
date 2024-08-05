import {VisibilityFilters} from "../actions";

const todoFilters = (state = VisibilityFilters.SHOW_ALL, action) =>{
    switch (action.type) {
        case "CHANGE_FILTER":
            return action.filter
        default:
            return state
    }
}

export default todoFilters;