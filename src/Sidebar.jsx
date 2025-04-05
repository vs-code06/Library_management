import React from "react";
import "./Sidebar.css";

const Sidebar = ({ onHomeClick, onReturnClick, onManageBooksClick, onContactUsClick }) => {
  return (
    <aside className="sidebar">
      <ul>
        <li className="sidebar-item" onClick={onHomeClick}>🏠 Home</li>
        <li className="sidebar-item" onClick={onReturnClick}>🔄 Return Books</li>
        <li className="sidebar-item" onClick={onManageBooksClick}>📚 Manage Library</li>
        <li className="sidebar-item" onClick={onContactUsClick}>📞 Contact Us</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
