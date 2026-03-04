// components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './Login.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState('password');
  const [email, setEmail] = useState('admin@bankfinance.com');
  const [password, setPassword] = useState('admin123');
  const [userType, setUserType] = useState('admin');
  const [phone, setPhone] = useState('+91 9876543210');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { themeNames, theme } = useTheme();

  const getUserDataByType = (type) => {
    const userMap = {
      admin: { name: 'Admin User', role: 'Administrator', avatar: 'A', department: 'Admin' },
      manager: { name: 'Rajesh Kumar', role: 'Team Lead', avatar: 'R', department: 'Sales' },
      staff: { name: 'Pooja Desai', role: 'Loan Officer', avatar: 'P', department: 'Sales' },
      franchise: { name: 'Mumbai Franchise', role: 'Partner', avatar: 'M', department: 'Franchise' }
    };
    return userMap[type] || userMap.admin;
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const userData = {
        ...getUserDataByType(userType),
        email,
        type: userType
      };
      login(userData);
      setLoading(false);
    }, 1500);
  };

  const handleSendOTP = () => {
    alert(`OTP sent to ${phone}`);
  };

  const handleVerifyOTP = () => {
    if (otp.every(digit => digit)) {
      setLoading(true);
      setTimeout(() => {
        const userData = {
          name: 'Staff User',
          role: 'Sales Executive',
          avatar: 'S',
          department: 'Sales',
          type: 'staff',
          email: 'staff@bankfinance.com'
        };
        login(userData);
        setLoading(false);
      }, 1500);
    } else {
      alert('Please enter complete OTP');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  if (isAuthenticated) return null;

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-brand">
          <h1>BankFinance CRM</h1>
          <p>Complete financial management and customer relationship platform for modern banking institutions.</p>
          <div className="brand-tags">
            <span>Secure Login</span>
            <span>CIBIL Check</span>
            <span>Loan Calculator</span>
          </div>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-form-container">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your account</p>
          </div>
          
          <div className="login-tabs">
            <button 
              className={`login-tab ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              Password
            </button>
            <button 
              className={`login-tab ${activeTab === 'otp' ? 'active' : ''}`}
              onClick={() => setActiveTab('otp')}
            >
              OTP
            </button>
          </div>
          
          {activeTab === 'password' && (
            <div className="login-form active">
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="form-group">
                <label>Login As</label>
                <select 
                  className="form-control" 
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager/Team Lead</option>
                  <option value="staff">Staff</option>
                  <option value="franchise">Franchise</option>
                </select>
              </div>
              
              <button 
                className="btn btn-primary login-btn" 
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <><i className="fas fa-spinner fa-spin"></i> Authenticating...</>
                ) : (
                  'Login to Dashboard'
                )}
              </button>
            </div>
          )}
          
          {activeTab === 'otp' && (
            <div className="login-form active">
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <button 
                className="btn btn-primary login-btn" 
                onClick={handleSendOTP}
                style={{ marginBottom: '20px' }}
              >
                Send OTP
              </button>
              
              <div className="form-group">
                <label>Enter OTP</label>
                <div className="otp-group">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      className="otp-input"
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>
              
              <button 
                className="btn btn-primary login-btn" 
                onClick={handleVerifyOTP}
                disabled={loading}
              >
                {loading ? (
                  <><i className="fas fa-spinner fa-spin"></i> Verifying...</>
                ) : (
                  'Verify OTP & Login'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;