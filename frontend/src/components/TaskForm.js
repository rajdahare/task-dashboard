import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        priority: task.priority || 'medium'
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title cannot exceed 200 characters';
    }

    if (formData.description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="mb-8 p-8 bg-white rounded-2xl border-2 border-black shadow-xl animate-scaleIn">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-900 rounded-xl flex items-center justify-center mr-4 border-2 border-black shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-black tracking-tight">
          {task ? 'Edit Task' : 'Create New Task'}
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="animate-fadeIn">
          <label className="block text-sm font-black text-black mb-2">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-300 ${
              errors.title ? 'border-red-500 bg-red-50' : 'border-black/20 bg-white'
            } focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black input-focus`}
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 animate-fadeIn flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.title}
            </p>
          )}
        </div>

        <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <label className="block text-sm font-black text-black mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-300 resize-none ${
              errors.description ? 'border-red-500 bg-red-50' : 'border-black/20 bg-white'
            } focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black input-focus`}
            placeholder="Enter task description (optional)"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 animate-fadeIn flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div>
            <label className="block text-sm font-black text-black mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border-2 border-black/20 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 input-focus"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-black text-black mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border-2 border-black/20 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black transition-all duration-300 input-focus"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4 pt-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <button
            type="submit"
            className="flex-1 px-6 py-4 bg-black text-white rounded-xl hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-black/30 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-black border-2 border-black ripple overflow-hidden"
          >
            {task ? 'Update Task' : 'Create Task'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-4 bg-white text-black border-2 border-black/20 rounded-xl hover:bg-gray-50 hover:border-black/40 focus:outline-none focus:ring-4 focus:ring-black/30 transform transition-all duration-300 hover:scale-105 font-black ripple overflow-hidden"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

