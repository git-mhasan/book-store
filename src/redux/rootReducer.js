import { combineReducers } from "redux";
import bookReducer from "./booksFeature/reducer";
import filterReducer from "./filterFeature/reducer";

const rootReducer = combineReducers({
    books: bookReducer,
    filters: filterReducer,
});

export default rootReducer;
