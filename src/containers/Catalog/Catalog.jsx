import React from 'react';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';

import CatalogNavigation from '../../components/CatalogNavigation';
import Rockets from '../Rockets';
import RocketInfo from '../RocketInfo';
import Dragons from '../Dragons';
import DragonInfo from '../DragonInfo';
import Ships from '../Ships';
import ShipInfo from '../ShipInfo';
import LaunchPads from '../LaunchPads';
import LaunchPadInfo from '../LaunchPadInfo';
import LandingPads from '../LandingPads';
import LandingPadInfo from '../LandingPadInfo';

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
      componentList: Dragons,
      componentItem: DragonInfo,
    },
    {
      path: 'ships',
      pathItem: 'ships/:shipId',
      name: 'Ships',
      componentList: Ships,
      componentItem: ShipInfo,
    },
    {
      path: 'launch_pads',
      pathItem: 'launch_pads/:launchPadId',
      name: 'Launch pads',
      componentList: LaunchPads,
      componentItem: LaunchPadInfo,
    },
    {
      path: 'landing_pads',
      pathItem: 'landing_pads/:landingPadId',
      name: 'Landing pads',
      componentList: LandingPads,
      componentItem: LandingPadInfo,
    },
  ];

  return (
    <div>
      <CatalogNavigation categories={categories} />

      <Switch>
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
