import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import CatalogNavigation from '../../components/CatalogNavigation';

const Catalog = () => {
  const { path } = useRouteMatch();
  const categories = [
    { id: 'rockets', name: 'Rockets', component: <h3>Rockets list</h3> },
    { id: 'dragons', name: 'Dragons', component: <h3>Dragons list</h3> },
    { id: 'sea_ships', name: 'Sea ships', component: <h3>Ships list</h3> },
    { id: 'launch_pads', name: 'Launch pads', component: <h3>Launch pads</h3> },
    { id: 'landing_pads', name: 'Landing pads', component: <h3>Landing pads</h3> },
  ];

  return (
    <div>
      <CatalogNavigation categories={categories} />

      <Switch>
        {categories.map((category) => (
          <Route key={category.id} path={`${path}/${category.id}`}>
            {category.component}
          </Route>
        ))}
        <Route path={path} exact>
          <Redirect to={`${path}/${categories[0].id}`} />
        </Route>
        <Route path="*">
          <h3>Category not found...</h3>
        </Route>
      </Switch>
    </div>
  );
};

export default Catalog;
