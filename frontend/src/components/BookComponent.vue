<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="row">  
          <div class="col">
            <input v-model="inputBookTitle" class="form-control" placeholder="Enter book title" />
          </div>
          <div class="col-auto"> 
            <button @click="getBookByTitle" class="btn btn-primary" style="display: inline-block; margin-left: 10px;"
              >Search
            </button>
          </div>
        </div>
        <ul style="list-style-type: none; padding: 0;">
          <li v-for="book in books" :key="book.id" class="border">
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

<style>
  .border {
    display: inline-block;
    margin-left: 10px;
    border-radius: 8px;
    border: 1px solid #48b8e8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
