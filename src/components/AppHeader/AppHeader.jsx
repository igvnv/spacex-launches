import React from 'react';
import { NavLink } from 'react-router-dom';

import MainMenu from '../MainMenu';
import logoImage from '../../static/spacex-logo.svg';

const AppHeader = () => (
  <header className="header-main">
    <NavLink to="/" className="header-logo">
      <img
        className="header-logo__image"
        width="100"
        src={logoImage}
        alt="SpaceX launches"
      />
      <span className="header-logo__subtitle">Launches</span>
    </NavLink>

    <MainMenu />
  </header>
);

export default AppHeader;
