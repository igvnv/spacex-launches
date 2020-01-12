import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchLandingPadsIfNeeded } from '../../store/actions/landingPads';
import LandingPadInfoShort from '../../components/LandingPadInfoShort';
import MapPoints from '../../components/MapPoints';
import Toggle from '../../components/Toggle';

export const LandingPads = ({ landingPads }) => {
  const [activeOnly, setActiveOnly] = useState(false);

  const filterLandingPads = (landingPadsList) => {
    if (!activeOnly) return landingPadsList;
    return landingPadsList.filter((r) => r.status === 'active');
  };

  const points = (landingPadsList) =>
    landingPadsList
      .filter(
        (landingPad) =>
          landingPad.location &&
          landingPad.location.latitude !== null &&
          landingPad.location.longitude != null
      )
      .map((landingPad) => ({
        id: landingPad.id,
        title: landingPad.full_name,
        position: {
          lat: landingPad.location.latitude,
          lng: landingPad.location.longitude,
        },
        description: (
          <Link to={`/catalog/landing_pads/${landingPad.id}`}>Read more!</Link>
        ),
      }));

  return (
    <div>
      <MapPoints points={points(filterLandingPads(landingPads))} />

      <div className="catalog-filter">
        <Toggle
          label="Active only"
          value={activeOnly}
          onToggle={setActiveOnly}
        />
      </div>

      <div className="catalog-list">
        {filterLandingPads(landingPads).map((landingPad) => (
          <div className="catalog-list__item" key={landingPad.id}>
            <LandingPadInfoShort landingPadId={landingPad.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
LandingPads.propTypes = {
  landingPads: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  loadingState: state.landingPads.state,
  landingPads: state.landingPads.data,
});

export default withLoader(LandingPads, mapStateToProps, {
  fetchMethod: fetchLandingPadsIfNeeded,
});
