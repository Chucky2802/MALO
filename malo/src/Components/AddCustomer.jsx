import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    services: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(customer).forEach(key => {
      formData.append(key, customer[key]);
    });

    axios.post('http://localhost:3000/auth/AddCustomer', formData)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/customer-management');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <div className='p-3 rounded w-25 border'>
        <h2>Add Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'><strong>Name:</strong></label>
            <input
              type='text'
              name='name'
              placeholder='Enter Name'
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              className='form-control rounded-0'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email:</strong></label>
            <input
              type='email'
              name='email'
              placeholder='Enter Email'
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              className='form-control rounded-0'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='phone'><strong>Phone Number:</strong></label>
            <input
              type='text'
              name='phone'
              placeholder='Enter Phone Number'
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              className='form-control rounded-0'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='address'><strong>Address:</strong></label>
            <input
              type='text'
              name='address'
              placeholder='Enter Address'
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              className='form-control rounded-0'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='services'><strong>Services Utilized:</strong></label>
            <textarea
              name='services'
              placeholder='Enter services utilized by the customer'
              onChange={(e) => setCustomer({ ...customer, services: e.target.value })}
              className='form-control rounded-0'
              required
            ></textarea>
          </div>
          <div className='mb-3'>
            <label htmlFor='image'><strong>Select Image:</strong></label>
            <input
              type='file'
              name='image'
              onChange={(e) => setCustomer({ ...customer, image: e.target.files[0] })}
              className='form-control rounded-0'
            />
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Add Customer</button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
