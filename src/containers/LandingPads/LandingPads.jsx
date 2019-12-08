import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchLandingPadsIfNeeded } from '../../redux/actions/landingPads';
import LandingPadInfoShort from '../../components/LandingPadInfoShort';
import MapPoints from '../../components/MapPoints';

export const LandingPads = ({ landingPads }) => {
  const points = landingPads
    .filter((landingPad) => landingPad.location
      && landingPad.location.latitude !== null
      && landingPad.location.longitude != null)
    .map((landingPad) => ({
      id: landingPad.id,
      title: landingPad.full_name,
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

      <div className="catalog-list">
        {landingPads.map((landingPad) => (
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

export default withLoader(LandingPads, mapStateToProps, { fetchMethod: fetchLandingPadsIfNeeded });
