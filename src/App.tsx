import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CounterGame from './pages/games/CounterGame';
import GuessNumberGame from './pages/games/GuessNumberGame';
import RockPaperScissors from './pages/games/RockPaperScissors';
import MemoryGame from './pages/games/MemoryGame';
import ReactionTimeGame from './pages/games/ReactionTimeGame';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/counter" element={<CounterGame />} />
      <Route path="/guess-number" element={<GuessNumberGame />} />
      <Route path="/rps" element={<RockPaperScissors />} />
      <Route path="/memory" element={<MemoryGame />} />
      <Route path="/reaction" element={<ReactionTimeGame />} />
    </Routes>
  </Router>
);

export default App;
