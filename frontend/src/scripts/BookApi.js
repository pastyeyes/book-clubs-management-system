import { onMounted, ref } from 'vue'
import { API_ENDPOINT } from './env/constants';

export const inputBookTitle = ref('');
export const books = ref([]);
export async function getBookByTitle() {
  console.log(inputBookTitle.value);
  try {
    if (!inputBookTitle.value) {
      return;
    }
    const response = await fetch(`${API_ENDPOINT}/api/book/title/${inputBookTitle.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      const data = await response.json();
      books.value.push(data);
    } else {
      console.error("HTTP-Error: " + response.status);
    }
  } catch (error) {
    console.error(error);
  }
}    
