// components/sections/VirtualCardSection.js
import React from 'react';
import './Section.css';

const VirtualCardSection = ({ user }) => {
  const handleDownload = () => {
    alert('Card downloaded successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="section">
      <div className="page-header">
        <h1 className="page-title">Virtual ID Card</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleDownload}>
            <i className="fas fa-download"></i> Download
          </button>
          <button className="btn btn-success" onClick={handlePrint}>
            <i className="fas fa-print"></i> Print
          </button>
        </div>
      </div>
      
      <div className="virtual-card-container">
        <div className="virtual-card">
          <div className="card-chip"></div>
          <div className="card-number">**** **** **** 4582</div>
          <div className="card-details">
            <div className="card-holder">
              <small>CARD HOLDER</small>
              <span>{(user?.name || 'ADMIN USER').toUpperCase()}</span>
            </div>
            <div className="card-expiry">
              <small>EXPIRES</small>
              <span>12/25</span>
            </div>
          </div>
          <div className="card-logo">BANK</div>
        </div>
      </div>
      
      <div className="content-card">
        <h3 className="card-title">Card Details</h3>
        <div className="card-details-info">
          <p><strong>Holder:</strong> {user?.name || 'Admin User'}</p>
          <p><strong>Role:</strong> {user?.role || 'Administrator'}</p>
          <p><strong>Department:</strong> {user?.department || 'Admin'}</p>
          <p><strong>Email:</strong> {user?.email || 'admin@bankfinance.com'}</p>
          <p><strong>Valid Till:</strong> December 2025</p>
        </div>
      </div>
    </div>
  );
};

export default VirtualCardSection;