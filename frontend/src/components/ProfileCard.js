import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/profile');
      setProfile(response.data.data.user);
      setFormData({
        name: response.data.data.user.name,
        email: response.data.data.user.email
      });
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

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

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await axios.put('http://localhost:5000/api/profile', formData);
      setProfile(response.data.data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="bg-white backdrop-blur-xl rounded-2xl shadow-xl p-6 border-2 border-black/10">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-black/10 hover:border-black/20 hover-lift animate-fadeIn transition-all duration-500">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-black text-black tracking-tight">
          Profile
        </h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm font-black text-black hover:text-gray-700 transition-all duration-300 flex items-center border-2 border-black/20 px-4 py-2 rounded-xl hover:border-black/40 hover:scale-105 shadow-sm hover:shadow-md ripple overflow-hidden"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 animate-scaleIn">
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-black/20 bg-white'
              } focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black input-focus`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 animate-fadeIn">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border-2 rounded-lg transition-all duration-200 ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-black/20 bg-white'
              } focus:outline-none focus:ring-2 focus:ring-black focus:border-black`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 animate-fadeIn">{errors.email}</p>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-black/30 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-black border-2 border-black ripple overflow-hidden"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: profile.name,
                  email: profile.email
                });
                setErrors({});
              }}
              className="flex-1 px-5 py-3 bg-white text-black border-2 border-black/20 rounded-xl hover:bg-gray-50 hover:border-black/40 focus:outline-none focus:ring-4 focus:ring-black/30 transform transition-all duration-300 hover:scale-105 font-black ripple overflow-hidden"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-5 animate-fadeIn">
          <div className="flex items-center space-x-4 p-5 bg-gradient-to-br from-black to-gray-900 rounded-2xl border-2 border-black shadow-lg">
            <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center font-black text-xl border-2 border-white shadow-md">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-white/70 font-semibold uppercase tracking-wider mb-1">Name</p>
              <p className="text-lg font-black text-white">{profile?.name}</p>
            </div>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl border-2 border-black/10 hover:border-black/20 transition-all duration-300">
            <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Email</p>
            <p className="text-base font-bold text-black">{profile?.email}</p>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl border-2 border-black/10 hover:border-black/20 transition-all duration-300">
            <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Role</p>
            <span className="inline-block px-4 py-1.5 bg-black text-white rounded-full text-sm font-black capitalize border-2 border-black shadow-sm">
              {profile?.role || 'user'}
            </span>
          </div>
          {profile?.createdAt && (
            <div className="p-5 bg-gray-50 rounded-2xl border-2 border-black/10 hover:border-black/20 transition-all duration-300">
              <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Member since</p>
              <p className="text-base font-bold text-black">
                {new Date(profile.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;

