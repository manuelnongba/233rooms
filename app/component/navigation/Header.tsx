import { useFetcher } from '@remix-run/react';
import styles from '~/styles/header.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useJsApiLoader } from '@react-google-maps/api';
import { MAPSKEY } from '~/api/config';
import MapModal from '../utils/MapModal';
import { getCurrentLocation, getRooms } from '~/actions';
import { connect } from 'react-redux';
import Menu from './Menu';
import { Logo } from '../utils/Logo';

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
  const [isMenu, setIsMenu] = useState(false);

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
      axios(url).then((data) => {
        const location = data.data.results[0]?.geometry.location;
        console.log(location);

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

  const showMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <div className="header sticky">
      <Logo />
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
              placeholder="Search desired location"
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

      <div className="profile">
        <button onClick={showMenu}>
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
        <Menu isMenu={isMenu} />
      </div>
    </div>
  );
};

export const mapStateToProps = (state: any) => {
  return { location: state.location, rooms: state.rooms };
};

export default connect(mapStateToProps, { getCurrentLocation, getRooms })(
  Header
);

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
