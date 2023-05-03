import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addBookThunk from '../redux/booksFeature/thunk/addBookThunk';
import editBookThunk from '../redux/booksFeature/thunk/editBookThunk';

const BookEntryForm = ({ editId, setEditId }) => {
    const books = useSelector(state => state.books)
    const dispatch = useDispatch();

    const [bookEntry, setBookEntry] = useState({
        name: "",
        author: "",
        thumbnail: "",
        price: "",
        rating: "",
        featured: false
    });

    useEffect(() => {
        if (editId) {
            const editBook = books.find(x => x.id === editId);
            setBookEntry({
                name: editBook.name,
                author: editBook.author,
                thumbnail: editBook.thumbnail,
                price: editBook.price,
                rating: editBook.rating,
                featured: editBook.featured
            });
        }
    }, [editId]);


    const nextTodoId = (books) => {
        const maxId = books.reduce((maxId, book) => Math.max(book.id, maxId), -1);
        return maxId + 1;
    };

    const handleInput = (event) => {
        if (event.target.type === "checkbox") {
            setBookEntry({ ...bookEntry, [event.target.name]: event.target.checked });
        } else {
            setBookEntry({ ...bookEntry, [event.target.name]: event.target.value });
        }
    }


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const isEmpty = Object.values(bookEntry).some(x => x === null || x === '');
        if (!isEmpty) {
            if (bookEntry.rating > 0 && bookEntry.rating < 6) {
                if (bookEntry.price > 0) {

                    dispatch(addBookThunk({
                        ...bookEntry,
                        id: nextTodoId(books)
                    }));

                    setBookEntry({
                        name: "",
                        author: "",
                        thumbnail: "",
                        price: "",
                        rating: "",
                        featured: false
                    });

                } else {
                    alert("Price should be a positive number.");
                }
            } else {
                alert("Rating should be in 1 to 5");
            }
        }
        else {
            alert("Please fillup all the value!");
        }
    }

    const handleUpdateBook = (event) => {
        event.preventDefault();
        const isEmpty = Object.values(bookEntry).some(x => x === null || x === '');
        if (!isEmpty) {
            if (bookEntry.rating > 0 && bookEntry.rating < 6) {
                if (bookEntry.price > 0) {
                    dispatch(editBookThunk({
                        ...bookEntry,
                        id: editId
                    }))
                    setEditId("");
                    setBookEntry({
                        name: "",
                        author: "",
                        thumbnail: "",
                        price: "",
                        rating: "",
                        featured: false
                    });
                } else {
                    alert("Price should be a positive number.");
                }
            } else {
                alert("Rating should be in 1 to 5");
            }
        }
        else {
            alert("Please fillup all the value!");
        }
    }


    return (
        <div className="p-4 overflow-hidden bg-white shadow-cardShadow rounded-md">
            <h4 className="mb-8 text-xl font-bold text-center">{editId ? "Update a Book" : "Add New Book"}</h4>
            <form className="book-form">
                <div className="space-y-2">
                    <label htmlFor="name">Book Name</label>
                    <input required className="text-input" type="text" id="input-Bookname" name="name"
                        value={bookEntry.name} onChange={handleInput} />
                </div>

                <div className="space-y-2">
                    <label htmlFor="category">Author</label>
                    <input required className="text-input" type="text" id="input-Bookauthor" name="author"
                        value={bookEntry.author} onChange={handleInput} />
                </div>

                <div className="space-y-2">
                    <label htmlFor="image">Image Url</label>
                    <input required className="text-input" type="text" id="input-Bookthumbnail" name="thumbnail"
                        value={bookEntry.thumbnail} onChange={handleInput} />
                </div>

                <div className="grid grid-cols-2 gap-8 pb-4">
                    <div className="space-y-2">
                        <label htmlFor="price">Price</label>
                        <input required className="text-input" type="number" id="input-Bookprice" name="price"
                            value={bookEntry.price} onChange={handleInput} />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="quantity">Rating</label>
                        <input required className="text-input" type="number" id="input-Bookrating" name="rating" min="1" max="5"
                            value={bookEntry.rating} onChange={handleInput} />
                    </div>
                </div>

                <div className="flex items-center">
                    <input id="input-Bookfeatured" type="checkbox" name="featured" className="w-4 h-4"
                        checked={bookEntry.featured} onChange={handleInput} />
                    <label htmlFor="featured" className="ml-2 text-sm"> This is a featured book </label>
                </div>
                {editId ?
                    <button type="submit" className="submit" id="submit" onClick={handleUpdateBook}>Update Book</button>
                    : <button type="submit" className="submit" id="submit" onClick={handleFormSubmit}>Add Book</button>
                }
            </form>
        </div>
    );
};

export default BookEntryForm;