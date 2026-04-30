import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import QuestionPage from './pages/QuestionsPage';
import ElementPage from './pages/ElementPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cau-hoi" element={<QuestionPage />} />
          <Route path="/nguyen-to" element={<ElementPage />} />
          <Route path="/nguyen-to/:id" element={<ElementPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;