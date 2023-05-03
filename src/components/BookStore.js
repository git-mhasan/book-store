import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchBooks from '../redux/booksFeature/thunk/fetchBooks';
import { applyFilter } from '../redux/filterFeature/action';
import BookCard from './BookCard';
import BookEntryForm from './BookEntryForm';
import NavigatinBar from './NavigatinBar';


const BookStore = () => {
    const dispatch = useDispatch();
    const bookStore = useSelector(state => state);
    const [searchText, setSearchText] = useState("");
    const { books, filters } = bookStore;
    const [editId, setEditId] = useState("");

    useEffect(() => {
        dispatch(fetchBooks);
    }, [dispatch]);

    const handleFilter = (filter) => {
        dispatch(applyFilter(filter));
    }

    return (
        <div>
            <NavigatinBar setSearchText={setSearchText} searchText={searchText} />

            <main className="py-12 2xl:px-6">
                <div className="container grid xl:grid-cols-[auto_350px] 2xl:grid-cols-[auto_400px] gap-4 2xl:gap-8">
                    <div className="order-2 xl:-order-1">
                        <div className="flex items-center justify-between mb-12">
                            <h4 className="mt-2 text-xl font-bold">Book List</h4>

                            <div className="flex items-center space-x-4">
                                <button className={`filter-btn ${filters.filter === "all" && "active-filter"}`} id="lws-filterAll" onClick={() => handleFilter("all")}>All</button>
                                <button className={`filter-btn ${filters.filter === "featured" && "active-filter"}`} id="lws-filterFeatured" onClick={() => handleFilter("featured")} >Featured</button>
                            </div>
                        </div>
                        <div className="lws-bookContainer">

                            {books
                                .filter(book => {
                                    if (searchText.length < 1) {
                                        return true
                                    } else {
                                        return book.name.toLowerCase().includes(searchText);
                                    }
                                })
                                .filter(book => {
                                    if (filters.filter === "featured") {
                                        return book.featured;
                                    } else {
                                        return true
                                    }
                                })
                                .map(book => <BookCard key={book.id} book={book} setEditId={setEditId}></BookCard>)}

                        </div>
                    </div>
                    <div>
                        <BookEntryForm setEditId={setEditId} editId={editId}></BookEntryForm>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookStore;