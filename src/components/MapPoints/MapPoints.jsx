import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Marker, InfoWindow } from '@react-google-maps/api';

import MapWrapper from '../MapWrapper';

const MapPoints = ({ points }) => {
  const [displayInfo, setDisplayInfo] = useState(false);
  const [map, setMap] = useState(null);
  const [mapMarkers, setMapMarkers] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const fitBounds = () => {
    // Map may have been not loaded yet.
    if (!map) return;

    const bounds = new window.google.maps.LatLngBounds();
    points.forEach((point) => bounds.extend(point.position));
    map.fitBounds(bounds);
  };

  const markerLoadHandler = (marker, point) => {
    setMapMarkers((prevState) => ({ ...prevState, [point.id]: marker }));
  };

  const marketClickHandler = (point) => {
    // Must reopen info window to change anchor element
    if (displayInfo) setDisplayInfo(false);

    setSelectedPoint(point);
    setDisplayInfo(true);
  };

  const onMapLoad = (mapElement) => {
    if (!mapElement) return;
    setMap(mapElement);
    fitBounds();
  };

  // Fits bounds on each props change
  useEffect(fitBounds);

  return (
    <MapWrapper onLoad={onMapLoad}>
      <>
        {points && points.map((point) => (
          <Marker
            key={point.id}
            position={point.position}
            onLoad={(marker) => markerLoadHandler(marker, point)}
            onClick={() => marketClickHandler(point)}
          />
        ))}
        {displayInfo && (
          <InfoWindow
            anchor={mapMarkers[selectedPoint.id]}
            onCloseClick={() => setDisplayInfo(false)}
          >
            <div>
              <h3 className="map-info-window__header">{selectedPoint.title}</h3>

              {selectedPoint.description && (
                <div className="map-info-window__body">
                  {selectedPoint.description}
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </>
    </MapWrapper>
  );
};
MapPoints.propTypes = {
  points: PropTypes.instanceOf(Array).isRequired,
};

export default MapPoints;
