import { ADD_BOOK, DELETE_BOOK, GET_BOOKS, UPDATE_BOOK } from "./actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKS:
            return action.payload;

        case ADD_BOOK:
            return [...state, action.payload];

        case UPDATE_BOOK:
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            })
        case DELETE_BOOK:
            return state.filter(item => item.id !== action.payload);

        default:
            return state;
    }
}

export default reducer;