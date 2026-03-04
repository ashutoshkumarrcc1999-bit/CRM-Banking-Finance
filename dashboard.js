// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardSection from './sections/DashboardSection';
import LeadsSection from './sections/LeadsSection';
import EmployeesSection from './sections/EmployeesSection';
import ClientsSection from './sections/ClientsSection';
import VirtualCardSection from './sections/VirtualCardSection';
import KnowledgeSection from './sections/KnowledgeSection';
import KycSection from './sections/KycSection';
import CibilSection from './sections/CibilSection';
import CommissionSection from './sections/CommissionSection';
import RemindersSection from './sections/RemindersSection';
import './Dashboard.css';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentSection, setCurrentSection] = useState('dashboardSection');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  const showSection = (sectionId) => {
    setLoading(true);
    setCurrentSection(sectionId);
    setMobileOpen(false);
    
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderSection = () => {
    switch(currentSection) {
      case 'dashboardSection': return <DashboardSection />;
      case 'leadsSection': return <LeadsSection />;
      case 'employeesSection': return <EmployeesSection />;
      case 'clientsSection': return <ClientsSection />;
      case 'virtualCardSection': return <VirtualCardSection user={user} />;
      case 'knowledgeSection': return <KnowledgeSection />;
      case 'kycSection': return <KycSection />;
      case 'cibilSection': return <CibilSection />;
      case 'commissionSection': return <CommissionSection />;
      case 'remindersSection': return <RemindersSection />;
      case 'myLeadsSection': return <LeadsSection isMyLeads={true} />;
      case 'myClientsSection': return <ClientsSection isMyClients={true} />;
      case 'calculatorSection': return <div>Calculator Section</div>;
      case 'teamMembersSection': return <EmployeesSection isTeam={true} />;
      case 'raiseIssueSection': return <div>Raise Issue Section</div>;
      case 'myIssuesSection': return <div>My Issues Section</div>;
      default: return <DashboardSection />;
    }
  };

  return (
    <div className="dashboard">
      <Header 
        toggleMobileSidebar={toggleMobileSidebar}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      
      <div className="main-container">
        <Sidebar 
          collapsed={sidebarCollapsed}
          mobileOpen={mobileOpen}
          toggleSidebar={toggleSidebar}
          currentSection={currentSection}
          showSection={showSection}
        />
        
        <main className="main-content">
          {loading ? (
            <div className="section-loader">
              <div className="spinner-small"></div>
              <p>Loading...</p>
            </div>
          ) : (
            renderSection()
          )}
        </main>
      </div>
      
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;