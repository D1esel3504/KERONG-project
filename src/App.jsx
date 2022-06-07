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

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Controllers />} />
            <Route exact path="/controllers" element={<Controllers />} />
            <Route
              exact
              path="controllers/:controllerNumber/boards"
              element={<Boards />}
            />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
