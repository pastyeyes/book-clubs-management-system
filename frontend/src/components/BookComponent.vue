<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <input v-model="inputBookTitle" class="form-control" placeholder="Enter book title" />
        <button @click="getBookByTitle" class="btn btn-primary">Search</button>
        <ul>
          <li v-for="book in books" :key="book.id">
            <p>Title: {{ book.title }}, Author: {{ book.author }}, Genre: {{ book.genre }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inputBookTitle, books, getBookByTitle } from '@/services/BookApiService.js';
</script>

