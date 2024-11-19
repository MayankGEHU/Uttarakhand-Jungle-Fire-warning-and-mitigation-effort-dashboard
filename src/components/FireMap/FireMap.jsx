import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Loader from './Loader';
import 'leaflet/dist/leaflet.css';
import './FireMap.css';
import PropTypes from 'prop-types';
import L from 'leaflet';
import fireIcon from '@iconify/icons-mdi/fire-alert';

const NATURAL_EVENT_WILDFIRE = 8;

const setDefaultMarkerIcon = () => {
    const DefaultIcon = L.icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        shadowSize: [41, 41]
    });
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: DefaultIcon.options.iconUrl,
        iconUrl: DefaultIcon.options.iconUrl,
        shadowUrl: DefaultIcon.options.shadowUrl,
    });
};

const FireMap = ({ initialEventData, center, zoom }) => {
    const [eventData, setEventData] = useState(initialEventData || []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setDefaultMarkerIcon();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data from EONET API...');
                const response = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`);
                }

                const data = await response.json();
                console.log('API Response:', data);
                setEventData(data.events || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!initialEventData) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [initialEventData]);

    return (
        <div className='MainMapContainer'>
            <div className="mapContainer">
                {loading ? (
                    <Loader />
                ) : (
                    <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                        />
                        {eventData.map((ev, index) => {
                            if (ev.categories && ev.categories[0].id === NATURAL_EVENT_WILDFIRE) {
                                return (
                                    <Marker
                                        key={index}
                                        position={[
                                            ev.geometries[0].coordinates[1],
                                            ev.geometries[0].coordinates[0],
                                        ]}
                                        icon={L.icon({
                                            iconUrl: fireIcon,
                                            iconSize: [25, 25],
                                        })}
                                    >
                                        <Popup>
                                            {ev.title}
                                        </Popup>
                                    </Marker>
                                );
                            }
                            return null;
                        })}
                    </MapContainer>
                )}
            </div>
        </div>
    );
};

FireMap.defaultProps = {
    center: [30.3172, 78.0322],
    zoom: 12,
};

FireMap.propTypes = {
    initialEventData: PropTypes.array,
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
};

export default FireMap;
