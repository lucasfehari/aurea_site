import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { PropertyDetails } from './pages/PropertyDetails';
import { Magazine } from './pages/Magazine';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:id" element={<PropertyDetails />} />
          <Route path="revista" element={<Magazine />} />
          <Route path="contato" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}
