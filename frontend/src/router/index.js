import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import BookView from '@/views/BookView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'

const routes = [
  { path: '/', component: WelcomeView },
  { path: '/book-view', component: BookView },
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignupView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
