import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchLandingPadsIfNeeded } from '../../redux/actions/landingPads';
import LandingPadInfoShort from '../LandingPadInfoShort';
import MapPoints from '../MapPoints';

export const LandingPads = ({ landingPads }) => {
  const points = landingPads
    .filter((landingPad) => landingPad.location
      && landingPad.location.latitude !== null
      && landingPad.location.longitude != null)
    .map((landingPad) => ({
      id: landingPad.id,
      title: landingPad.location.name,
      position: {
        lat: landingPad.location.latitude,
        lng: landingPad.location.longitude,
      },
      description: (
        <Link to={`/catalog/landing_pads/${landingPad.id}`}>
          Read more!
        </Link>
      ),
    }));

  return (
    <div>
      <MapPoints points={points} />

      {landingPads.map((landingPad) => (
        <div key={landingPad.id}>
          <LandingPadInfoShort landingPadId={landingPad.id} />
        </div>
      ))}
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

export default withLoader(LandingPads, mapStateToProps, { fetchMethod: fetchLandingPadsIfNeeded });
