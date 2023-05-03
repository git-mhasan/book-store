import { updateBook } from "../action";


const editBookThunk = (book) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:9000/books/${book.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                ...book
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const updatedBook = await response.json();

        dispatch(updateBook(updatedBook));
    };
};

export default editBookThunk;
