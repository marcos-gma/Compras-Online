import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Importando o arquivo CSS

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-logo">
          <Link to="/">Online Shopping</Link>
        </h1>
        <nav>
          <ul className="header-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;