import React from 'react';
import { Icon } from '@iconify/react';
import fireIcon from '@iconify/icons-mdi/fire-alert';

const LocationMarker = ({ lat, lng, onClick }) => {
  return (
    <div className="location-marker" onClick={onClick}>
      <Icon icon={fireIcon} className="location-icon" />
    </div>
  );
};

export default LocationMarker;
