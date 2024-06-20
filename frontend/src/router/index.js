import { createRouter, createWebHistory } from 'vue-router'
import TheWelcomeView from '@/views/TheWelcomeView.vue'
import BookView from '@/views/BookView.vue'
import LoginView from '@/views/LoginView.vue'
import Signup from '@/views/SignupView.vue'

const routes = [
  { path: '/', component: TheWelcomeView },
  { path: '/book-view', component: BookView },
  { path: '/login', component: LoginView },
  { path: '/signup', component: Signup }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
