import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

import globalCss from '~/styles/global.css';

const store = createStore(reducers, applyMiddleware(reduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </Provider>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: globalCss }];
}
