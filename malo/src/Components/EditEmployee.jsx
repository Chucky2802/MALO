import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API =
  import.meta?.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:4000';

export default function EditEmployee() {
  const { EmployeeID } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: '', email: '', salary: '', category: '', address: ''
  });
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get(`${API}/auth/category`, { withCredentials: true })
      .then(r => r.data.Status ? setCategory(r.data.Result || []) : alert(r.data.Error))
      .catch(console.error);

    axios.get(`${API}/auth/employee/${EmployeeID}`, { withCredentials: true })
      .then(r => {
        if (!r.data.Status || !r.data.Result?.length) return alert(r.data.Error || 'Employee not found');
        const emp = r.data.Result[0];
        setEmployee({
          name: emp.name || '',
          email: emp.email || '',
          salary: emp.salary || '',
          category: emp.category || '',
          address: emp.address || ''
        });
      })
      .catch(console.error);
  }, [EmployeeID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${API}/auth/EditEmployee/${EmployeeID}`, employee, { withCredentials: true })
      .then(r => r.data.Status ? navigate('/dashboard/employee-management') : alert(r.data.Error))
      .catch(console.error);
  };

  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <div className='p-3 rounded w-50 border'>
        <h2>Edit Employee</h2>
        <form className="grid-container" onSubmit={handleSubmit}>
          <div className='grid-item'>
            <label htmlFor='name'><strong>Name:</strong></label>
            <input
              type='text'
              name='name'
              placeholder='Enter Name'
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
              className='form-control rounded-0'
              required
            />
          </div>
          <div className='grid-item'>
            <label htmlFor='email'><strong>Email:</strong></label>
            <input
              type='email'
              name='email'
              placeholder='Enter Email'
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
              className='form-control rounded-0'
              required
            />
          </div>
          <div className='grid-item'>
            <label htmlFor='salary'><strong>Salary:</strong></label>
            <input
              type='text'
              name='salary'
              placeholder='Enter Salary'
              value={employee.salary}
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
              className='form-control rounded-0'
              required
            />
          </div>
          <div className='grid-item'>
            <label htmlFor='category'><strong>Category:</strong></label>
            <select
              name='category'
              id='category'
              className='form-control rounded-0'
              value={employee.category}
              onChange={(e) => setEmployee({ ...employee, category: e.target.value })}
              required
            >
              <option value=''>Select Category</option>
              {category.map(c => (
                <option value={c.name || c.Name} key={c.name || c.Name}>
                  {c.name || c.Name}
                </option>
              ))}
            </select>
          </div>
          <div className='grid-item'>
            <label htmlFor='address'><strong>Address:</strong></label>
            <input
              type='text'
              name='address'
              placeholder='Enter Address'
              value={employee.address}
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
              className='form-control rounded-0'
              required
            />
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Save Changes</button>
        </form>
      </div>
    </div>
  );
}
