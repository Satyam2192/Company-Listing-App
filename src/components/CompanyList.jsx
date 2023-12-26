import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

function CompanyList({ companies, onUpdate, onDelete }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Company Listing</h2>
      <table className="w-full table-auto min-w-full">
        {/* Ensure table width adapts */}
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Location</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company) => {
              const { _id, name, location } = company;

              return (
                <tr key={_id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{name}</td>
                  <td className="py-3 px-6 text-left">{location}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="text-2xl text-black px-4 py-2 rounded font-bold hover:text-green-700"
                      onClick={() => onUpdate(company)}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="text-2xl text-red-500 px-4 py-2 rounded font-bold hover:text-red-700 ml-2"
                      onClick={() => onDelete(_id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No Companies To Show.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyList;