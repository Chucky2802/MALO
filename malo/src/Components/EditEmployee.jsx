import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {
    const { EmployeeID } = useParams();
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        salary: '',
        category: '',
        address: ''
    });

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

        axios.get(`http://localhost:3000/auth/employee/${EmployeeID}`)
            .then(result => {
                if (result.data.Status) {
                    const emp = result.data.Result[0];
                    setEmployee({
                        name: emp.Name,
                        email: emp.Email,
                        salary: emp.Salary,
                        category: emp.Category,
                        address: emp.Address
                    });
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, [EmployeeID]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/auth/EditEmployee/${EmployeeID}`, employee)
            .then(result => {
                console.log(result.data);
                if (!result.data.Status) {
                    alert(result.data.Error);
                } else {
                    navigate('/dashboard/employee-management');
                }
            })
            .catch(err => console.log(err));
    }

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
                            required>
                            <option value=''>Select Category</option>
                            {category.map(c => (
                                <option value={c.Name} key={c.Name}>{c.Name}</option>
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
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Edit Employee</button>
                </form>
            </div>
        </div>
    );
}

export default EditEmployee;
