// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlarmList from './components/AlarmList';
import AddAlarm from './components/AddAlarm';
import SaveDetails from './components/SaveDetails';
import './App.css';


function App() {
  const [alarms] = useState([]);
  // const[state,setState]=useState('');

  // const addParam = (value) => {
  //  setState(value);
  // };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AlarmList alarms={alarms} />} />
          <Route path="/add-alarm" element={<AddAlarm  />} />
          <Route path="/details" element={<SaveDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
