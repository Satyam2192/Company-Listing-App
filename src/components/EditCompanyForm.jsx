import React, { useState, useEffect } from 'react';
import { FaWindowClose } from "react-icons/fa";

function EditCompanyForm({ company, onUpdate, onCancel, isVisible }) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        // Populate form fields when the company prop changes
        if (company) {
            setName(company.name || '');
            setLocation(company.location || '');
        }
    }, [company]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await onUpdate({ _id: company._id, name, location });
            onCancel(); // Close the form after update
        } catch (error) {
            console.error('Error updating company:', error);
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <form onSubmit={handleSubmit} className="z-10 bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between">

                    <h2 className="text-2xl font-bold mb-4">Edit Company</h2>
                    <button
                        type="button"
                        onClick={onCancel}
                        className=" text-red-700 text-2xl mb-4 rounded font-bold"
                    >
                        <FaWindowClose />

                    </button></div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex justify-end">

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700"
                    >
                        Update Company
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditCompanyForm;
