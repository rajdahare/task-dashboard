import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import ProfileCard from '../components/ProfileCard';
import SearchAndFilter from '../components/SearchAndFilter';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: ''
  });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);

      const response = await axios.get(
        `http://localhost:5000/api/tasks?${params.toString()}`
      );
      setTasks(response.data.data.tasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (taskData) => {
    try {
      await axios.post('http://localhost:5000/api/tasks', taskData);
      toast.success('Task created successfully');
      setShowTaskForm(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, taskData);
      toast.success('Task updated successfully');
      setEditingTask(null);
      setShowTaskForm(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
        toast.success('Task deleted successfully');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-modern-gradient opacity-60 animate-gradient"></div>
      
      {/* Animated background elements - Black circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-black rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-black rounded-full mix-blend-multiply filter blur-3xl opacity-8 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern overlay - Black dots */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDEuMTA0LS44OTYgMi0yIDJIMjZjLTEuMTA0IDAtMi0uODk2LTItMnYtOGMwLTEuMTA0Ljg5Ni0yIDItMmg4YzEuMTA0IDAgMiAuODk2IDIgMnY4eiIgZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMC4wMyIvPjwvZz48L3N2Zz4=')] opacity-20"></div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl sticky top-0 z-50 border-b-2 border-black/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center animate-fadeIn">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-gradient-to-br from-black to-gray-900 rounded-2xl flex items-center justify-center shadow-xl shadow-black/30 border-2 border-black transform hover:rotate-3 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-black text-black tracking-tight">
                  Task Manager
                </h1>
                <p className="text-sm text-gray-600 font-medium mt-0.5">Organize your work efficiently</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-black/30 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex items-center space-x-2 border-2 border-black ripple overflow-hidden font-black"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1 animate-slideIn">
            <ProfileCard />
          </div>

          {/* Right Column - Tasks */}
          <div className="lg:col-span-2 animate-slideInRight">
            <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-10 border-2 border-black/10 hover:border-black/20 hover-lift transition-all duration-500">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-4xl font-black text-black mb-3 tracking-tight">
                    My Tasks
                  </h2>
                  <p className="text-base text-gray-600 font-semibold">
                    Manage and organize your tasks efficiently
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingTask(null);
                    setShowTaskForm(true);
                  }}
                  className="px-7 py-4 bg-black text-white rounded-xl hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-black/30 transform transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-2 font-black border-2 border-black ripple overflow-hidden group"
                >
                  <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>New Task</span>
                </button>
              </div>

              <SearchAndFilter filters={filters} setFilters={setFilters} />

              {showTaskForm && (
                <div className="animate-scaleIn">
                  <TaskForm
                    task={editingTask}
                    onSubmit={editingTask ? (data) => handleUpdateTask(editingTask._id, data) : handleCreateTask}
                    onCancel={() => {
                      setShowTaskForm(false);
                      setEditingTask(null);
                    }}
                  />
                </div>
              )}

              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-black shadow-xl"></div>
                  <p className="mt-8 text-gray-600 font-semibold text-xl">Loading tasks...</p>
                </div>
              ) : (
                <TaskList
                  tasks={tasks}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteTask}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

