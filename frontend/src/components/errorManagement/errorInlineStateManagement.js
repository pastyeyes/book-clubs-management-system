// Error state management functions
import { ref } from 'vue';

export function errorStateManagement() {
  const errorMessage = ref('');

  const setError = (message) => {
    errorMessage.value = message;
  };

  const resetError = () => {
    errorMessage.value = '';
  };

  return {
    errorMessage,
    setError,
    resetError,
  };
}
