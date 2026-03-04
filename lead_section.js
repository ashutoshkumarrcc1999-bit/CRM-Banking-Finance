// components/sections/LeadsSection.js
import React, { useState } from 'react';
import './Section.css';

const LeadsSection = ({ isMyLeads = false }) => {
  const [leads, setLeads] = useState([
    { id: 1, name: 'Rahul Sharma', phone: '+91 9876543210', email: 'rahul@email.com', loanType: 'Home Loan', amount: '₹35,00,000', status: 'New', followup: '2024-01-15' },
    { id: 2, name: 'Priya Patel', phone: '+91 8765432109', email: 'priya@email.com', loanType: 'Personal Loan', amount: '₹5,00,000', status: 'Contacted', followup: '2024-01-18' },
    { id: 3, name: 'Amit Kumar', phone: '+91 7654321098', email: 'amit@email.com', loanType: 'Car Loan', amount: '₹8,50,000', status: 'Follow-up', followup: '2024-01-12' }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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

  const handleAddLead = () => {
    setEditingLead(null);
    setShowModal(true);
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setShowModal(true);
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== id));
    }
  };

  const handleSaveLead = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLead = {
      id: editingLead ? editingLead.id : leads.length + 1,
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      loanType: formData.get('loanType'),
      amount: formData.get('amount'),
      status: formData.get('status'),
      followup: new Date().toISOString().split('T')[0]
    };

    if (editingLead) {
      setLeads(leads.map(lead => lead.id === editingLead.id ? newLead : lead));
    } else {
      setLeads([...leads, newLead]);
    }
    
    setShowModal(false);
  };

  return (
    <div className="section">
      <div className="page-header">
        <h1 className="page-title">{isMyLeads ? 'My Leads' : 'Leads Management'}</h1>
        <div className="header-actions">
          <button className="btn btn-success" onClick={handleAddLead}>
            <i className="fas fa-plus"></i> Add Lead
          </button>
          <button className="btn btn-primary" onClick={() => setShowDemoModal(true)}>
            <i className="fas fa-eye"></i> Demo Sample
          </button>
        </div>
      </div>
      
      <div className="filter-section">
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <select 
            className="filter-select" 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Converted">Converted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Search</label>
          <input 
            type="text" 
            className="filter-input" 
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="content-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Loan Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Follow-up</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.email}</td>
                  <td>{lead.loanType}</td>
                  <td>{lead.amount}</td>
                  <td><span className={`badge ${getBadgeClass(lead.status)}`}>{lead.status}</span></td>
                  <td>{lead.followup}</td>
                  <td className="action-buttons">
                    <button className="action-btn view" onClick={() => setShowDemoModal(true)}><i className="fas fa-eye"></i></button>
                    <button className="action-btn edit" onClick={() => handleEditLead(lead)}><i className="fas fa-edit"></i></button>
                    <button className="action-btn delete" onClick={() => handleDeleteLead(lead.id)}><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add/Edit Lead Modal */}
      {showModal && (
        <div className="modal" style={{display: 'flex'}}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{editingLead ? 'Edit Lead' : 'Add Lead'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSaveLead}>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" name="name" defaultValue={editingLead?.name || ''} required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" className="form-control" name="phone" defaultValue={editingLead?.phone || ''} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" name="email" defaultValue={editingLead?.email || ''} required />
                </div>
                <div className="form-group">
                  <label>Loan Type</label>
                  <select className="form-control" name="loanType" defaultValue={editingLead?.loanType || 'Home Loan'}>
                    <option>Home Loan</option>
                    <option>Personal Loan</option>
                    <option>Business Loan</option>
                    <option>Car Loan</option>
                    <option>Gold Loan</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input type="text" className="form-control" name="amount" defaultValue={editingLead?.amount || '₹5,00,000'} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select className="form-control" name="status" defaultValue={editingLead?.status || 'New'}>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Follow-up</option>
                    <option>Converted</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Save Lead</button>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Demo Modal */}
      {showDemoModal && (
        <div className="modal" style={{display: 'flex'}}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Lead Demo - Sample Documents</h2>
              <button className="modal-close" onClick={() => setShowDemoModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Client Name</label>
                <input type="text" className="form-control" value="Rahul Sharma" readOnly />
              </div>
              <div className="form-group">
                <label>Loan Type</label>
                <input type="text" className="form-control" value="Home Loan" readOnly />
              </div>
              <div className="form-group">
                <label>Sample Documents</label>
                <div className="documents-list">
                  <div className="document-item">
                    <span><i className="fas fa-file-pdf" style={{color: '#f44336'}}></i> KYC_Form.pdf</span>
                    <button className="action-btn download" onClick={() => alert('Downloading KYC_Form.pdf')}><i className="fas fa-download"></i></button>
                  </div>
                  <div className="document-item">
                    <span><i className="fas fa-file-image" style={{color: '#ff9800'}}></i> Aadhar_Card.jpg</span>
                    <button className="action-btn download" onClick={() => alert('Downloading Aadhar_Card.jpg')}><i className="fas fa-download"></i></button>
                  </div>
                  <div className="document-item">
                    <span><i className="fas fa-file-alt" style={{color: '#2196f3'}}></i> Income_Proof.pdf</span>
                    <button className="action-btn download" onClick={() => alert('Downloading Income_Proof.pdf')}><i className="fas fa-download"></i></button>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={() => window.print()}><i className="fas fa-print"></i> Print</button>
                <button className="btn btn-success" onClick={() => alert('Downloading all documents')}><i className="fas fa-download"></i> Download All</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsSection;