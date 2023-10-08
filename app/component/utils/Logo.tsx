import { NavLink, useLocation } from '@remix-run/react';

export const Logo = () => {
  const loc = useLocation();

  let hideLogo = '';
  if (loc.pathname == '/') hideLogo = 'hide-logo';

  return (
    <div>
      <NavLink to="/" className={`home ${hideLogo}`}>
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
  );
};
