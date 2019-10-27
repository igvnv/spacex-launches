import React, { lazy, Suspense } from 'react';
import { Route, Switch} from 'react-router-dom';

import Loader from '../Loader/Loader';
import MainMenu from '../MainMenu';

const AboutProject = lazy(() => import('../AboutProject/AboutProject'));
const AboutSpaceX = lazy(() => import('../AboutSpaceX/AboutSpaceX'));


export default function () {
  return (
    <div>
      <div className="header-main">
        <div className="header-logo">
          <h1>SpaceX launches</h1>
        </div>
        <MainMenu/>
      </div>

      <Switch>
        <Route path="/about/company">
          <Suspense fallback={<Loader/>}>
            <AboutSpaceX/>
          </Suspense>
        </Route>
        <Route path="/about/project">
          <Suspense fallback={<Loader/>}>
            <AboutProject/>
          </Suspense>
        </Route>
      </Switch>
    </div>
  );
}