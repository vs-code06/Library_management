import React, { useState } from "react";
import "./ManageBooks.css";

const ManageBooks = ({ books, setBooks }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedBook, setEditedBook] = useState({});

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedBook(books[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const handleSaveClick = (index) => {
    const updatedBooks = [...books];
    updatedBooks[index] = editedBook;
    setBooks(updatedBooks);
    setEditingIndex(null);
  };

  const handleDeleteClick = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  return (
    <div className="manage-books">
      <h2>Manage Books</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Pages</th>
            <th>Description</th>
            <th>Release Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td><input type="text" name="name" value={editedBook.name} onChange={handleChange} /></td>
                  <td><input type="number" name="pages" value={editedBook.pages} onChange={handleChange} /></td>
                  <td><input type="text" name="description" value={editedBook.description} onChange={handleChange} /></td>
                  <td><input type="date" name="releaseDate" value={editedBook.releaseDate} onChange={handleChange} /></td>
                  <td>
                    <button onClick={() => handleSaveClick(index)}>💾 Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{book.name}</td>
                  <td>{book.pages}</td>
                  <td>{book.description}</td>
                  <td>{book.releaseDate}</td>
                  <td>
                    <button className="button-3"onClick={() => handleEditClick(index)}>Edit</button>
                    <button className="button-4" onClick={() => handleDeleteClick(index)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;