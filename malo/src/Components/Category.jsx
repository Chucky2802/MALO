import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/Category").then(result => {
      if (result.data.Status) {
        setCategory(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    }).catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:3000/auth/DeleteCategory/" + id)
      .then(result => {
        if (result.data.Status) {
          setCategory(category.filter(c => c.Id !== id));  
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
      <Link to="/dashboard/add_category" className='btn btn-success'>
        Add Category
      </Link>
      <div className='mt-3'>
        <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                category.map(c => (
                  <tr key={c.Id}>
                    <td>{c.Name}</td>
                    <td>
                      <button className='btn btn-warning btn-sm' onClick={() => handleDelete(c.Id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Category;
