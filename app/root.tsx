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
import { MetaFunction } from '@remix-run/node';

const store = createStore(reducers, applyMiddleware(reduxThunk));

export const meta: MetaFunction = () => {
  return [
    { title: '233 Rooms' },
    {
      property: 'og:title',
      content: '233 Rooms',
    },
    {
      property: 'og:description',
      content: 'Find affordable rooms close to you on 233 Rooms',
    },
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/drxwuqu3v/image/upload/v1699751290/233Rooms_m9zod3.jpg',
    },
  ];
};

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
