
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddAlarm.css'; 
const AddAlarm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    datetime: '',
    alert_before: '30 minutes',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      // Ensure datetime is in ISO format
      const formattedData = {
        ...formData,
        datetime: new Date(formData.datetime).toISOString(),
      };
     
      await axios.post('http://127.0.0.1:8000/api/Alarms/', formattedData);
      console.log(formData);
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
    }
  };
  const handleAddMore = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
    
      const formattedData = {
        ...formData,
        datetime: new Date(formData.datetime).toISOString(),
      };
     
      await axios.post('http://127.0.0.1:8000/api/Alarms/', formattedData);
      console.log(formData);
      setFormData({
        title: '',
        description: '',
        datetime: '',
        alert_before: '30 minutes',
      })
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date & Time:</label>
          <input
            type="datetime-local"
            name="datetime"
            value={formData.datetime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Alert Before:</label>
          <select
            name="alert_before"
            value={formData.alert_before}
            onChange={handleChange}
          >
            <option value="5 minutes">5 minutes</option>
            <option value="15 minutes">15 minutes</option>
            <option value="30 minutes">30 minutes</option>
            <option value="60 minutes">60 minutes</option>
          </select>
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-save">Save</button>
          <button type="button" onClick={() => navigate('/')} className="btn btn-cancel">Cancel</button>
          <button
            type="button"
            onClick={handleAddMore}
            className="btn btn-add-more"
          >
            Add More
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAlarm;
