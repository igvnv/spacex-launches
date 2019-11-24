import React, { lazy, Suspense } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import Loader from '../../components/Loader';
import MainMenu from '../../components/MainMenu';
import Modal from '../../components/Modal';

const AboutProject = lazy(() => import('../AboutProject'));
const AboutSpaceX = lazy(() => import('../AboutSpaceX'));
const Catalog = lazy(() => import('../Catalog'));
const Launches = lazy(() => import('../Launches'));
const RocketInfo = lazy(() => import('../RocketInfo'));

export default function () {
  const location = useLocation();
  const history = useHistory();

  const background = location && location.state && location.state.background;

  return (
    <div className="app-wrapper">
      <div className="header-main">
        <div className="header-logo">
          <h1>SpaceX launches</h1>
        </div>
        <MainMenu />
      </div>

      <Switch location={background || location}>
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

      {background && (
        <Route path="/catalog/rockets/:rocketId">
          <Modal onClose={() => history.goBack()}>
            <Suspense fallback={<Loader />}>
              <RocketInfo />
            </Suspense>
          </Modal>
        </Route>
      )}
    </div>
  );
}
