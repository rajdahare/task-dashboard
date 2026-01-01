import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-black text-white border-2 border-black';
      case 'in-progress':
        return 'bg-gray-800 text-white border-2 border-gray-800';
      default:
        return 'bg-white text-black border-2 border-black';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-black text-white border-2 border-black';
      case 'medium':
        return 'bg-gray-600 text-white border-2 border-gray-600';
      default:
        return 'bg-gray-200 text-black border-2 border-gray-300';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 animate-fadeIn">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-black to-gray-900 rounded-full mb-6 border-2 border-black shadow-xl animate-pulse">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-black text-2xl font-black mb-2">No tasks found</p>
        <p className="text-gray-600 text-base mt-2 font-semibold">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-5">
      {tasks.map((task, index) => (
        <div
          key={task._id}
          className="bg-white border-2 border-black/10 rounded-2xl p-6 hover-lift transition-all duration-500 animate-slide-up hover:border-black/30 hover:shadow-xl"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-black text-black mb-3 flex items-center group">
                <span className="w-3 h-3 bg-black rounded-full mr-3 animate-pulse flex-shrink-0"></span>
                <span className="group-hover:text-gray-700 transition-colors">{task.title}</span>
              </h3>
              {task.description && (
                <p className="text-gray-700 mb-5 leading-relaxed font-medium text-base pl-6">{task.description}</p>
              )}
              <div className="flex flex-wrap gap-3 mb-5 pl-6">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-black capitalize shadow-sm ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status.replace('-', ' ')}
                </span>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-black capitalize shadow-sm ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority} priority
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 font-semibold pl-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Created: {new Date(task.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="px-5 py-2.5 text-sm font-black bg-black text-white rounded-xl hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-black/30 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center border-2 border-black ripple overflow-hidden group"
              >
                <svg className="w-4 h-4 mr-1.5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="px-5 py-2.5 text-sm font-black bg-white text-black border-2 border-black rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-black/30 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center ripple overflow-hidden group"
              >
                <svg className="w-4 h-4 mr-1.5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

