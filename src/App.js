import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherApp from './features/weather';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/weather" element={<WeatherApp />} />
      </Routes>
    </Router>
  );
}

export default App;
