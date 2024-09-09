import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCustomer = () => {
  const { CustomerID } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    services: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/customer/${CustomerID}`)
      .then(result => {
        if (result.data.Status) {
          const cust = result.data.Result[0];
          setCustomer({
            name: cust.Name,
            email: cust.Email,
            phone: cust.PhoneNumber,
            address: cust.Address,
            services: cust.ServicesUtilized
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [CustomerID]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/auth/EditCustomer/${CustomerID}`, customer)
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
      <div className='p-3 rounded w-50 border'>
        <h2>Edit Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'><strong>Name:</strong></label>
            <input
              type='text'
              name='name'
              value={customer.name}
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
              value={customer.email}
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
              value={customer.phone}
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
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              className='form-control rounded-0'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='services'><strong>Services Utilized:</strong></label>
            <textarea
              name='services'
              value={customer.services}
              onChange={(e) => setCustomer({ ...customer, services: e.target.value })}
              className='form-control rounded-0'
              required
            ></textarea>
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Update Customer</button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
