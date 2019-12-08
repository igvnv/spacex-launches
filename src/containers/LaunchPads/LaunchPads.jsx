import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchLaunchPadsIfNeeded } from '../../redux/actions/launchPads';
import LaunchPadInfoShort from '../../components/LaunchPadInfoShort';
import MapPoints from '../../components/MapPoints';

export const LaunchPads = ({ launchPads }) => {
  const points = launchPads
    .filter((launchPad) => launchPad.location
      && launchPad.location.latitude !== null
      && launchPad.location.longitude != null)
    .map((launchPad) => ({
      id: launchPad.id,
      title: launchPad.location.name,
      position: {
        lat: launchPad.location.latitude,
        lng: launchPad.location.longitude,
      },
      description: (
        <Link to={`/catalog/launch_pads/${launchPad.id}`}>
          Read more!
        </Link>
      ),
    }));

  return (
    <div>
      <MapPoints points={points} />

      <div className="catalog-list">
        {launchPads.map((launchPad) => (
          <div className="catalog-list__item" key={launchPad.id}>
            <LaunchPadInfoShort launchPadId={launchPad.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
LaunchPads.propTypes = {
  launchPads: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  loadingState: state.launchPads.state,
  launchPads: state.launchPads.data,
});

export default withLoader(LaunchPads, mapStateToProps, { fetchMethod: fetchLaunchPadsIfNeeded });
