import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { PropertyDetails } from './pages/PropertyDetails';
import { Magazine } from './pages/Magazine';
import { Contact } from './pages/Contact';

import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { PropertyForm } from './pages/PropertyForm';

export default function App() {
  return (
    <AuthProvider>
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
          
          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/novo" element={<PropertyForm />} />
          <Route path="/admin/editar/:id" element={<PropertyForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
