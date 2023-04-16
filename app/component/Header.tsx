import { NavLink } from '@remix-run/react';
import styles from '../styles/header.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useJsApiLoader, GoogleMap, MarkerF } from '@react-google-maps/api';
import { MAPSKEY } from '../api/config';

const Header = () => {
  const [locationResults, setLocationResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [address, setAddress] = useState('');
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (navigator?.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
  }, []);

  useEffect(() => {
    const googlePlaces = async () => {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${debouncedSearchTerm}&key=${MAPSKEY}`
      );

      setLocationResults(
        response.data.predictions.map((el: any) => {
          return (
            <p key={el.description} onClick={(e) => setAddress(el.description)}>
              {el.description}
            </p>
          );
        })
      );
    };
    googlePlaces();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${MAPSKEY}`,
  });

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${MAPSKEY}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const location = data.results[0]?.geometry.location;
        setCenter({ lat: location.lat, lng: location.lng });
        console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
      });
  }, [url]);

  if (!isLoaded) return <></>;

  return (
    <div className="header">
      <div>
        <NavLink to="/" className="home">
          <svg
            id="logosandtypes_com"
            data-name="logosandtypes com"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 150"
            strokeWidth={4}
            stroke="#f76707"
            fill="none"
            className="logo"
          >
            <path d="M68.49,78.77C109.39,68.45,120.55,11,80.41,11,69.86,11,59.16,17.78,52,31.33,50.17,17.47,40.91,10.69,24.59,11L23,23.94c12.87-.3,17.52,5.54,17.52,16a78.26,78.26,0,0,1-2.33,16.17L26,110.83H41.72l6.68-31,5.11.47C69.72,115.91,104.3,140.26,131,139.8l1.71-13.72C102.1,126.7,76.21,97.12,68.49,78.77ZM50.64,67.54c4.8-19.84,16-43.29,30.08-43.29,22.28,0,6,43.9-24.2,43.9A40,40,0,0,1,50.64,67.54Z" />
          </svg>
          <span>
            <p>oom</p>
          </span>
        </NavLink>
      </div>
      <div>
        <div className="location">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon location-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </button>
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="locationResults">{locationResults}</div>
      </div>
      <GoogleMap
        center={center}
        mapContainerStyle={{ width: '100rem', height: '100rem' }}
        zoom={15}
      >
        <MarkerF position={center} />
      </GoogleMap>
      <div>
        <button className="profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="icon profile-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}