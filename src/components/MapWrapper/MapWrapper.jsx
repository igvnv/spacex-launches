import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import Loader from '../Loader';

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
// SpaceX headquarter
const defaultCenter = { lat: 33.920689, lng: -118.328278 };

const MapWrapper = (props) => {
  const {
    children,
    className,
    onLoad,
  } = props;

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey={googleMapsApiKey}
      {...props}
    >
      <GoogleMap
        {...props}
        onLoad={onLoad}
        mapContainerClassName={`map-container ${className}`}
      >
        {children}
      </GoogleMap>
    </LoadScript>
  );
};
MapWrapper.defaultProps = {
  className: '',
  children: null,
  loadingElement: <Loader />,
  zoom: 8,
  center: defaultCenter,
  onLoad: null,
};
MapWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  loadingElement: PropTypes.element,
  zoom: PropTypes.number,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  onLoad: PropTypes.func,
};

export default MapWrapper;
