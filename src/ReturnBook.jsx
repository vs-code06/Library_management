import React, { useState } from "react";
import "./ReturnBook.css";

function ReturnBook({ borrowedBooks, setBorrowedBooks, onBack }) {
  const [returnForm, setReturnForm] = useState({ show: false, isbn: "", name: "", returnDate: "" });

  const handleReturnClick = (isbn) => {
    setReturnForm({ show: true, isbn, name: "", returnDate: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!returnForm.name || !returnForm.returnDate) {
      alert("Please fill in all details.");
      return;
    }

    setBorrowedBooks(borrowedBooks.filter(book => book.isbn !== returnForm.isbn));
    setReturnForm({ show: false, isbn: "", name: "", returnDate: "" });
  };

  return (
    <div className="return-container">
      <h2 className="return-title">Return Books</h2>
      {borrowedBooks.length === 0 ? (
        <p className="no-books">No books borrowed.</p>
      ) : (
        <ul className="return-list">
          {borrowedBooks.map((book) => (
            <li key={book.isbn} className="return-item">
              <div className="return-info">
                <p className="return-book-name"><strong>{book.name}</strong></p>
                <p className="return-user"><em>Borrowed by {book.name} ({book.email})</em></p>
              </div>
              <button className="return-button" onClick={() => handleReturnClick(book.isbn)}>Return</button>
            </li>
          ))}
        </ul>
      )}
      <button className="back-button-2" onClick={onBack}>Back</button>

      {/* Return Form as a Card */}
      {returnForm.show && (
        <div className="return-form-overlay">
          <div className="return-form">
            <h3>Return Book</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={returnForm.name}
                  onChange={(e) => setReturnForm({ ...returnForm, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Return Date:
                <input
                  type="date"
                  value={returnForm.returnDate}
                  onChange={(e) => setReturnForm({ ...returnForm, returnDate: e.target.value })}
                  required
                />
              </label>
              <div className="return-form-buttons">
                <button type="submit" className="confirm-return">Confirm</button>
                <button type="button" className="cancel-return" onClick={() => setReturnForm({ show: false, isbn: "", name: "", returnDate: "" })}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReturnBook;
