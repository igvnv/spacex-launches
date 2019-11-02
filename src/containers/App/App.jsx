import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loader from '../../components/Loader';
import MainMenu from '../../components/MainMenu';

const AboutProject = lazy(() => import('../AboutProject'));
const AboutSpaceX = lazy(() => import('../AboutSpaceX'));
const Catalog = lazy(() => import('../Catalog'));
const Launches = lazy(() => import('../Launches'));

export default function () {
  return (
    <div>
      <div className="header-main">
        <div className="header-logo">
          <h1>SpaceX launches</h1>
        </div>
        <MainMenu />
      </div>

      <Switch>
        <Route path="/about/company">
          <Suspense fallback={<Loader />}>
            <AboutSpaceX />
          </Suspense>
        </Route>
        <Route path="/" exact>
          <Suspense fallback={<Loader />}>
            <Launches />
          </Suspense>
        </Route>
        <Route path="/about/project">
          <Suspense fallback={<Loader />}>
            <AboutProject />
          </Suspense>
        </Route>
        <Route path="/catalog">
          <Suspense fallback={<Loader />}>
            <Catalog />
          </Suspense>
        </Route>
        { /* TODO: Add 404 */ }
      </Switch>
    </div>
  );
}
