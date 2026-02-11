import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Staff from './pages/Staff';
import { Imprint, Terms } from './pages/Legal';
import { Page } from './types';
import { SystemProvider } from './context/SystemContext';

function App() {
  return (
    <SystemProvider>
      <Router>
        <Routes>
          {/* Public Routes wrapped in Main Layout */}
          <Route path={Page.HOME} element={<Layout><Home /></Layout>} />
          <Route path={Page.MENU} element={<Layout><Menu /></Layout>} />
          <Route path={Page.RESERVATION} element={<Layout><Reservation /></Layout>} />
          <Route path={Page.EVENTS} element={<Layout><Events /></Layout>} />
          <Route path={Page.LOCATION} element={<Layout><Contact /></Layout>} />
          <Route path={Page.IMPRINT} element={<Layout><Imprint /></Layout>} />
          <Route path={Page.TERMS} element={<Layout><Terms /></Layout>} />
          
          {/* Staff Route - Handles its own Layout internally */}
          <Route path="/staff/*" element={<Staff />} />
        </Routes>
      </Router>
    </SystemProvider>
  );
}

export default App;