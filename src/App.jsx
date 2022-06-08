import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import Container from './components/Container/Container';
import Boards from './modules/Boards/Boards';
import Controllers from './modules/Controllers';
import LoginForm from './modules/LoginForm';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound/NotFound';
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Controllers />} />
              <Route path="/controllers" element={<Controllers />} />
              <Route
                path="controllers/:controllerNumber/boards"
                element={<Boards />}
              />
            </Route>
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
