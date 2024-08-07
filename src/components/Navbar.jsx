import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import your CSS for styling
//import App from '../App';

const Navbar = () => {
  const navigate = useNavigate();

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    
    switch (value) {
      case 'ALL':
        // Handle ALL action
        break;
      case 'Today':
        // Handle Monthly action
        break;
      case 'Weekly':
        // Handle Weekly action
        break;
      case 'Monthly':
        // Handle Monthly action
        break;
      case 'Last 12 Months':
        // Handle Last 12 Months action
        break;
      default:
        break;
    }
  };

  return (
    <div className="navbar">
      <div className="left-icon" onClick={() => navigate("/details")}>
        {<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
</svg>}
        <svg width="24" height="24" viewBox="0 0 24 24">
          
        </svg>
      </div>
      
      <div className="dropdown">
        <select onChange={handleDropdownChange}>
          <option value="ALL">ALL</option>
          <option value="Today">Today</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Last 12 Months">Last 12 Months</option>
        </select>
      </div>
      <div className="right-icon" onClick={() => navigate("/add-alarm")}>
        {<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
        </svg>}
        
       
    
      </div>
    </div>
  );
};

export default Navbar;
