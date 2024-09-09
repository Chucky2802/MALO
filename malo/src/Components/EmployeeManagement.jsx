import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeManagement = () => {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/auth/employee")  
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (EmployeeID) => {
        axios.delete("http://localhost:3000/auth/DeleteEmployee/"+EmployeeID)
        .then(result => {
            if(result.data.Status){
                setEmployee(employee.filter(c => c.EmployeeID !== EmployeeID));
            }else {
                alert(result.data.Error);
            }
        })
    }

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Employee List</h3>
            </div>
            <div className='d-flex justify-content-end'>
            </div>
            <Link to="/dashboard/add_Employee" className='btn btn-success'>
                Add Employee
            </Link>
            <div className='mt-3'>
                <div style={{ maxHeight: '1000px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Email</th>
                                <th>Password</th>
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
                            {
                                employee.length > 0 ? (
                                    employee.map(e => (
                                        <tr key={e.EmployeeID}>
                                            <td>{e.Name}</td>
                                            <td>
                                                <img src={'http://localhost:3000/auth/Images/' + e.ImagePath} alt="" className='employee_image'/>
                                            </td>
                                            <td>{e.Email}</td>
                                            <td>{e.Password}</td>
                                            <td>{e.Salary}</td>
                                            <td>{e.Category}</td>
                                            <td>{e.EmployeeType}</td>
                                            <td>{e.HoursWorked}</td>
                                            <td>{e.TasksPerformed}</td>
                                            <td>{e.PerformanceRating}</td>
                                            <td>{e.Address}</td>
                                            <td>
                                                <Link to={'/dashboard/EditEmployee/'+e.EmployeeID} className='btn btn-info btn-sm m-2'>Edit</Link>
                                                <button className='btn btn-warning btn-sm' onClick={() => handleDelete(e.EmployeeID)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="12">No employees found</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmployeeManagement;
