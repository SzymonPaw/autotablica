import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Strona główna</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
