
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPatient = ({ patientId, onClose, onUpdate }) => {
  const [patientData, setPatientData] = useState({});
  
  useEffect(() => {
//get
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`https://backendhospital-ji3g.onrender.com/patients/${patientId}`);
        setPatientData(response.data);
      } catch (error) {
        console.error('Error fetching patient data for editing:', error);
      }
    };

  
    fetchPatientData();
  }, [patientId]);

//put
  const handleUpdate = async () => {
    try { 
      await axios.put(`https://backendhospital-ji3g.onrender.com/patients/${patientId}`, patientData);
      onClose();
      onUpdate();
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  return (
    <div>
      <h2>Edit Patient</h2>
 
      <label>Name: </label>
      <input type="text" value={patientData.name} onChange={(e) => setPatientData({ ...patientData, name: e.target.value })} />
     
      
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditPatient;