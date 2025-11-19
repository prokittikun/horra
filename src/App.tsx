import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { HomePage } from './pages/HomePage';
import { DailyHoroscopePage } from './pages/DailyHoroscopePage';
import { BirthChartPage } from './pages/BirthChartPage';
import { CompatibilityPage } from './pages/CompatibilityPage';
import { ZodiacPage } from './pages/ZodiacPage';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-cosmic-900 text-cosmic-100">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/horoscope" element={<DailyHoroscopePage />} />
            <Route path="/birth-chart" element={<BirthChartPage />} />
            <Route path="/compatibility" element={<CompatibilityPage />} />
            <Route path="/zodiac" element={<ZodiacPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;