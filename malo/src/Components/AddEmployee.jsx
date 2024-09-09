import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

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
        image: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(employee).forEach(key => {
            formData.append(key, employee[key]);
        });

        axios.post('http://localhost:3000/auth/AddEmployee', formData)
            .then(result => {
                if (result.data) {
                    navigate('/dashboard/employee-management');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='p-3 rounded w-50 border'>
                <h2>Add Employee</h2>
                <form onSubmit={handleSubmit} className="grid-container">
                    <div className='grid-item'>
                        <label htmlFor='name'><strong>Name:</strong></label>
                        <input
                            type='text'
                            name='name'
                            placeholder='Enter Name'
                            onChange={(e) => setEmployee({...employee, name: e.target.value})}
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
                            onChange={(e) => setEmployee({...employee, email: e.target.value})}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <div className='grid-item'>
                        <label htmlFor='password'><strong>Password:</strong></label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter Password'
                            onChange={(e) => setEmployee({...employee, password: e.target.value})}
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
                            onChange={(e) => setEmployee({...employee, salary: e.target.value})}
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
                            onChange={(e) => setEmployee({...employee, category: e.target.value})}
                            required>
                            <option value=''>Select Category</option>
                            {category.map(c => (
                                <option value={c.Name} key={c.Name}>{c.Name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='grid-item'>
                        <label htmlFor='employee_type'><strong>Employee Type:</strong></label>
                        <select 
                            name='employee_type' 
                            className='form-control rounded-0' 
                            onChange={(e) => setEmployee({...employee, employee_type: e.target.value})}
                            required>
                            <option value=''>Select Type</option>
                            <option value='full-time'>Full-Time</option>
                            <option value='part-time'>Part-Time</option>
                        </select>
                    </div>
                    <div className='grid-item'>
                        <label htmlFor='hours_worked'><strong>Hours Worked:</strong></label>
                        <input
                            type='number'
                            name='hours_worked'
                            placeholder='Enter Hours Worked'
                            onChange={(e) => setEmployee({...employee, hours_worked: e.target.value})}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <div className='grid-item'>
                        <label htmlFor='tasks_performed'><strong>Tasks Performed:</strong></label>
                        <textarea
                            name='tasks_performed'
                            placeholder='Enter Tasks Performed'
                            onChange={(e) => setEmployee({...employee, tasks_performed: e.target.value})}
                            className='form-control rounded-0'
                            required
                        ></textarea>
                    </div>
                    <div className='grid-item'>
                        <label htmlFor='performance'><strong>Performance Rating:</strong></label>
                        <select
                            name='performance'
                            value={employee.performance}
                            onChange={(e) => setEmployee({...employee, performance: e.target.value})}
                            className='form-control rounded-0'
                            required
                        >
                            <option value=''>Select Rating</option>
                            {[1, 2, 3, 4, 5].map(value => (
                                <option value={value} key={value}>
                                    {value}
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
                            onChange={(e) => setEmployee({...employee, address: e.target.value})}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <div className='grid-item'>
                        <label htmlFor='image'><strong>Select Image:</strong></label>
                        <input
                            type='file'
                            id="inputGroupFile01"
                            name='image'
                            className='form-control rounded-0'
                            onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
                            required
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Add Employee</button>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
