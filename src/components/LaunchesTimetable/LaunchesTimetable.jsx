import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import NoLaunchesFound from '../NoLaunchesFound';
import LaunchDataShort from '../LaunchDataShort';
import TimetableYear from './TimetableYear';
import TimetablePopup from '../TimetablePopup';

/** @returns number[] */
const timetableYears = (launches) => {
  const yearsList = [];

  if (!launches.length) return yearsList;

  for (
    let year = +launches[0].launch_year;
    year <= +launches[launches.length - 1].launch_year;
    year += 1
  ) {
    yearsList.push(year);
  }

  return yearsList;
};

const LaunchesTimetable = ({ launches }) => {
  const launchPopupRef = useRef(null);
  const timetableRef = useRef(null);
  const [displayedLaunch, setDisplayedLaunch] = useState(null);

  if (!launches || !launches.length) return <NoLaunchesFound />;

  function displayLaunch(launch, target) {
    setDisplayedLaunch(launch);
    launchPopupRef.current.show(target);
  }

  function onTimetableScroll(e) {
    launchPopupRef.current.onParentScroll(e.target.scrollLeft);
  }

  // Scrolls to the `launchElement` on timetable
  function goToLaunch(launchElement) {
    if (!timetableRef) return;

    const launchRect = launchElement.getBoundingClientRect();
    const timetableRect = timetableRef.current.getBoundingClientRect();

    let scrollTo = timetableRef.current.scrollLeft
      + launchRect.left
      + (launchRect.width / 2)
      - (timetableRect.width / 2);

    if (scrollTo < 0) scrollTo = 0;

    // TODO: Add smooth scrolling
    timetableRef.current.scrollLeft = scrollTo;
  }

  // TODO: Repaint or hide popup on launches list changes (when filters were changed as an example)

  return (
    <div>
      <TimetablePopup ref={launchPopupRef} goToLaunch={goToLaunch}>
        <LaunchDataShort launch={displayedLaunch} />
      </TimetablePopup>

      <div className="timetable" onScroll={onTimetableScroll} ref={timetableRef}>
        {timetableYears(launches).map((year) => (
          <TimetableYear
            key={year}
            launches={launches}
            year={year}
            displayLaunch={displayLaunch}
          />
        ))}
      </div>
    </div>
  );
};
LaunchesTimetable.propTypes = {
  launches: PropTypes.instanceOf(Array).isRequired,
};

export default LaunchesTimetable;
