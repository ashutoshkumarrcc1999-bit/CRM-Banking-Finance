// components/Header.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './Header.css';

const Header = ({ toggleMobileSidebar, setCurrentSection }) => {
  const { user, logout } = useAuth();
  const { theme, changeTheme, themeNames } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.theme-selector') && showThemeMenu) {
        setShowThemeMenu(false);
      }
      if (!event.target.closest('.user-profile') && !event.target.closest('.user-dropdown') && showUserDropdown) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showThemeMenu, showUserDropdown]);

  const handleLogout = () => {
    logout();
  };

  const showSection = (section) => {
    setCurrentSection(section);
    setShowUserDropdown(false);
  };

  return (
    <header className="header">
      <div className="container header-content">
        <div className="header-left">
          <button className="mobile-menu-toggle" onClick={toggleMobileSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          
          <div className="logo" onClick={() => showSection('dashboardSection')}>
            <i className="fas fa-university"></i>
            <span>BankFinance CRM</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="theme-selector">
            <button 
              className="theme-btn" 
              onClick={(e) => {
                e.stopPropagation();
                setShowThemeMenu(!showThemeMenu);
              }}
            >
              <i className="fas fa-palette"></i>
              <span>{themeNames[theme]}</span>
              <i className="fas fa-chevron-down"></i>
            </button>
            
            {showThemeMenu && (
              <div className="theme-options" onClick={(e) => e.stopPropagation()}>
                <div 
                  className={`theme-option theme-default ${theme === 'default' ? 'active' : ''}`}
                  onClick={() => changeTheme('default')}
                >
                  <span className="theme-color"></span>
                  <span>Corporate Blue</span>
                </div>
                <div 
                  className={`theme-option theme-finance ${theme === 'finance' ? 'active' : ''}`}
                  onClick={() => changeTheme('finance')}
                >
                  <span className="theme-color"></span>
                  <span>Green Finance</span>
                </div>
                <div 
                  className={`theme-option theme-modern ${theme === 'modern' ? 'active' : ''}`}
                  onClick={() => changeTheme('modern')}
                >
                  <span className="theme-color"></span>
                  <span>Purple Modern</span>
                </div>
                <div 
                  className={`theme-option theme-dark ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => changeTheme('dark')}
                >
                  <span className="theme-color"></span>
                  <span>Dark Pro</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="user-info">
            <div className="notification-icon" onClick={() => alert('3 new notifications')}>
              <i className="far fa-bell"></i>
              <span className="notification-count">{notifications}</span>
            </div>
            
            <div 
              className="user-profile" 
              onClick={(e) => {
                e.stopPropagation();
                setShowUserDropdown(!showUserDropdown);
              }}
            >
              <div className="user-avatar">{user?.avatar || 'A'}</div>
              <div className="user-details">
                <div className="user-name">{user?.name || 'User'}</div>
                <div className="user-role">{user?.role || 'Staff'}</div>
              </div>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
      
      {showUserDropdown && (
        <div className="user-dropdown show">
          <div className="dropdown-header">
            <div className="dropdown-avatar">{user?.avatar || 'A'}</div>
            <div className="dropdown-info">
              <h4>{user?.name || 'User'}</h4>
              <p>{user?.role || 'Staff'}</p>
            </div>
          </div>
          <ul className="dropdown-menu">
            <li><a href="#" onClick={() => showSection('dashboardSection')}><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
            <li><a href="#" onClick={() => showSection('virtualCardSection')}><i className="fas fa-id-card"></i> My Virtual Card</a></li>
            <li><a href="#" onClick={() => showSection('remindersSection')}><i className="fas fa-bell"></i> My Reminders</a></li>
            <li><a href="#" onClick={() => showSection('kycSection')}><i className="fas fa-video"></i> KYC Status</a></li>
            <li><a href="#" onClick={() => showSection('commissionSection')}><i className="fas fa-percentage"></i> Commission</a></li>
            <li className="logout"><a href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;