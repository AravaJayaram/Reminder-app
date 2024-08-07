import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AlarmList.css';

const AlarmList = () => {
  const [alarms, setAlarms] = useState([]);
  const [switchStates, setSwitchStates] = useState({});
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const POLLING_INTERVAL = 10000; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (filter) {
          case 'Today':
            response = await axios.get('http://127.0.0.1:8000/app/backserver/today-alarms/');
            break;
          case 'Weekly':
            response = await axios.get('http://127.0.0.1:8000/app/backserver/WeeklyAlarmsView/');
            break;
          case 'Monthly':
            response = await axios.get('http://127.0.0.1:8000/app/backserver/MonthlyAlarmsView/');
            break;
          case 'Last 12 Months':
            response = await axios.get('http://127.0.0.1:8000/app/backserver/Last12MonthsAlarmsView/');
            break;
          case 'All':
          default:
            response = await axios.get('http://127.0.0.1:8000/api/Alarms/');
            break;
        }
        setAlarms(response.data);
        const initialSwitchStates = {};
        response.data.forEach((alarm) => {
          initialSwitchStates[alarm.id] = alarm.color === 'Green';
        });
        setSwitchStates(initialSwitchStates);
      } catch (error) {
        console.error('Error fetching alarms:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, POLLING_INTERVAL);

    return () => clearInterval(intervalId); 
  }, [filter]);

  const dropdown = async (e) => {
    setFilter(e.target.value);
  };

  const switchAction = (id) => async (e) => {
    const checked = e.target.checked;
    const color = checked ? 'Green' : 'Grey';

    try {
      await axios.patch(`http://127.0.0.1:8000/api/Alarms/${id}/`, { color });

      setSwitchStates({
        ...switchStates,
        [id]: checked
      });

      setAlarms(
        alarms.map((alarm) =>
          alarm.id === id ? { ...alarm, color } : alarm
        )
      );
    } catch (error) {
      console.error('Error updating alarm color:', error);
    }
  };

  const getAlertTime = (alarm) => {
    const alertBeforeMap = {
      '5 minutes': 5,
      '15 minutes': 15,
      '30 minutes': 30,
      '60 minutes': 60
    };

    const alertMinutes = alertBeforeMap[alarm.alert_before] || 0;
    const alarmDate = new Date(alarm.datetime);
    return new Date(alarmDate.getTime() - alertMinutes * 60000);
  };

  const currentDate = new Date();

  return (
    <div>
      <div className="navbar">
        <div className="left-icon" onClick={() => navigate("/details")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="bi bi-person-vcard-fill" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5.0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
          </svg>
        </div>
        <div className="dropdown">
          <select onChange={dropdown}>
            <option value="All">All</option>
            <option value="Today">Today</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Last 12 Months">Last 12 Months</option>
          </select>
        </div>
        <div className="right-icon" onClick={() => navigate("/add-alarm")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a 2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
          </svg>
        </div>
      </div>
      <div className="alarm-list">
        {alarms.map((alarm) => {
          const alertTime = getAlertTime(alarm);
          const isAlertPast = currentDate >= alertTime;
          const backgroundColor = isAlertPast ? alarm.color='white' : alarm.color;

          return (
            <div
              style={{
                backgroundColor: backgroundColor
              }}
              key={alarm.id}
              className="alarm-item"
            >
              <div>
                <h2>{alarm.title}</h2>
                <p>{alarm.description}</p>
              </div>
              <div>
                <p>{new Date(alarm.datetime).toLocaleString()}</p>
                <p>Alert Before: {alarm.alert_before}</p>
                {!isAlertPast && (
                  <Switch
                    checked={switchStates[alarm.id]}
                    onChange={switchAction(alarm.id)}
                    color="default"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlarmList;
