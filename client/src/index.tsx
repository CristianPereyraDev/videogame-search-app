import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './app/App';
import { store } from './app/store';

import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import Home from './pages/Home/Home';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Detail from './pages/Detail/Detail';

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import React from 'react';

export const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#4caf50' },
    secondary: { main: '#00e5ff' },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

const rootElement = document.getElementById('root');

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'details/:gameId', element: <Detail /> },
    ],
  },
]);

if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <ScopedCssBaseline enableColorScheme>
        <RouterProvider router={router} />
      </ScopedCssBaseline>
    </Provider>
  </ThemeProvider>
);
