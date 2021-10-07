import '../styles/globals.css'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';

const theme = createTheme({
	typography: {
		fontFamily: "'Source Sans Pro', Roboto, sans-serif;"
	}
});

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp
