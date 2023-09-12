import { LinkProps } from '@mui/material/Link';
import { createTheme } from '@mui/material/styles';
import { LinkBehavior } from '../components/LinkBehavior/LinkBehavior';

//
export const darkTheme = createTheme({
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
