import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/customer")
      .then(result => {
        if (result.data.Status) {
          setCustomers(result.data.Result);
        } else {
          setError(result.data.Error);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError("Failed to fetch customers.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (Id) => {
    axios.delete(`http://localhost:3000/auth/DeleteCustomer/${Id}`)
      .then(result => {
        if (result.data.Status) {
          setCustomers(customers.filter(c => c.Id !== Id));
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Customer List</h3>
      </div>
      <div className='d-flex justify-content-end'>
        <Link to="/dashboard/add_Customer" className='btn btn-success'>
          Add Customer
        </Link>
      </div>
      <div className='mt-3'>
        <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Daily Visits</th>
                <th>Services Utilized</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map(c => (
                  <tr key={c.Id}>
                    <td>{c.Name}</td>
                    <td>
                      {c.Image ? (
                        <img src={`http://localhost:3000/auth/Images/${c.Image}`} alt="" className='customer_image'/>
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{c.Email}</td>
                    <td>{c.Phone_Number}</td>
                    <td>{c.Address}</td>
                    <td>{c.Daily_Visits}</td>
                    <td>{c.Services_Utilized}</td>
                    <td>
                      <Link to={`/dashboard/EditCustomer/${c.Id}`} className='btn btn-info btn-sm m-2'>Edit</Link>
                      <button className='btn btn-warning btn-sm' onClick={() => handleDelete(c.Id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
