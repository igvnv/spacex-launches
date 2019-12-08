import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchRocketsIfNeeded } from '../../redux/actions/rockets';
import RocketInfoShort from '../../components/RocketInfoShort';
import Toggle from '../../components/Toggle';

export const Rockets = ({ rockets }) => {
  const [activeOnly, setActiveOnly] = useState(false);

  const filterRockets = (rocketsList) => {
    if (!activeOnly) return rocketsList;
    return rocketsList.filter((r) => r.active === true);
  };

  return (
    <div>
      <div className="catalog-filter">
        <Toggle label="Active only" value={activeOnly} onToggle={setActiveOnly} />
      </div>

      <div className="catalog-list">
        {filterRockets(rockets).map((rocket) => (
          <div className="catalog-list__item" key={rocket.rocket_id}>
            <RocketInfoShort rocketId={rocket.rocket_id} />
          </div>
        ))}
      </div>
    </div>
  );
};
Rockets.propTypes = {
  rockets: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  loadingState: state.rockets.state,
  rockets: state.rockets.data,
});

export default withLoader(Rockets, mapStateToProps, { fetchMethod: fetchRocketsIfNeeded });
