import React from 'react';
import { version } from '../../../package.json';
import gitLogo from '../../static/github-logo.svg';

const AppFooter = () => (
  <footer className="footer">
    <p className="footer__paragraph">
      The project is based on the{' '}
      <a
        className="footer__link"
        href="https://docs.spacexdata.com/?version=latest"
      >
        public API
      </a>
    </p>
    <p className="footer__paragraph">
      Created by{' '}
      <a className="footer__link" href="https://github.com/igvnv/">
        Roman Petrov
      </a>
      , {`version ${version}`}{' '}
      <a href="https://github.com/igvnv/spacex-launches">
        <img className="footer__git-icon" src={gitLogo} alt="See on GitHub" />
      </a>
    </p>
  </footer>
);

export default AppFooter;
