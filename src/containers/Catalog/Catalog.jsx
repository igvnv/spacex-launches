import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import CatalogNavigation from '../../components/CatalogNavigation';
import Rockets from '../../components/Rockets';
import RocketInfo from '../RocketInfo';

const UnderConstruction = () => <h3>Category is under construction</h3>;

const Catalog = () => {
  const { path } = useRouteMatch();
  const categories = [
    {
      path: 'rockets',
      pathItem: 'rockets/:rocketId',
      name: 'Rockets',
      componentList: Rockets,
      componentItem: RocketInfo,
    },
    {
      path: 'dragons',
      pathItem: 'dragons/:dragonId',
      name: 'Dragons',
      componentList: UnderConstruction,
      componentItem: UnderConstruction,
    },
    {
      path: 'ships',
      pathItem: 'ships/:shipId',
      name: 'Sea ships',
      componentList: UnderConstruction,
      componentItem: UnderConstruction,
    },
    {
      path: 'launch_pads',
      pathItem: 'launch_pads/:launchPadId',
      name: 'Launch pads',
      componentList: UnderConstruction,
      componentItem: UnderConstruction,
    },
    {
      path: 'landing_pads',
      pathItem: 'landing_pads/:landingPadId',
      name: 'Landing pads',
      componentList: UnderConstruction,
      componentItem: UnderConstruction,
    },
  ];

  return (
    <div>
      <CatalogNavigation categories={categories} />

      <Switch>
        <Route exact path={`${path}/rockets`} component={Rockets} />
        <Route path={`${path}/rockets/:rocketId`} component={RocketInfo} />

        {categories.map((category) => (
          <Route
            exact
            key={category.path}
            path={`${path}/${category.path}`}
            component={category.componentList}
          />
        ))}
        {categories.map((category) => (
          <Route
            key={category.pathItem}
            path={`${path}/${category.pathItem}`}
            component={category.componentItem}
          />
        ))}

        <Route path={path} exact>
          <Redirect to={`${path}/${categories[0].path}`} />
        </Route>
        <Route path="*">
          <h3>Category not found...</h3>
        </Route>
      </Switch>
    </div>
  );
};

export default Catalog;
