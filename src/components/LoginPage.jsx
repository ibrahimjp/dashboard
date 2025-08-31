import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [flipDone, setFlipDone] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(credentials);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Flip only once on page load
  useEffect(() => {
    const timer = setTimeout(() => setFlipDone(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        transition={{ duration: 1, ease: 'easeInOut' }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0px 0px 20px rgba(0,255,150,0.4)',
          rotateX: 5,
          rotateY: 5,
        }}
        className="max-w-md w-full bg-light-black rounded-xl shadow-lg border border-zinc-800 p-8"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-off-white">Doctor Dashboard</h2>
          <p className="text-medium-gray mt-2">Sign in to your account</p>
        </div>

        {error && (
          <motion.div
            className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg"
            animate={{ x: [-10, 10, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-off-white mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-light-black bg-dark-bg rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-primary-green 
                        focus:border-transparent text-off-white placeholder-medium-gray
                        transition duration-300 focus:shadow-[0_0_10px_rgba(0,255,150,0.6)]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-off-white mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-light-black bg-dark-bg rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-primary-green 
                        focus:border-transparent text-off-white placeholder-medium-gray
                        transition duration-300 focus:shadow-[0_0_10px_rgba(0,255,150,0.6)]"
              placeholder="Enter your password"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            animate={isLoading ? { scale: [1, 1.05, 1] } : {}}
            transition={isLoading ? { repeat: Infinity, duration: 0.6 } : {}}
            className="w-full bg-primary-green text-black font-medium py-3 px-4 rounded-lg 
                      hover:bg-dark-green focus:outline-none focus:ring-2 
                      focus:ring-primary-green focus:ring-offset-2 focus:ring-offset-dark-bg 
                      disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default LoginPage;