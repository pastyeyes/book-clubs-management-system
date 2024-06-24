<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/"
            >Home
          </router-link>
        </li>
        <template v-if="!isAuthenticated">
          <li class="nav-item">
            <router-link class="nav-link" to="/login"
              >Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/signup"
              >Signup
            </router-link>
          </li>
        </template>
        <template v-if="isAuthenticated">
          <li class="nav-item">
            <router-link class="nav-link" to="/book-view"
              >Books
            </router-link>
          </li>
          <li class="nav-item">
            <a @click.prevent="onLogout" href="#" class="nav-link"
            >Logout
          </a>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
  
<script setup>
  import { useAuthStore } from '@/stores/auth';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const isAuthenticated = computed(() => useAuthStore().isAuthenticated);
  
  const onLogout = async () => {
      try {
          await useAuthStore().logout();
          router.push('/');
      } catch (error) {
          console.log(error);
          alert('Failed')
      }
  };
</script>
