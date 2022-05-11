import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Boards from './containers/Boards/Boards';
import Controllers from './containers/Controllers';
import LoginForm from './containers/LoginForm/LoginForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Controllers />} />
        <Route path="/boards/:id" element={<Boards />} />
      </Routes>
    </Router>
  );
};

export default App;
