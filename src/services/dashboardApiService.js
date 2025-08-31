// Dashboard API service for doctor dashboard
const API_BASE_URL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || 'http://localhost:3000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get current user
const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid, redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Authentication required');
  }

  return response;
};

class DashboardApiService {
  // Auth methods
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      if (data.data && data.data.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  async getCurrentUserProfile() {
    try {
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/users/profile`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user');
      }

      return data;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  }

  async updateProfile(userData) {
    try {
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  // Doctor dashboard stats
  async getDoctorStats() {
    try {
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/doctors/dashboard/stats`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch doctor stats');
      }

      return data;
    } catch (error) {
      console.error('Error fetching doctor stats:', error);
      // Return mock data for development
      return {
        success: true,
        data: {
          stats: {
            totalBookings: 45,
            pendingBookings: 12,
            completedBookings: 28,
            monthlyIncome: 1250000 // in cents/paisa
          }
        }
      };
    }
  }

  // Doctor bookings
  async getDoctorBookings(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.limit) queryParams.append('limit', filters.limit);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.date) queryParams.append('date', filters.date);

      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/bookings/doctor-bookings?${queryParams}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch doctor bookings');
      }

      return data;
    } catch (error) {
      console.error('Error fetching doctor bookings:', error);
      // Return mock data for development
      return {
        success: true,
        data: {
          bookings: [
            {
              id: 1,
              user: { name: 'Leslie Alexander', email: 'leslie.alexander@example.com' },
              createdAt: '2024-01-15T09:15:00Z',
              slot: { startTime: '2024-01-15T09:15:00Z', endTime: '2024-01-15T09:45:00Z' },
              status: 'CONFIRMED'
            },
            {
              id: 2,
              user: { name: 'Ronald Richards', email: 'ronald.richards@example.com' },
              createdAt: '2024-01-16T12:00:00Z',
              slot: { startTime: '2024-01-16T12:00:00Z', endTime: '2024-01-16T12:45:00Z' },
              status: 'PENDING'
            },
            {
              id: 3,
              user: { name: 'Jane Cooper', email: 'jane.cooper@example.com' },
              createdAt: '2024-01-17T13:15:00Z',
              slot: { startTime: '2024-01-17T13:15:00Z', endTime: '2024-01-17T13:45:00Z' },
              status: 'COMPLETED'
            }
          ]
        }
      };
    }
  }

  // Update booking status
  async updateBookingStatus(bookingId, status) {
    try {
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/bookings/${bookingId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update booking status');
      }

      return data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  }

  // Get doctor profile
  async getDoctorProfile() {
    try {
      const user = getCurrentUser();
      if (user && user.doctor) {
        return user.doctor;
      }
      
      // If not in localStorage, fetch from API
      const response = await this.getCurrentUserProfile();
      if (response.data.user.doctor) {
        return response.data.user.doctor;
      }
      
      throw new Error('Doctor profile not found');
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
      throw error;
    }
  }

  // Utility methods
  isAuthenticated() {
    return !!getAuthToken();
  }

  getCurrentUserFromStorage() {
    return getCurrentUser();
  }

  isDoctor() {
    const user = this.getCurrentUserFromStorage();
    return user?.role === 'DOCTOR';
  }
}

export default new DashboardApiService();