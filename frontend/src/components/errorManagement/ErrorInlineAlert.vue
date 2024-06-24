<!-- Component to reuse the error message -->
<template>
    <div class="alert alert-danger" v-if="errorMessage">
      {{ errorMessage }}
    </div>
</template>

<script setup>
// Define props to accept the error message
const props = defineProps({
    errorMessage: String
});

</script>
  