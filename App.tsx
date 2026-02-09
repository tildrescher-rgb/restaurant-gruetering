import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import Events from './pages/Events';
import Contact from './pages/Contact';
import { Imprint, Terms } from './pages/Legal';
import { Page } from './types';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={Page.HOME} element={<Home />} />
          <Route path={Page.MENU} element={<Menu />} />
          <Route path={Page.RESERVATION} element={<Reservation />} />
          <Route path={Page.EVENTS} element={<Events />} />
          <Route path={Page.LOCATION} element={<Contact />} />
          <Route path={Page.IMPRINT} element={<Imprint />} />
          <Route path={Page.TERMS} element={<Terms />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;