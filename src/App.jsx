import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import Container from './components/Container';
import Boards from './modules/Boards/Boards';
import Controllers from './modules/Controllers';
import LoginForm from './modules/LoginForm';

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Controllers />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/controllers" element={<Controllers />} />
          <Route
            path="controllers/:controllerNumber/boards"
            element={<Boards />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
