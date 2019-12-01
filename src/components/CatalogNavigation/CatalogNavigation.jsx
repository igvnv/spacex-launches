import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const CatalogNavigation = ({ categories }) => (
  <ul className="secondary-menu">
    {categories.map((category) => (
      <li className="secondary-menu__item" key={category.path}>
        <NavLink
          to={`/catalog/${category.path}`}
          className="secondary-menu__link"
          activeClassName="secondary-menu__link_active"
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
