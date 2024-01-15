import {cssBundleHref} from '@remix-run/css-bundle';
import type {LinksFunction} from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import ConstructorContextProvider from './context/ConstructorContext/ConstructorContext';
import globalStylesHref from './styles/global.css';
import resetStylesHref from './styles/reset.css';

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: resetStylesHref},
  {rel: 'stylesheet', href: globalStylesHref},
  ...(cssBundleHref ? [{rel: 'stylesheet', href: cssBundleHref}] : []),
];
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ConstructorContextProvider>
          <Link to={'/constructor'}>constructor</Link>
          <Outlet />
        </ConstructorContextProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
