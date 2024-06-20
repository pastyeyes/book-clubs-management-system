<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1>Sign Up</h1>
        <hr />
        <div class="alert alert-danger" v-if="error">
          {{ error }}
        </div>
        <form @submit.prevent="signup">
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input type="password" class="form-control" v-model="password" required />
          </div>
          <button type="submit" class="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';

export default {
  setup() {
    const authStore = useAuthStore();
    const email = ref('');
    const password = ref('');
    const error = ref('');
    return {
      authStore,
      email,
      password,
      error
    };
  },
  methods: {
    async signup() {
      try {
          await this.authStore.register({
            email: this.email,
            password: this.password,
          });

          if (this.authStore.user) {
            this.$router.push('/');
          }
      } catch (error) {
          this.error = error.message;
      }
    }
  }
};
</script>
  