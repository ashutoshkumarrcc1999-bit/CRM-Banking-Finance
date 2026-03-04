// contexts/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('bankfinance_theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme !== 'default' ? `theme-${savedTheme}` : '';
    }
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.className = newTheme !== 'default' ? `theme-${newTheme}` : '';
    localStorage.setItem('bankfinance_theme', newTheme);
  };

  const themeNames = {
    'default': 'Corporate',
    'finance': 'Green',
    'modern': 'Purple',
    'dark': 'Dark'
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themeNames }}>
      {children}
    </ThemeContext.Provider>
  );
};