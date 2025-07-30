import Navigation from './components/Navigation';
import IntroSection from './components/IntroSection';
import ParticipationSection from './components/ParticipationSection';
import RegistrationSection from './components/RegistrationSection';
import ConfirmationSection from './components/ConfirmationSection';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <IntroSection />
      <ParticipationSection />
      <RegistrationSection />
      <ConfirmationSection />
    </div>
  );
}