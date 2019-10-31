import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import MainMenu from '../../components/MainMenu/MainMenu';

const AboutProject = lazy(() => import('../AboutProject/AboutProject'));
const AboutSpaceX = lazy(() => import('../AboutSpaceX/AboutSpaceX'));
const Launches = lazy(() => import('../Launches/Launches.jsx'));

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
      </Switch>
    </div>
  );
}
