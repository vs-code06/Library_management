import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ContactUs from "./ContactUs"; 
import BorrowBook from "./BorrowBook";
import ReturnBook from "./ReturnBook";
import ManageBooks from "./ManageBooks";
import "./App.css";

const initialBooksData = [
  {
    name: "Fourth Wing",
    pages: 528,
    description: "A young adult fantasy novel that follows a group of dragon riders in a war-torn world.",
    releaseDate: "2023-05-02",
    isbn: "9781649374042"
  },
  {
    name: "Iron Flame",
    pages: 640,
    description: "The sequel to 'Fourth Wing', continuing the saga of dragon riders and their battles.",
    releaseDate: "2023-11-07",
    isbn: "9781649374172"
  },
  {
    name: "Happy Place",
    pages: 400,
    description: "A romantic comedy about a couple who broke up but pretend to still be together during their annual vacation with friends.",
    releaseDate: "2023-04-25",
    isbn: "9780593441275"
  },
  {
    name: "The Housemaid's Secret",
    pages: 336,
    description: "A psychological thriller about a housemaid who discovers a shocking secret about her employer.",
    releaseDate: "2023-02-20",
    isbn: "9781538742570"
  },
  {
    name: "The Night Watchman",
    pages: 464,
    description: "A historical novel based on true events, following a Native American leader fighting for his people’s rights.",
    releaseDate: "2020-03-03",
    isbn: "9780062671189"
  },
  {
    name: "Lessons in Chemistry",
    pages: 400,
    description: "A heartwarming novel about a female chemist in the 1960s who unexpectedly becomes a TV cooking show host.",
    releaseDate: "2022-04-05",
    isbn: "9780385547345"
  },
  {
    name: "The Midnight Library",
    pages: 304,
    description: "A thought-provoking novel about a woman who explores alternate versions of her life through a magical library.",
    releaseDate: "2020-08-13",
    isbn: "9780525559474"
  },
  {
    name: "A Court of Thorns and Roses",
    pages: 432,
    description: "A fantasy romance about a huntress who is taken to a magical land after killing a faerie wolf.",
    releaseDate: "2015-05-05",
    isbn: "9781619635180"
  },
  {
    name: "The Silent Patient",
    pages: 336,
    description: "A psychological thriller about a woman who stops speaking after committing a shocking act of violence.",
    releaseDate: "2019-02-05",
    isbn: "9781250301697"
  },
  {
    name: "Project Hail Mary",
    pages: 496,
    description: "A sci-fi thriller about a lone astronaut trying to save humanity from an extinction-level event.",
    releaseDate: "2021-05-04",
    isbn: "9780593135204"
  },
  {
    name: "Tomorrow, and Tomorrow, and Tomorrow",
    pages: 416,
    description: "A novel about friendship, creativity, and love, following two game designers through decades of their lives.",
    releaseDate: "2022-07-05",
    isbn: "9780593321201"
  },
  {
    name: "Verity",
    pages: 336,
    description: "A chilling romantic thriller about a struggling writer who discovers a hidden manuscript with disturbing secrets.",
    releaseDate: "2018-12-07",
    isbn: "9781791392796"
  },
  {
    name: "Before We Were Strangers",
    pages: 320,
    description: "A poignant love story about two people who reconnect years after their college romance ended.",
    releaseDate: "2015-08-18",
    isbn: "9781501105777"
  }
];

function App() {
  const [books, setBooks] = useState(initialBooksData);
  const [bookCovers, setBookCovers] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBookCovers = async () => {
      const covers = {};
      for (const book of books) {
        try {
          const response = await fetch(`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`);
          covers[book.isbn] = response.ok ? response.url : "https://via.placeholder.com/150x200?text=No+Cover";
        } catch (error) {
          console.error(`Failed to fetch cover for ISBN: ${book.isbn}`, error);
          covers[book.isbn] = "https://via.placeholder.com/150x200?text=No+Cover";
        }
      }
      setBookCovers(covers);
    };

    fetchBookCovers();
  }, [books]);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="app-container">
      <Sidebar
        onHomeClick={() => setCurrentPage("home")}
        onReturnClick={() => setCurrentPage("return")}
        onManageBooksClick={() => setCurrentPage("manage")}
        onContactUsClick={() => setCurrentPage("contact")} 
      />
      <div className="main-content">
        <Navbar onSearch={handleSearch} />

        {currentPage === "borrow" && selectedBook ? (
          <BorrowBook book={selectedBook} onBack={() => setCurrentPage("home")} onBorrow={(book, userDetails) => {
            setBorrowedBooks([...borrowedBooks, { ...book, ...userDetails }]);
            setSelectedBook(null);
            setCurrentPage("home");
          }} />
        ) : currentPage === "return" ? (
          <ReturnBook borrowedBooks={borrowedBooks} setBorrowedBooks={setBorrowedBooks} onBack={() => setCurrentPage("home")} />
        ) : currentPage === "manage" ? (
          <ManageBooks books={books} setBooks={setBooks} />
        ) : currentPage === "contact" ? (
          <ContactUs />
        ) : (
          <>
            <h2 className="section-title">Available Books</h2>
            <div className="book-list">
              {filteredBooks.map((book) => (
                <div key={book.isbn} className="book-card">
                  {bookCovers[book.isbn] ? (
                    <img
                      src={bookCovers[book.isbn]}
                      alt={`${book.name} cover`}
                      className="book-cover"
                    />
                  ) : (
                    <div className="cover-spinner"></div>
                  )}
                  <div className="book-info">
                    <h3 className="book-title">{book.name}</h3>
                    <p className="book-description">{book.description}</p>
                    <p className="book-pages"><strong>Pages:</strong> {book.pages}</p>
                    <p className="book-release"><strong>Release Date:</strong> {book.releaseDate}</p>
                    <button className="borrow-btn" onClick={() => {
                      setSelectedBook(book);
                      setCurrentPage("borrow");
                    }}>
                      Borrow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
