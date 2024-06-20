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
            const response = await fetch(`${AUTH_ENDPOINT}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            this.user = data.user;
            this.token = data.token;
            this.isAuthenticated = true;
            localStorage.setItem('token', this.token);
        } catch (error) {
            console.error('Failed to login:', error);
            throw new Error(error.message);
        }
    },
    async register(credentials) {
        try {
            const response = await fetch(`${AUTH_ENDPOINT}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            this.user = data.user;
            this.token = data.token;
            this.isAuthenticated = true;
            localStorage.setItem('token', this.token);
        } catch (error) {
            console.error('Failed to register:', error);
            throw new Error(error.message);
        }
    },
    async logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
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
