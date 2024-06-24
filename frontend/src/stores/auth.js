import { defineStore } from 'pinia';
import { AUTH_ENDPOINT } from '@/constants.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user, // Getter to check if user is authenticated
  },
  actions: {
    async login(credentials) {
      try {
          const response = await fetch(`${AUTH_ENDPOINT}/auth/login`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials)
          });

          const data = await this.handleResponse(response);
          this.setUserAndToken(data.user, data.token);
      } catch (error) {
        this.handleError('Failed to login', error);
      }
    },
    async register(newUserDetails) {
      try {
        const response = await fetch(`${AUTH_ENDPOINT}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserDetails),
        });

        const data = await this.handleResponse(response);
        this.setUserAndToken(data.user, data.token);
      } catch (error) {
        this.handleError('Failed to register', error);
      }
    },
    async fetchUser() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${AUTH_ENDPOINT}/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error();
          }

          this.user = await response.json();
        } catch (error) {
          this.handleError('Failed to fetch user', error);
        }
      }
    },
    async logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
    // If the query failed, throws error with the error that comes in the response
    // If not failed, will return the response body parsed as json
    async handleResponse(response) {
      const data = await response.json();
      if (!response.ok && response.status === 400) {
        throw new Error(data.message);
      }
      return data;
    },
    // Sets values in the storage
    setUserAndToken(user, token) {
      this.user = user;
      this.token = token;
      localStorage.setItem('token', token);
    },
    handleError(message, error) {
      console.error(message, error);
      throw new Error('Failed');
    }
  }
});
