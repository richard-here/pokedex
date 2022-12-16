import { createTheme } from '@mui/material/styles';
import {
  grey, blue, brown, teal, pink, purple, red, orange,
} from '@mui/material/colors';

const theme = createTheme({
  pokemonBackgrounds: {
    black: grey[900],
    blue: blue[500],
    brown: brown[500],
    gray: grey[800],
    green: teal[400],
    pink: pink[400],
    purple: purple[400],
    red: red[400],
    white: grey[500],
    yellow: orange[800],
  },
  breakpoints: {
    values: {
      xss: 0,
      xs: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
