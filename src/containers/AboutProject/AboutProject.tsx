import React from 'react';

function AboutProject() {
  return (
    <div>
      <h1 className="title title_level_1">About project</h1>

      <p className="text">
        The app is based on the{' '}
        <a className="link" href="https://docs.spacexdata.com/?version=latest">
          public API
        </a>
        .
      </p>
      <p className="text">
        <a className="link" href="https://github.com/igvnv/spacex-launches">
          Source code.
        </a>
      </p>

      <h2 className="title title_level_2">Goals</h2>

      <ul className="list">
        <li className="list__item">Learning React</li>
        <li className="list__item">Learning Redux</li>
        <li className="list__item">Learning React Router</li>
      </ul>

      <h2 className="title title_level_2">Secondary goals</h2>

      <ul className="list">
        <li className="list__item">Creating a fancy responsible interface</li>
        <li className="list__item">Having fun!</li>
      </ul>
    </div>
  );
}

export default AboutProject;
