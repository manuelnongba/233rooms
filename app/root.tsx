import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import ErrorComponent from './component/utils/Error';

import globalCss from '~/styles/global.css';

const store = createStore(reducers, applyMiddleware(reduxThunk));

function Document({ title, children }: any) {
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
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBycrEHHe7O_xOVuWFvo8aRG-nCgi-Zbz4&libraries=places"></script>
        </body>
      </html>
    </Provider>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={error.statusText}>
        <ErrorComponent title={error.statusText}>
          <div>
            <h1>
              {error.status} {error.statusText}
            </h1>
            <p>{error.data}</p>
            <p>
              Back to <Link to="/">safety</Link>
            </p>
          </div>
        </ErrorComponent>
      </Document>
    );
  } else if (error instanceof Error) {
    return (
      <Document title={'Something went wrong'}>
        <ErrorComponent title={'Something went wrong'}>
          <div>
            <p>{error.message}</p>
            <p>
              Back to <Link to="/">safety</Link>
            </p>
          </div>
        </ErrorComponent>
      </Document>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: globalCss }];
}
