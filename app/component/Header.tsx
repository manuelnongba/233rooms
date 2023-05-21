import { NavLink, useFetcher } from '@remix-run/react';
import styles from '../styles/header.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useJsApiLoader } from '@react-google-maps/api';
import { MAPSKEY } from '../api/config';
import MapModal from './MapModal';
import { getCurrentLocation, getRooms } from '~/actions';
import { connect } from 'react-redux';

const Header = ({
  location,
  getCurrentLocation,
  getRooms,
}: {
  location: { latitude: number; longitude: number };
  getCurrentLocation: any;
  getRooms: any;
}) => {
  const [locationResults, setLocationResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [address, setAddress] = useState('');
  const [center, setCenter] = useState({
    lat: location.latitude,
    lng: location.longitude,
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [resultsIsOpen, setResultsIsOpen] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  const fetcher = useFetcher();
  const submit = fetcher.submit;

  useEffect(() => {
    if (center.lat) {
      const data = {
        lat: String(center.lat),
        lng: String(center.lng),
      };

      submit(data, { method: 'GET', action: '?index' });
    }
  }, [center, submit]);

  useEffect(() => {
    if (fetcher.data) {
      getRooms(fetcher.data);
    }
  }, [fetcher.data, getRooms]);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  useEffect(() => {
    setCenter({
      lat: location.latitude,
      lng: location.longitude,
    });
  }, [location]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    const googlePlaces = async () => {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${debouncedSearchTerm}&key=${MAPSKEY}`
      );

      setLocationResults(
        response.data.predictions.map((el: any) => {
          return (
            <p
              key={el.description}
              onClick={(e) => {
                setAddress(el.description);
                setSearchTerm(el.description);
                setResultsIsOpen(false);
              }}
            >
              {el.description}
            </p>
          );
        })
      );
    };
    googlePlaces();
  }, [debouncedSearchTerm]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${MAPSKEY}`,
  });

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${MAPSKEY}`;

  useEffect(() => {
    address &&
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const location = data.results[0]?.geometry.location;
          setCenter({ lat: location?.lat, lng: location?.lng });
        });
  }, [address, url]);

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    // Attach an event listener to the document that listens for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event: Event) {
    // If the user clicks outside the div, hide it
    if (
      divRef.current &&
      !divRef.current.contains(event.target as HTMLDivElement)
    ) {
      divRef.current.style.display = 'none';
    }
  }

  // if (fetcher.state !== 'idle') {
  //   return <h1>Loading...</h1>;
  // }

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
      <div className="location">
        <div className="location-input">
          <button onClick={openModal}>
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setResultsIsOpen(true);
              }}
            ></input>
          </div>
        </div>
        {resultsIsOpen && (
          <div className="locationResults" ref={divRef}>
            {locationResults}
          </div>
        )}
      </div>

      {isLoaded && center.lat && (
        <MapModal
          modalIsOpen={modalIsOpen}
          center={center}
          setIsOpen={setIsOpen}
        />
      )}

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

export const mapStateToProps = (state: any) => {
  console.log(state);

  return { location: state.location, rooms: state.rooms };
};

export default connect(mapStateToProps, { getCurrentLocation, getRooms })(
  Header
);

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
