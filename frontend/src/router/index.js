import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
    { path: '/', component: () => import('@/views/WelcomeView.vue') },
    { path: '/login', component: () => import('@/views/LoginView.vue') },
    { path: '/signup', component: () => import('@/views/SignupView.vue') },
    {
        path: '/book-list',
        component: () => import('@/views/BookView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/book-club',
        component: () => import('@/views/BookClubManagementView.vue'),
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
