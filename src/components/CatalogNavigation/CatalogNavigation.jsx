import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const CatalogNavigation = ({ categories }) => (
  <ul className="main-menu">
    {categories.map((category) => (
      <li className="main-menu__item" key={category.path}>
        <NavLink
          to={`/catalog/${category.path}`}
          className="main-menu__link"
          activeClassName="main-menu__link_active"
        >
          {category.name}
        </NavLink>
      </li>
    ))}
  </ul>
);
CatalogNavigation.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
};

export default CatalogNavigation;
