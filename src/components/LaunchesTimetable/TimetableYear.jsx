import React from 'react';
import PropTypes from 'prop-types';

const launchMonth = (launch) => {
  const date = new Date(launch.launch_date_utc);
  return date.getMonth();
};

/**
 * @param object[] launches
 * @param number year
 */
const launchesByYear = (launches, year) => launches.filter(
  (launch) => +launch.launch_year === year,
);

const monthsNamesShort = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const monthsNamesFull = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const rocketLabel = (rocketId) => {
  switch (rocketId) {
    case 'falcon1':
      return 'F1';
    case 'falcon9':
      return 'F9';
    case 'falconheavy':
      return 'FH';
    case 'starship':
      return 'S';
    default:
      return '?';
  }
};

const launchClassName = (launch) => {
  const classes = ['timetable__event'];
  if (launch.launch_success === false) classes.push('timetable__event_unsuccessfully');
  if (launch.upcoming) classes.push('timetable__event_upcoming');

  return classes.join(' ');
};

const TimetableYear = ({ launches, year, displayLaunch }) => {
  const now = new Date();
  const months = new Array(12);
  launchesByYear(launches, year).forEach((launch) => {
    const month = launchMonth(launch);
    if (!months[month]) months[month] = [];
    months[month].push(launch);
  });

  /* eslint-disable react/no-array-index-key */
  return (
    <div className={`timetable-year${year % 2 ? ' timetable-year_odd' : ''}`}>
      <span className={`timetable-year__label${year % 2 ? ' timetable-year__label_odd' : ''}`}>
        {year}
      </span>
      {monthsNamesShort.map((monthName, monthNumber) => (
        <div
          key={`${year}-${monthNumber}`}
          className={`timetable__month${now.getMonth() === monthNumber && now.getFullYear() === year ? ' timetable__month_current' : ''}`}
        >
          <span
            className={`timetable__month-name${now.getMonth() === monthNumber && now.getFullYear() === year ? ' timetable__month-name_current' : ''}`}
            title={monthsNamesFull[monthNumber]}
          >
            {monthName}
          </span>
          {months[monthNumber] && months[monthNumber].map((launch) => (
            <span
              role="button"
              tabIndex="0"
              key={launch.flight_number}
              onFocus={(e) => displayLaunch(launch, e.target)}
              className={launchClassName(launch)}
            >
              {rocketLabel(launch.rocket.rocket_id)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
TimetableYear.propTypes = {
  launches: PropTypes.instanceOf(Array).isRequired,
  year: PropTypes.number.isRequired,
  displayLaunch: PropTypes.func.isRequired,
};

export default TimetableYear;
