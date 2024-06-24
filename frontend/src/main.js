import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import router from '@/router';
import ToastPlugin from 'vue-toast-notification';

const app = createApp(App)
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(ToastPlugin);
app.mount('#app');