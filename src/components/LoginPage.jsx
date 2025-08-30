import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardApiService from '../services/dashboardApiService';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await dashboardApiService.login(credentials);
      if (response.success) {
        navigate('/');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-light-black rounded-xl shadow-lg border border-zinc-800 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-off-white">Doctor Dashboard</h2>
          <p className="text-medium-gray mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-off-white mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-light-black bg-dark-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent text-off-white placeholder-medium-gray"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-off-white mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-light-black bg-dark-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent text-off-white placeholder-medium-gray"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-green text-black font-medium py-3 px-4 rounded-lg hover:bg-dark-green focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-medium-gray text-sm">
            Demo credentials: doctor@example.com / password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;