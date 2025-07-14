import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RecipePage from './components/RecipePage';
import './App.css';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
      </Routes>
    </div>
  );
}

export default App;