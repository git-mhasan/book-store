import { deleteBook } from "../action";

const deleteBookThunk = (bookId) => {
    return async (dispatch) => {
        await fetch(`http://localhost:9000/books/${bookId}`, {
            method: "DELETE",
        });

        dispatch(deleteBook(bookId));
    };

};

export default deleteBookThunk;