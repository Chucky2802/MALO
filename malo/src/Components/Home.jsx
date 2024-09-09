import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUsers, FaChartLine, FaClock, FaMoneyBillWave, FaTasks, FaPrint } from 'react-icons/fa';

const Home = () => {
  const [employeeTotal, setEmployeeTotal] = useState(0);

  useEffect(() => {
    employeeCount();
  }, []);

  const employeeCount = () => {
    axios.get("http://localhost:3000/auth/employeeCount")
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employees);
        }
      })
      .catch(error => {
        console.error("Error fetching employee count:", error);
      });
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="text-center mb-4">Dashboard Overview</h2>

      <div className="row">
        {/* Customer Metrics */}
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm p-4 bg-white">
            <h4 className="mb-3">Customer Metrics</h4>
            <div className="row g-3">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card border-light shadow-sm p-3 text-center">
                  <FaUsers size={24} className="text-muted mb-2" />
                  <h6>Total Customers</h6>
                  <p className="h5">0</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card border-light shadow-sm p-3 text-center">
                  <FaChartLine size={24} className="text-info mb-2" />
                  <h6>Total Customers Visited</h6>
                  <p className="h5">0</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card border-light shadow-sm p-3 text-center">
                  <FaUsers size={24} className="text-success mb-2" />
                  <h6>Total Active Customers</h6>
                  <p className="h5">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Metrics */}
          <div className="card mb-4 shadow-sm p-4 bg-white">
            <h4 className="mb-3">Service Metrics</h4>
            <div className="row g-3">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card border-light shadow-sm p-3 text-center">
                  <FaTasks size={24} className="text-warning mb-2" />
                  <h6>Total Services Used</h6>
                  <p className="h5">0</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card border-light shadow-sm p-3 text-center">
                  <FaPrint size={24} className="text-primary mb-2" />
                  <h6>Total Documents Printed/Scanned</h6>
                  <p className="h5">0</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card border-light shadow-sm p-3 text-center">
                  <FaMoneyBillWave size={24} className="text-success mb-2" />
                  <h6>Total Revenue</h6>
                  <p className="h5">$0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Metrics */}
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm p-4 bg-white">
            <h4 className="mb-3">Employee Metrics</h4>
            <div className="row g-3">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card border-light shadow-sm p-3 text-center">
                  <FaClock size={24} className="text-success mb-2" />
                  <h6>Total Hours Worked</h6>
                  <p className="h5">0</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card border-light shadow-sm p-3 text-center">
                  <FaTasks size={24} className="text-info mb-2" />
                  <h6>Total Tasks Completed</h6>
                  <p className="h5">0</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card border-light shadow-sm p-3 text-center">
                  <FaUsers size={24} className="text-secondary mb-2" />
                  <h6>Total Active Employees</h6>
                  <p className="h5">{employeeTotal}</p>
                </div>
              </div>
            </div>
          </div>

          {/* List of Admins */}
          <div className="card shadow-sm p-4 bg-white">
            <h4 className="mb-3">List of Admins</h4>
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>admin@example.com</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
