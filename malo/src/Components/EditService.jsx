import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditService = () => {
  const { ServiceID } = useParams();
  const navigate = useNavigate();

  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState('');
  const [pricing, setPricing] = useState('Fixed Pricing');
  const [usageFrequency, setUsageFrequency] = useState('');
  const [satisfaction, setSatisfaction] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/Service/${ServiceID}`)
      .then(response => {
        if (response.data.Status) {
          const service = response.data.Result;
          setServiceName(service.Service_Name);
          setDescription(service.Description);
          setCategory(service.Category);
          setDuration(service.Duration);
          setCost(service.Cost);
          setPricing(service.Pricing_Strategy);
          setUsageFrequency(service.Usage_Frequency);
          setSatisfaction(service.Customer_Satisfaction);
        } else {
          alert(response.data.Error);
        }
      })
      .catch(error => console.log(error));
  }, [ServiceID]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/auth/EditService/${ServiceID}`, {
      serviceName,
      description,
      category,
      duration,
      cost,
      pricing,
      usageFrequency,
      satisfaction
    })
    .then(response => {
      if (response.data.Status) {
        navigate('/dashboard/service-management');
      } else {
        alert(response.data.Error);
      }
    })
    .catch(error => console.log(error));
  };

  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <div className='p-3 rounded border' style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className='text-center'>Edit Service</h2>
        <form onSubmit={handleSubmit}>
          <div className='row mb-2'>
            <div className='col-12'>
              <label htmlFor='serviceName'><strong>Service Name:</strong></label>
              <input
                type='text'
                name='serviceName'
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder='Enter Service Name'
                className='form-control form-control-sm'
              />
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-12'>
              <label htmlFor='description'><strong>Description:</strong></label>
              <textarea
                name='description'
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
                name='category'
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
                name='duration'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder='e.g., 1 hour'
                className='form-control form-control-sm'
              />
            </div>
            <div className='col-6'>
              <label htmlFor='cost'><strong>Cost:</strong></label>
              <input
                type='text'
                name='cost'
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder='Enter Cost'
                className='form-control form-control-sm'
              />
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-12'>
              <label htmlFor='pricing'><strong>Pricing Strategy:</strong></label>
              <select
                name='pricing'
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
                name='usageFrequency'
                value={usageFrequency}
                onChange={(e) => setUsageFrequency(e.target.value)}
                placeholder='Times Used'
                className='form-control form-control-sm'
              />
            </div>
            <div className='col-6'>
              <label htmlFor='satisfaction'><strong>Satisfaction:</strong></label>
              <input
                type='number'
                name='satisfaction'
                value={satisfaction}
                onChange={(e) => setSatisfaction(e.target.value)}
                placeholder='1 to 5'
                min='1'
                max='5'
                className='form-control form-control-sm'
              />
            </div>
          </div>
          <button type='submit' className='btn btn-success w-100'>Update Service</button>
        </form>
      </div>
    </div>
  );
};

export default EditService;
