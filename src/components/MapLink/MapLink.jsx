import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import MapPoint from '../MapPoint';

const MapLink = ({ position, zoom, children }) => {
  const [showPosition, setShowPosition] = useState(false);

  return (
    <>
      {showPosition && (
        <Modal
          onClose={() => setShowPosition(false)}
        >
          <MapPoint position={position} zoom={zoom} />
        </Modal>
      )}

      <a
        onClick={(e) => { e.preventDefault(); setShowPosition(true); }}
        href={`http://www.google.com/maps/place/${position.lat},${position.lng}`}
      >
        {children}
      </a>
    </>
  );
};
MapLink.defaultProps = {
  zoom: 6,
};
MapLink.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  zoom: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default MapLink;
