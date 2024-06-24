<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="row">  
          <div class="col">
            <input v-model="inputBookTitle" class="form-control" placeholder="Enter book title" />
          </div>
          <div class="col-auto"> 
            <button @click="getBookByTitle" class="btn btn-primary" style="margin-left: 5px;"
              >Search
            </button>
          </div>
        </div>
        

        <!-- List of books -->
        <ul class="list-group">
          <li v-for="book in books" :key="book.id" class="list-group-item">
            <p>Title: {{ book.title }}, Author: {{ book.author }}, Genre: {{ book.genre }}</p>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { API_ENDPOINT } from '@/constants.js';

const error = ref(false);
const inputBookTitle = ref('');
const books = ref([]);

const getBookByTitle = async () => {
  console.log(inputBookTitle.value);

  try {
    //Shortcircuit
    if (!inputBookTitle.value) {
      return;
    }

    const response = await fetch(`${API_ENDPOINT}/book/title/${inputBookTitle.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      // When the request comes back with a 200 status, reset the error flag
      //error = false; 
      books.value = [];
      const data = await response.json();
      // if data is null clean the books list and put a message in it instead
      if (!data) {
        books.value.push({ message: 'No book found with this title' });
        return;
      }
      // push the data to the books list
      books.value.push(data);
    } else {
      console.error("HTTP-Error: " + response.status);
    }
  } catch (err) {
    error.value = err.message;
    console.error(err);
  }
}    
</script>

<style scoped>

</style>
