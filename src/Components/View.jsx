import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const View = () => {
  const [allEmp, setAllEmp] = useState(() => {
    let employees = localStorage.getItem("emp");
    return employees ? JSON.parse(employees) : [];
  });

  const [perPage, setPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [virtualEmp, setVirtualEmp] = useState([]);

  useEffect(() => {
    let lastIndex = perPage * currentPage;
    let firstIndex = lastIndex - perPage;

    let newEmp = [...allEmp];
    let pages = Math.ceil(newEmp.length / perPage);
    setTotalPages(pages);
    setVirtualEmp(newEmp.slice(firstIndex, lastIndex));
  }, [currentPage, allEmp]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    let updatedEmp = JSON.parse(localStorage.getItem("emp"));
    updatedEmp = updatedEmp.filter((emp) => emp.id !== id);
    setAllEmp(updatedEmp);
    localStorage.setItem("emp", JSON.stringify(updatedEmp));
  };

  const handleFilter = (e) => {
    let data = localStorage.getItem("emp");
    data = data ? JSON.parse(data) : [];

    const filterVal = e.target.value.toLowerCase();
    if (filterVal) {
      data = data.filter((emp) =>
        emp.name.toLowerCase().includes(filterVal)
      );
    }

    setAllEmp(data);
  };

  const handleSorting = (e) => {
    e.preventDefault();
    let sorted = [...allEmp];

    if (e.target.value === "asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (e.target.value === "desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (e.target.value === "reset") {
      sorted.sort((a, b) => a.id - b.id);
    }

    setAllEmp(sorted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 rounded-t-xl shadow-lg">
          <h2 className="text-3xl font-bold">Employee Dashboard</h2>
          <p className="text-blue-100 mt-1">View and manage employee records</p>
        </div>

        <div className="bg-gray-800 rounded-b-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search by name..."
                onChange={handleFilter}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <svg 
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <select
                name="sorting"
                onChange={handleSorting}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="" disabled selected>Sort Options</option>
                <option value="asc">Ascending (A-Z)</option>
                <option value="desc">Descending (Z-A)</option>
                <option value="reset">Reset Order</option>
              </select>

              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value={3}>3 per page</option>
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hobby</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {virtualEmp.map((emp, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-750 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img 
                          src={emp.image || 'https://via.placeholder.com/100'} 
                          alt="Employee" 
                          className="h-12 w-12 rounded-full object-cover border-2 border-gray-600"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://via.placeholder.com/100'
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{emp.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{emp.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">{emp.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{emp.hoby?.join(", ") || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{emp.city || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/edit/${emp.id}`}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-xs font-medium transition-colors duration-200 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </Link>
                        <button
                          onClick={(e) => handleDelete(e, emp.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white text-xs font-medium transition-colors duration-200 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {virtualEmp.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium">No employees found</h3>
              <p className="mt-1">Try adjusting your search or filter</p>
            </div>
          )}

          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
              className={`flex items-center px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'} transition-colors duration-200`}
              disabled={currentPage === 1}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'} transition-colors duration-200`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => currentPage !== totalPages && setCurrentPage(currentPage + 1)}
              className={`flex items-center px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'} transition-colors duration-200`}
              disabled={currentPage === totalPages}
            >
              Next
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;