import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export const MainMenu = ({ history }) => {
  const [displayMenu, setDisplayMenu] = useState(false);

  // Closes the menu when location has been changed
  useEffect(() => history.listen(() => {
    setDisplayMenu(false);
  }));

  return (
    <nav>
      <button
        className={`burger-button ${displayMenu ? 'burger-button_open' : ''}`}
        type="button"
        aria-label="Open menu"
        onClick={() => setDisplayMenu(!displayMenu)}
      >
        <span className="burger-button__helper" />
      </button>
      <ul className={`main-menu ${displayMenu ? 'main-menu_open' : ''}`}>
        <li className="main-menu__item">
          <NavLink className="main-menu__link" activeClassName="main-menu__link_active" exact to="/">Launches</NavLink>
        </li>
        <li className="main-menu__item">
          <NavLink className="main-menu__link" activeClassName="main-menu__link_active" to="/catalog/">Catalog</NavLink>
        </li>
        <li className="main-menu__item">
          <NavLink className="main-menu__link" activeClassName="main-menu__link_active" to="/about/company/">About SpaceX</NavLink>
        </li>
        <li className="main-menu__item">
          <NavLink className="main-menu__link" activeClassName="main-menu__link_active" to="/about/project/">About project</NavLink>
        </li>
      </ul>
    </nav>
  );
};
MainMenu.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(MainMenu);
