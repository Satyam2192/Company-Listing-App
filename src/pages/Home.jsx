import React, { useState, useEffect } from 'react';
import CompanyForm from '../components/CompanyForm';
import CompanyList from '../components/CompanyList';
import EditCompanyForm from '../components/EditCompanyForm';

function Home() {
  const [companies, setCompanies] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('https://enterprisehub.onrender.com//api/v1/getCompany');

        // Check for valid JSON response before parsing
        if (!response.ok || !response.headers.get('Content-Type').startsWith('application/json')) {
          throw new Error('Invalid response from server');
        }

        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
        // Handle error gracefully, e.g., display an error message to the user
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyCreate = async (newCompany) => {
    try {
      const response = await fetch('https://enterprisehub.onrender.com//api/v1/createCompany', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompany),
      });

      if (response.ok) {
        const newData = await response.json();
        setCompanies([...companies, newData.data]);

      } else {
        const errorData = await response.json();
        console.error('Error creating company:', errorData.message); // Log detailed error message
        // Handle error gracefully, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error creating company:', error);
      // Handle network errors or other unexpected issues
    }
  };

  const handleCompanyUpdate = async (updatedCompany) => {
    try {
      const response = await fetch(`https://enterprisehub.onrender.com//api/v1/updateCompany/${updatedCompany._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCompany),
      });

      if (response.ok) {
        const updatedData = await response.json();
        const updatedIndex = companies.findIndex((company) => company._id === updatedData._id);
        setCompanies((prevCompanies) => {
          const newCompanies = [...prevCompanies];
          newCompanies[updatedIndex] = updatedData.data;
          return newCompanies;
        });
        setSelectedCompany(null);
        handleToggleForm();
      } else {
        throw new Error('Failed to update company');
      }
    } catch (error) {
      console.error('Error updating company:', error);
      // Handle other errors as needed
    }
  };

  const handleCompanyDelete = async (companyId) => {
    try {
      const response = await fetch(`https://enterprisehub.onrender.com//api/v1/deleteCompany/${companyId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCompanies(companies.filter((company) => company._id !== companyId));
      } else {
        throw new Error('Failed to delete company');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
    handleToggleForm();
  };

  return (
    <div className="container mx-auto p-6 pt-12 bg-gradient-to-r from-purple-300 to-blue-600 rounded-lg shadow-md">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-white">
        <span className="text-blue-200">Graph</span><span className="text-yellow-300">Bud</span> - Company Listing App
      </h1>
      <button
        className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 mb-6 transition duration-300"
        onClick={handleToggleForm}
      >
        Add a Company
      </button>
      <div className="mb-8">
        <CompanyForm
          onCreate={handleCompanyCreate}
          onCancel={handleToggleForm}
          isVisible={isFormVisible}
        />
      </div>
      <div className="mb-8">
        <EditCompanyForm
          company={selectedCompany}
          onUpdate={handleCompanyUpdate}
          onCancel={() => {
            setSelectedCompany(null);
            handleToggleForm();
          }}
          isVisible={isFormVisible && !!selectedCompany}
        />
      </div>
      <CompanyList
        companies={companies.length > 0 ? companies : []}
        onUpdate={handleEditCompany}
        onDelete={handleCompanyDelete}
      />
    </div>
  );
}

export default Home;