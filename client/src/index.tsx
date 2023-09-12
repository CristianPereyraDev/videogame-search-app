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

import { ThemeProvider } from '@mui/material/styles';
import Detail from './pages/Detail/Detail';
import { darkTheme } from './config/theme.config';

const rootElement = document.getElementById('root');

// Router
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
