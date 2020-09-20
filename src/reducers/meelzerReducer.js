export const initialState = {
    search: null
}

export const url = "https://meelzer.herokuapp.com"

export const meelzerReducer = (state, action) => {
    switch (action.type) {
        case "SET_FILTER":
            return {
                ...state,
                search: action.search
            };
        case "RESET_FILTERS":
            return {
                ...state,
                search: initialState.search
            };
        default:
            return state;
    }
}