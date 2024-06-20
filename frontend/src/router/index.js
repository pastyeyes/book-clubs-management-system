import { createRouter, createWebHistory } from 'vue-router'
import TheWelcomeView from '@/views/TheWelcomeView.vue'
import BookView from '@/views/BookView.vue'

const routes = [
  { path: '/', component: TheWelcomeView },
  { path: '/book-view', component: BookView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
