// components/sections/DashboardSection.js
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './Section.css';

const DashboardSection = () => {
  const [stats, setStats] = useState({
    leads: 3,
    clients: 1,
    employees: 2,
    payouts: '₹2,84,500'
  });

  const [leads, setLeads] = useState([
    { id: 1, name: 'Rahul Sharma', phone: '+91 9876543210', loanType: 'Home Loan', status: 'New' },
    { id: 2, name: 'Priya Patel', phone: '+91 8765432109', loanType: 'Personal Loan', status: 'Contacted' },
    { id: 3, name: 'Amit Kumar', phone: '+91 7654321098', loanType: 'Car Loan', status: 'Follow-up' }
  ]);

  useEffect(() => {
    initCharts();
  }, []);

  const initCharts = () => {
    // Lead Status Chart
    const leadStatusCtx = document.getElementById('leadStatusChart')?.getContext('2d');
    if (leadStatusCtx) {
      new Chart(leadStatusCtx, {
        type: 'doughnut',
        data: {
          labels: ['New', 'Contacted', 'Follow-up', 'Converted', 'Rejected'],
          datasets: [{
            data: [1, 1, 1, 0, 0],
            backgroundColor: ['#2196f3', '#ff9800', '#ffc107', '#4caf50', '#f44336'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          animation: { animateScale: true, animateRotate: true }
        }
      });
    }

    // Monthly Performance Chart
    const monthlyCtx = document.getElementById('monthlyChart')?.getContext('2d');
    if (monthlyCtx) {
      new Chart(monthlyCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Leads',
              data: [12, 19, 15, 17, 14, 18],
              borderColor: '#2196f3',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Conversions',
              data: [8, 12, 10, 13, 9, 14],
              borderColor: '#4caf50',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { usePointStyle: true, boxWidth: 6 }
            }
          },
          scales: {
            y: { beginAtZero: true, grid: { display: true, color: 'rgba(0,0,0,0.05)' } },
            x: { grid: { display: false } }
          }
        }
      });
    }
  };

  const handleViewLead = (id) => {
    alert(`View lead ${id}`);
  };

  const handleEditLead = (id) => {
    alert(`Edit lead ${id}`);
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== id));
    }
  };

  const getBadgeClass = (status) => {
    switch(status) {
      case 'New': return 'badge-info';
      case 'Contacted': return 'badge-warning';
      case 'Follow-up': return 'badge-warning';
      case 'Converted': return 'badge-success';
      case 'Rejected': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  return (
    <div className="section">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          <i className="fas fa-sync-alt"></i> Refresh
        </button>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon leads"><i className="fas fa-user-friends"></i></div>
          <div className="stat-info">
            <h3>{stats.leads}</h3>
            <p>Total Leads</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon clients"><i className="fas fa-user-tie"></i></div>
          <div className="stat-info">
            <h3>{stats.clients}</h3>
            <p>Clients</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon employees"><i className="fas fa-users"></i></div>
          <div className="stat-info">
            <h3>{stats.employees}</h3>
            <p>Employees</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon payout"><i className="fas fa-wallet"></i></div>
          <div className="stat-info">
            <h3>{stats.payouts}</h3>
            <p>Payouts</p>
          </div>
        </div>
      </div>
      
      <div className="chart-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Lead Status Distribution</h3>
            <div className="chart-legend">
              <div className="legend-item"><span className="legend-color" style={{background: '#2196f3'}}></span><span>New: 1</span></div>
              <div className="legend-item"><span className="legend-color" style={{background: '#ff9800'}}></span><span>Contacted: 1</span></div>
              <div className="legend-item"><span className="legend-color" style={{background: '#ffc107'}}></span><span>Follow-up: 1</span></div>
            </div>
          </div>
          <div className="chart-container">
            <canvas id="leadStatusChart"></canvas>
          </div>
        </div>
        
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Monthly Performance</h3>
          </div>
          <div className="chart-container">
            <canvas id="monthlyChart"></canvas>
          </div>
        </div>
      </div>
      
      <div className="content-card">
        <div className="card-header">
          <h2 className="card-title">Recent Leads</h2>
          <button className="btn btn-primary btn-sm" onClick={() => {}}>View All</button>
        </div>
        
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Loan</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.loanType}</td>
                  <td><span className={`badge ${getBadgeClass(lead.status)}`}>{lead.status}</span></td>
                  <td className="action-buttons">
                    <button className="action-btn view" onClick={() => handleViewLead(lead.id)}><i className="fas fa-eye"></i></button>
                    <button className="action-btn edit" onClick={() => handleEditLead(lead.id)}><i className="fas fa-edit"></i></button>
                    <button className="action-btn delete" onClick={() => handleDeleteLead(lead.id)}><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;