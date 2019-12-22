import React from 'react';
import PropTypes from 'prop-types';

const ShipCourse = ({ ship }) => {
  if (!ship.speed_kn) return null;

  return (
    <>
      <span className="ship-course" title="Ship course">
        <span
          className="ship-course__direction"
          style={{ transform: `rotate(${ship.course_deg}deg)` }}
        />
      </span>
      <span className="ship-course__speed">{`${ship.speed_kn} kn`}</span>
    </>
  );
};
ShipCourse.propTypes = {
  ship: PropTypes.instanceOf(Object).isRequired,
};

export default ShipCourse;
