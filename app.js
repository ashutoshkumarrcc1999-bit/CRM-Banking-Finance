// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="App">
          <Login />
          <Dashboard />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;