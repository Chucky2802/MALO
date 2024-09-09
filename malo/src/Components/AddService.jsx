import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [duration, setDuration] = useState('');
    const [cost, setCost] = useState('');
    const [pricing, setPricing] = useState('Fixed Pricing');
    const [usageFrequency, setUsageFrequency] = useState('');
    const [satisfaction, setSatisfaction] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            serviceName,
            description,
            category,
            duration,
            cost,
            pricing,
            usageFrequency,
            satisfaction
        };

        axios.post('http://localhost:3000/auth/AddService', data)
            .then(response => {
                if (response.data.Status) {
                    alert(response.data.Message);
                    navigate('/dashboard/service-management'); 
                } else {
                    alert(response.data.Error);
                }
            })
            .catch(err => {
                console.error("Error adding service:", err);
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='p-3 rounded border' style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className='text-center'>Add Service</h2>
                <form onSubmit={handleSubmit}>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <label htmlFor='serviceName'><strong>Service Name:</strong></label>
                            <input
                                type='text'
                                id='serviceName'
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                placeholder='Enter Service Name'
                                className='form-control form-control-sm'
                                required
                            />
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <label htmlFor='description'><strong>Description:</strong></label>
                            <textarea
                                id='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Enter Service Description'
                                className='form-control form-control-sm'
                                rows='2'
                            ></textarea>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <label htmlFor='category'><strong>Category:</strong></label>
                            <select
                                id='category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='form-control form-control-sm'
                            >
                                <option value='document'>Document Services</option>
                                <option value='electricity'>Electricity Tokens & Airtime</option>
                                <option value='it'>IT Services</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-6'>
                            <label htmlFor='duration'><strong>Duration:</strong></label>
                            <input
                                type='text'
                                id='duration'
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder='e.g., 1 hour'
                                className='form-control form-control-sm'
                            />
                        </div>
                        <div className='col-6'>
                            <label htmlFor='cost'><strong>Cost:</strong></label>
                            <input
                                type='number'
                                id='cost'
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                                placeholder='Enter Cost'
                                className='form-control form-control-sm'
                                step='0.01'
                                min='0'
                            />
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <label htmlFor='pricing'><strong>Pricing Strategy:</strong></label>
                            <select
                                id='pricing'
                                value={pricing}
                                onChange={(e) => setPricing(e.target.value)}
                                className='form-control form-control-sm'
                            >
                                <option value='Fixed Pricing'>Fixed Pricing</option>
                                <option value='Variable Pricing'>Variable Pricing</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-6'>
                            <label htmlFor='usageFrequency'><strong>Usage Frequency:</strong></label>
                            <input
                                type='number'
                                id='usageFrequency'
                                value={usageFrequency}
                                onChange={(e) => setUsageFrequency(e.target.value)}
                                placeholder='Times Used'
                                className='form-control form-control-sm'
                                min='0'
                            />
                        </div>
                        <div className='col-6'>
                            <label htmlFor='satisfaction'><strong>Satisfaction:</strong></label>
                            <input
                                type='number'
                                id='satisfaction'
                                value={satisfaction}
                                onChange={(e) => setSatisfaction(e.target.value)}
                                placeholder='1 to 5'
                                className='form-control form-control-sm'
                                min='1'
                                max='5'
                            />
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Add Service</button>
                </form>
            </div>
        </div>
    );
}

export default AddService;
