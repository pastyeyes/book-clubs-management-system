<template>
  <!-- Loads Nav Bar -->
  <Navigation />
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
  import Navigation from '@/components/NavigationComponent.vue';
</script>