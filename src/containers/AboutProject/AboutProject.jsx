import React from 'react';

function AboutProject() {
  return (
    <div>
      <h2>About project</h2>

      <p>
        The app is based on the
        <a href="https://docs.spacexdata.com/?version=latest">public API</a>
        .
      </p>
      <p><a href="https://github.com/igvnv/spacex-launches">Source code.</a></p>

      <h3>Goals</h3>
      <ul>
        <li>Learning React</li>
        <li>Learning Redux</li>
        <li>Learning React Router</li>
      </ul>

      <h3>Secondary goals</h3>
      <ul>
        <li>Creating a fancy responsible interface</li>
        <li>Having fun!</li>
      </ul>
    </div>
  );
}

export default AboutProject;
