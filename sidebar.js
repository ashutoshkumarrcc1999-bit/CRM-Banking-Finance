// components/Sidebar.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = ({ collapsed, mobileOpen, toggleSidebar, currentSection, showSection }) => {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    switch(user?.type) {
      case 'admin':
        return [
          { title: 'Dashboard', icon: 'fas fa-tachometer-alt', section: 'dashboardSection' },
          { title: 'Leads', icon: 'fas fa-user-friends', section: 'leadsSection' },
          { title: 'Employees', icon: 'fas fa-users', section: 'employeesSection' },
          { title: 'Clients', icon: 'fas fa-file-invoice', section: 'clientsSection' },
          { title: 'Virtual Card', icon: 'fas fa-id-card', section: 'virtualCardSection' },
          { title: 'Knowledge Base', icon: 'fas fa-book', section: 'knowledgeSection' },
          { title: 'KYC Guide', icon: 'fas fa-video', section: 'kycSection' },
          { title: 'CIBIL Check', icon: 'fas fa-chart-line', section: 'cibilSection' },
          { title: 'Commission', icon: 'fas fa-percentage', section: 'commissionSection' },
          { title: 'Reminders', icon: 'fas fa-bell', section: 'remindersSection' }
        ];
      case 'manager':
        return [
          { title: 'Dashboard', icon: 'fas fa-tachometer-alt', section: 'dashboardSection' },
          { title: 'Team Leads', icon: 'fas fa-user-friends', section: 'leadsSection' },
          { title: 'Team', icon: 'fas fa-users', section: 'teamMembersSection' },
          { title: 'Virtual Card', icon: 'fas fa-id-card', section: 'virtualCardSection' },
          { title: 'Knowledge', icon: 'fas fa-book', section: 'knowledgeSection' },
          { title: 'KYC', icon: 'fas fa-video', section: 'kycSection' },
          { title: 'Commission', icon: 'fas fa-percentage', section: 'commissionSection' },
          { title: 'Reminders', icon: 'fas fa-bell', section: 'remindersSection' }
        ];
      case 'staff':
        return [
          { title: 'Dashboard', icon: 'fas fa-tachometer-alt', section: 'dashboardSection' },
          { title: 'My Leads', icon: 'fas fa-user-friends', section: 'myLeadsSection' },
          { title: 'My Clients', icon: 'fas fa-file-invoice', section: 'myClientsSection' },
          { title: 'My Card', icon: 'fas fa-id-card', section: 'virtualCardSection' },
          { title: 'Calculator', icon: 'fas fa-calculator', section: 'calculatorSection' },
          { title: 'Knowledge', icon: 'fas fa-book', section: 'knowledgeSection' },
          { title: 'KYC', icon: 'fas fa-video', section: 'kycSection' },
          { title: 'CIBIL', icon: 'fas fa-chart-line', section: 'cibilSection' },
          { title: 'Commission', icon: 'fas fa-percentage', section: 'commissionSection' },
          { title: 'Reminders', icon: 'fas fa-bell', section: 'remindersSection' }
        ];
      case 'franchise':
        return [
          { title: 'Dashboard', icon: 'fas fa-tachometer-alt', section: 'dashboardSection' },
          { title: 'Raise Issue', icon: 'fas fa-exclamation-triangle', section: 'raiseIssueSection' },
          { title: 'My Issues', icon: 'fas fa-list', section: 'myIssuesSection' },
          { title: 'Virtual Card', icon: 'fas fa-id-card', section: 'virtualCardSection' },
          { title: 'Knowledge', icon: 'fas fa-book', section: 'knowledgeSection' },
          { title: 'Commission', icon: 'fas fa-percentage', section: 'commissionSection' }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="fas fa-chevron-left"></i>
      </div>
      
      <ul className="nav-menu">
        {menuItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <a 
              href="#" 
              className={`nav-link ${currentSection === item.section ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                showSection(item.section);
              }}
            >
              <i className={item.icon}></i>
              <span>{item.title}</span>
            </a>
          </li>
        ))}
        
        <li className="nav-item logout-item">
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); logout(); }}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;