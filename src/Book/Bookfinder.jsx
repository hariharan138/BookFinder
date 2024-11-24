import React, { useState } from 'react'
import './bookstyle.css'

export default function BookFinder() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    setLoading(true);
    setBooks([]);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`);
      const data = await response.json();
      setBooks(data.docs);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchBooks();
    }
  };

  return (
    <div className="container">
      <h1 className="title">Book Finder</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          Search
        </button>
      </form>

      {loading && (
        <div className="loading">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loading-icon"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
        </div>
      )}

      <div className="book-grid">
        {books.map((book, index) => (
          <div key={`${book.key}-${index}`} className="book-card">
            <h2 className="book-title">{book.title}</h2>
            <div className="book-cover">
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                onError={(e) => {
                  e.target.src = '/placeholder.svg?height=300&width=200';
                }}
              />
            </div>
            <p className="book-author">
              Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}
            </p>
            <p className="book-year">
              First Published: {book.first_publish_year || 'Unknown'}
            </p>
          </div>
        ))}
      </div>

      {books.length === 0 && !loading && (
        <p className="results-count">No results found</p>
      )}
    </div>
  );
}
