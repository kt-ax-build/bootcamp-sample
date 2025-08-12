import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import Navigation from './components/Navigation';
import IntroSection from './components/IntroSection';
import ParticipationSection from './components/ParticipationSection';
import RegistrationSection from './components/RegistrationSection';
import ConfirmationSection from './components/ConfirmationSection';

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
          <div id="participation">
            <ParticipationSection />
          </div>
          <div id="registration">
            <RegistrationSection />
          </div>
          <div id="confirmation">
            <ConfirmationSection />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
