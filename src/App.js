import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const { user } = useAuth(); // Custom hook para manejar el estado de autenticación

  const PrivateRoute = ({ element, redirectTo }) => {
    return user ? element : <Navigate to={redirectTo} replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} redirectTo="/login" />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignUp />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
