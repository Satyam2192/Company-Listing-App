import React, { useState } from 'react';
import { FaWindowClose } from "react-icons/fa";

function CompanyForm({ onCreate, onCancel, isVisible }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onCreate({ name, location });
      setName('');
      setLocation('');
      onCancel();
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <form onSubmit={handleSubmit} className="z-10 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold ">Add a Company</h2>
          <button
            type="button"
            onClick={onCancel}
            className=" text-red-700 text-2xl mb-4 rounded font-bold"
            >
            <FaWindowClose />

          </button>
        </div>
        {['name', 'location'].map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block text-gray-700 font-bold mb-2">
              {field === 'name' ? 'Name' : 'Location'}
            </label>
            <input
              type="text"
              id={field}
              required
              value={field === 'name' ? name : location}
              onChange={(e) => handleInputChange(e, field === 'name' ? setName : setLocation)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
        <div className="flex justify-end">

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700"
          >
            Create Company
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyForm;
