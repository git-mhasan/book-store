import { ADD_BOOK, DELETE_BOOK, GET_BOOKS, UPDATE_BOOK } from "./actionTypes"

// books should be an array of books
export const getBooks = (books) => {
    return {
        type: GET_BOOKS,
        payload: books
    }
}

// book should be a single book object from user form field.
export const addBook = (book) => {
    return {
        type: ADD_BOOK,
        payload: book
    }
}

// book should be updated book object from edit field with id
export const updateBook = (book) => {
    return {
        type: UPDATE_BOOK,
        payload: book
    }
}

export const deleteBook = (id) => {
    return {
        type: DELETE_BOOK,
        payload: id
    }
}