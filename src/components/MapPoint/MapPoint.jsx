import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from '@react-google-maps/api';

import MapWrapper from '../MapWrapper';

const MapPoints = ({ position, zoom }) => (
  <MapWrapper
    zoom={zoom}
    center={position}
    className="map-container_full-page"
  >
    <Marker position={position} />
  </MapWrapper>
);
MapPoints.defaultProps = {
  zoom: 6,
};
MapPoints.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  zoom: PropTypes.number,
};

export default MapPoints;
