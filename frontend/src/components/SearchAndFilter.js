import React from 'react';

const SearchAndFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      priority: ''
    });
  };

  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-2xl border-2 border-black/10 animate-fadeIn hover:border-black/20 transition-all duration-300">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-black text-black mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Tasks
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Search by title or description..."
              className="w-full pl-12 pr-4 py-3.5 border-2 border-black/20 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 input-focus"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-black text-black mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border-2 border-black/20 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 input-focus"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-black text-black mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Priority
            </label>
            <select
              name="priority"
              value={filters.priority}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border-2 border-black/20 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 input-focus"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {(filters.search || filters.status || filters.priority) && (
          <button
            onClick={clearFilters}
            className="w-full px-5 py-3 text-sm font-black text-black bg-white border-2 border-black/20 rounded-xl hover:bg-gray-50 hover:border-black/40 transition-all duration-300 flex items-center justify-center ripple overflow-hidden transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;

