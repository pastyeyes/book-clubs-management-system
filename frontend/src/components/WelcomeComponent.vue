<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h1>Welcome</h1>
                <h2>Book Club Management System</h2>
                <div v-if="authStore.isAuthenticated">
                    <p>Hello: {{ authStore.user }}</p>
                </div>
                <div v-else>
                    <p>You are not logged in.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();

    return { authStore };
  }
};
</script>