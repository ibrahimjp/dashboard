// Dashboard API service for doctor dashboard
const API_BASE_URL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || 'http://localhost:3000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
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
      if (data.data.token) {
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

  async getCurrentUser() {
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
      throw error;
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
      throw error;
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
      const user = await this.getCurrentUser();
      if (user.data.user.doctor) {
        return user.data.user.doctor;
      }
      throw new Error('Doctor profile not found');
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
      throw error;
    }
  }

  // Create doctor profile
  async createDoctorProfile(doctorData) {
    try {
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/doctors`, {
        method: 'POST',
        body: JSON.stringify(doctorData),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create doctor profile');
      }

      return data;
    } catch (error) {
      console.error('Error creating doctor profile:', error);
      throw error;
    }
  }

  // Update doctor profile
  async updateDoctorProfile(doctorId, updateData) {
    try {
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/doctors/${doctorId}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update doctor profile');
      }

      return data;
    } catch (error) {
      console.error('Error updating doctor profile:', error);
      throw error;
    }
  }

  // Get specialties
  async getSpecialties() {
    try {
      const response = await fetch(`${API_BASE_URL}/specialties`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch specialties');
      }

      return data;
    } catch (error) {
      console.error('Error fetching specialties:', error);
      throw error;
    }
  }

  // Utility methods
  isAuthenticated() {
    return !!getAuthToken();
  }

  getCurrentUserFromStorage() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isDoctor() {
    const user = this.getCurrentUserFromStorage();
    return user?.role === 'DOCTOR';
  }
}

export default new DashboardApiService();
