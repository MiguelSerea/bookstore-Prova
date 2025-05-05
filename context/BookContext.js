import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([
    {
      id: '1',
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      year: '1997',
      genre: 'fantasy',
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      year: '1949',
      genre: 'scifiction',
    },
  ]);

  function addBook({ title, author, year, genre }) {
    setBooks(prev => [
      ...prev,
      {
        id: String(Date.now()),
        title,
        author,
        year,
        genre,
      },
    ]);
  }

  function deleteBook(bookId) {
    setBooks(prev => prev.filter(book => book.id !== bookId));
  }

  // Caso queira usar edição futuramente:
  function editBook(editedBook) {
    setBooks(prev => prev.map(book =>
      book.id === editedBook.id ? { ...editedBook } : book
    ));
  }

  return (
    <BookContext.Provider value={{ books, addBook, deleteBook, editBook }}>
      {children}
    </BookContext.Provider>
  );
}