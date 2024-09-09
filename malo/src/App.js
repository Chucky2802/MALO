import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import EmployeeManagement from './Components/EmployeeManagement';
import Category from './Components/Category';
import Profile from './Components/Profile';
import CustomerManagement from './Components/CustomerManagement';
import ServiceManagement from './Components/ServiceManagement';
import Logout from './Components/Logout';
import AddCategory from './Components/AddCategory';
import UserProfile from './Components/UserProfile';
import Settings from './Components/Settings';
import AddEmployee from './Components/AddEmployee';
import AddCustomer from './Components/AddCustomer';
import AddService from './Components/AddService';
import EditEmployee from './Components/EditEmployee';
import EditCustomer from './Components/EditCustomer';
import EditService from './Components/EditService';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/adminlogin' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />}>
                    <Route path='' element={<Home />} />
                    <Route path='/dashboard/employee-management' element={<EmployeeManagement />} />
                    <Route path='/dashboard/Category' element={<Category />} />
                    <Route path='/dashboard/Profile' element={<Profile />} />
                    <Route path='/dashboard/customer-management' element={<CustomerManagement />} />
                    <Route path='/dashboard/service-management' element={<ServiceManagement />} />
                    <Route path='/dashboard/add_category' element={<AddCategory />} />
                    <Route path='/dashboard/add_Customer' element={<AddCustomer />} />
                    <Route path='/dashboard/add_Service' element={<AddService />} />
                    <Route path='/dashboard/add_Employee' element={<AddEmployee />} />
                    <Route path='/dashboard/User-Profile' element={<UserProfile />} />
                    <Route path='/dashboard/Settings' element={<Settings />} />
                    <Route path='/dashboard/Logout' element={<Logout />} />
                    <Route path='/dashboard/EditEmployee/:EmployeeID' element={<EditEmployee />} />
                    <Route path='/dashboard/EditCustomer/:CustomerID' element={<EditCustomer />} />
                    <Route path='/dashboard/EditService/:serviceID' element={<EditService />} />
                </Route>
                <Route path='/home' element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
