import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API =
  import.meta?.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:4000';

export default function AddEmployee() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    category: '',
    employee_type: '',
    hours_worked: '',
    tasks_performed: '',
    performance: '',
    address: '',
    image: null
  });

  useEffect(() => {
    axios.get(`${API}/auth/category`, { withCredentials: true })
      .then(r => r.data.Status ? setCategory(r.data.Result || []) : alert(r.data.Error))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(employee).forEach(([k, v]) => fd.append(k, v ?? ''));

    try {
      const { data } = await axios.post(`${API}/auth/AddEmployee`, fd, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (data.Status) navigate('/dashboard/employee-management');
      else alert(data.Error);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <div className='p-3 rounded w-50 border'>
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit} className="grid-container">
          <div className='grid-item'>
            <label><strong>Name:</strong></label>
            <input type='text' className='form-control rounded-0'
              onChange={(e) => setEmployee(s => ({ ...s, name: e.target.value }))} required />
          </div>
          <div className='grid-item'>
            <label><strong>Email:</strong></label>
            <input type='email' className='form-control rounded-0'
              onChange={(e) => setEmployee(s => ({ ...s, email: e.target.value }))} required />
          </div>
          <div className='grid-item'>
            <label><strong>Password:</strong></label>
            <input type='password' className='form-control rounded-0'
              onChange={(e) => setEmployee(s => ({ ...s, password: e.target.value }))} required />
          </div>
          <div className='grid-item'>
            <label><strong>Salary:</strong></label>
            <input type='text' className='form-control rounded-0'
              onChange={(e) => setEmployee(s => ({ ...s, salary: e.target.value }))} required />
          </div>
          <div className='grid-item'>
            <label><strong>Category:</strong></label>
            <select className='form-control rounded-0'
              onChange={(e) => setEmployee(s => ({ ...s, category: e.target.value }))} required>
              <option value=''>Select Category</option>
              {category.map(c => (
                <option value={c.name || c.Name} key={c.name || c.Name}>
                  {c.name || c.Name}
                </option>
              ))}
            </select>
          </div>
          <div className='grid-item'>
            <label><strong>Employee Type:</strong></label>
            <select className='form-control rounded-0'
              onChange={(e) => setEmployee(s => ({ ...s, employee_type: e.target.value }))} required>
              <option value=''>Select Type</option>
              <option value='full-time'>Full-Time</option>
              <option value='part-time'>Part-Time</option>
            </select>
          </div>
          <div className='grid-item'>
            <label><strong>Hours Worked:</strong></label>
            <input type='number' className='form-control rounded-0'
              onChange={(e) => setEmployee(s => ({ ...s, hours_worked: e.target.value }))} required />
          </div>
          <div className='grid-item'>
            <label><strong>Tasks Performed:</strong></label>
            <textarea className='form-control rounded-0'
              onChange={(e) => setEmployee(s => ({ ...s, tasks_performed: e.target.value }))} required />
          </div>
          <div className='grid-item'>
            <label><strong>Performance Rating:</strong></label>
            <select className='form-control rounded-0'
              onChange={(e) => setEmployee(s => ({ ...s, performance: e.target.value }))} required>
              <option value=''>Select Rating</option>
              {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className='grid-item'>
            <label><strong>Address:</strong></label>
            <input type='text' className='form-control rounded-0'
              onChange={(e) => setEmployee(s => ({ ...s, address: e.target.value }))} required />
          </div>
          <div className='grid-item'>
            <label><strong>Select Image:</strong></label>
            <input type='file' className='form-control rounded-0'
              onChange={(e) => setEmployee(s => ({ ...s, image: e.target.files?.[0] || null }))} required />
          </div>

          <button className='btn btn-success w-100 rounded-0 mb-2'>Add Employee</button>
        </form>
      </div>
    </div>
  );
}
