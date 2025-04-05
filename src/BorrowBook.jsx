import React, { useState } from "react";
import "./BorrowBook.css";

function BorrowBook({ book, onBack, onBorrow }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    days: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBorrow(book, formData);
    alert(`Book "${book.name}" borrowed successfully!`);
  };

  const bookCoverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;

  return (
    <div className="borrow-container">
      <img src={bookCoverUrl} alt={book.name} className="book-image" onError={(e) => e.target.style.display = 'none'} />
      <div className="borrow-details">
        <h2>Borrow: {book.name}</h2>
        <p>{book.description}</p>
        <p><strong>Pages:</strong> {book.pages}</p>
        <p><strong>Release Date:</strong> {book.releaseDate}</p>

        <form onSubmit={handleSubmit} className="borrow-form">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="studentId" placeholder="Student ID" value={formData.studentId} onChange={handleChange} required />
          <input type="number" name="days" placeholder="Number of Days" value={formData.days} onChange={handleChange} required />

          <div className="button-group">
            <button type="submit" className="confirm-button">Confirm Borrow</button>
            <button type="button" className="back-button" onClick={onBack}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BorrowBook;