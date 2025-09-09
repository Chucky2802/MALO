import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API =
  import.meta?.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:4000';

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get(`${API}/auth/employee`, { withCredentials: true })
      .then(res => {
        if (res.data.Status) setEmployees(res.data.Result || []);
        else alert(res.data.Error);
      })
      .catch(console.error);
  }, []);

  const handleDelete = async (employeeid) => {
    try {
      const { data } = await axios.delete(`${API}/auth/DeleteEmployee/${employeeid}`, { withCredentials: true });
      if (data.Status) setEmployees(prev => prev.filter(e => e.employeeid !== employeeid));
      else alert(data.Error);
    } catch (e) { console.error(e); }
  };

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Employee List</h3>
        <Link to="/dashboard/add_Employee" className='btn btn-success'>Add Employee</Link>
      </div>

      <div className='mt-3' style={{ maxHeight: 1000, overflowY: 'auto', border: '1px solid #ddd', padding: 10 }}>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Category</th>
              <th>Employee Type</th>
              <th>Hours Worked</th>
              <th>Tasks Performed</th>
              <th>Performance Rating</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length ? employees.map(e => (
              <tr key={e.employeeid}>
                <td>{e.name}</td>
                <td>
                  {e.imagepath ? (
                    <img
                      src={`${API}/images/${encodeURIComponent(e.imagepath)}`}
                      alt={e.name}
                      className='employee_image'
                      style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }}
                    />
                  ) : '—'}
                </td>
                <td>{e.email}</td>
                <td>{e.salary}</td>
                <td>{e.category}</td>
                <td>{e.employeetype}</td>
                <td>{e.hoursworked}</td>
                <td style={{ maxWidth: 240, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {e.tasksperformed}
                </td>
                <td>{e.performancerating}</td>
                <td>{e.address}</td>
                <td>
                  <Link to={`/dashboard/EditEmployee/${e.employeeid}`} className='btn btn-info btn-sm m-2'>Edit</Link>
                  <button className='btn btn-warning btn-sm' onClick={() => handleDelete(e.employeeid)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="11">No employees found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
