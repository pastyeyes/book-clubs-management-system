<template>
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-md-6">
              <h1>Welcome</h1>
              <h2>Book Club Management System</h2>
              <div v-if="isAuthenticated">
                  <p>Hello: {{ userName }}</p>
              </div>
              <div v-else>
                  <p>You are not logged in.</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const isAuthenticated = computed(() => useAuthStore().isAuthenticated);
const userName = computed(() => useAuthStore().isAuthenticated ? useAuthStore().user.name : '');
</script>