import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import router from '@/router';
import ToastPlugin from 'vue-toast-notification';

// Instantiate App
const app = createApp(App)
// Instantiate pinia
const pinia = createPinia();

// Enable routing
app.use(router);
// Enable state management
app.use(pinia);
// Enable toast notifications
app.use(ToastPlugin);
// run the app
app.mount('#app');