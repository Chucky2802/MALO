import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/services")
      .then(result => {
        if (result.data.Status) {
          setServices(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (ServiceID) => {
    axios.delete(`http://localhost:3000/auth/DeleteService/${ServiceID}`)
      .then(result => {
        if (result.data.Status) {
          setServices(services.filter(s => s.Id !== ServiceID));
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Services</h3>
      </div>
      <div className='d-flex justify-content-end'>
        <Link to="/dashboard/add_Service" className='btn btn-success'>
          Add Service
        </Link>
      </div>
      <div className='mt-3'>
        <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
          <table className='table'>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Cost</th>
                <th>Pricing Strategy</th>
                <th>Usage Frequency</th>
                <th>Customer Satisfaction</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map(s => (
                  <tr key={s.Id}>
                    <td>{s.Service_Name}</td>
                    <td>{s.Description}</td>
                    <td>{s.Category}</td>
                    <td>{s.Duration}</td>
                    <td>{s.Cost}</td>
                    <td>{s.Pricing_Strategy}</td>
                    <td>{s.Usage_Frequency}</td>
                    <td>{s.Customer_Satisfaction}</td>
                    <td>
                      <Link to={`/dashboard/EditService/${s.Id}`} className='btn btn-info btn-sm m-2'>Edit</Link>
                      <button className='btn btn-warning btn-sm' onClick={() => handleDelete(s.Id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No services found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;
