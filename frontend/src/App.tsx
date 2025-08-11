import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import Navigation from './components/Navigation';
import IntroSection from './components/IntroSection';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Navigation />
        <div style={{ paddingTop: 70 }}>
          <div id="intro">
            <IntroSection />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
