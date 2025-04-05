import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Library Management</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>
      <div className="profile-section">
        <span className="notification">🔔</span>
        <div className="profile">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile"
          />
          <span>Vipul Sharma</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
