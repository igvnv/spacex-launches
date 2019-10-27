import React from 'react';
import { NavLink } from 'react-router-dom';

function MainMenu() {
  return (
    <nav className="navigation">
      <ul className="main-menu">
        <li className="main-menu__item">
          <NavLink className="main-menu__link" activeClassName="main-menu__link_active" exact to="/">Launches</NavLink>
        </li>
        <li className="main-menu__item">
          <NavLink className="main-menu__link" activeClassName="main-menu__link_active" to="/about/company/">About company</NavLink>
        </li>
        <li className="main-menu__item">
          <NavLink className="main-menu__link" activeClassName="main-menu__link_active" to="/catalog/">Catalog</NavLink>
        </li>
        <li className="main-menu__item">
          <NavLink className="main-menu__link" activeClassName="main-menu__link_active" to="/about/project/">About project</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainMenu;