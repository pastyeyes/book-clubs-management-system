<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h3>Login</h3>
        <hr />

        <ErrorAlert :errorMessage="errorMessage" />
        
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label"
              >Email:</label>
            <input type="email" class="form-control" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label"
              >Password:</label>
            <input type="password" class="form-control" v-model="password" required />
          </div>
          <button @mousedown="resetError" type="submit" class="btn btn-primary"
            >Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ErrorAlert from '@/components/errorInline/ErrorInlineNotification.vue';
import { errorStateManagement } from '@/components/errorInline/useErrorInlineNotificationjs'

const { errorMessage, setError, resetError } = errorStateManagement();

const email = ref('');
const password = ref('');

const router = useRouter();

const login = async () => {
  const authStore = useAuthStore();
  
  try{
    await authStore.login({
      email: email.value,
      password: password.value,
    });
    
    if (authStore.isAuthenticated) {
      router.push('/');
    }
  } catch (error) {
    setError(error.message);
  }
};
</script>
