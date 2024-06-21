import { defineStore } from 'pinia';
import { AUTH_ENDPOINT } from './env/constants';

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

            if (!response.ok) {
                throw new Error(`Login failed. Error: ${response.status}`);
            }

            const data = await response.json();
            this.user = data.user; //should not include password
            this.token = data.token;
            localStorage.setItem('token', this.token);
        } catch (error) {
            console.error('Failed to login:', error);
            throw new Error(error.message);
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

            if (!response.ok) {
                throw new Error(`Registration failed. Error: ${response.status}`);
            }

            const data = await response.json();
            this.user = data.user; //should not include password
            this.token = data.token;
            localStorage.setItem('token', this.token);
        } catch (error) {
            console.error('Failed to register:', error);
            throw new Error(error.message);
        }
    },
    async logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
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
            throw new Error('Network response was not ok');
          }

          this.user = await response.json();
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    },
  },
});
