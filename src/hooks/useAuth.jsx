import { useState, useEffect, createContext, useContext } from 'react';
import dashboardApiService from '../services/dashboardApiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (dashboardApiService.isAuthenticated()) {
          const userData = dashboardApiService.getCurrentUserFromStorage();
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Try to fetch fresh user data
            const response = await dashboardApiService.getCurrentUserProfile();
            if (response.success) {
              setUser(response.data.user);
              setIsAuthenticated(true);
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        dashboardApiService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await dashboardApiService.login(credentials);
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response;
      }
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    dashboardApiService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
