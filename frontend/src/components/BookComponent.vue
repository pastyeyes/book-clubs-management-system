<template>
  <div id="button-back" style="text-align: center; width: 49%;">
    <router-link to="/">
      <button style="width: 157px;">Back to Home</button>
    </router-link>
  </div>

  <div id="container" style="text-align: center; display: inline-block; width: 49%;"> 
    <input v-model="inputBookTitle" placeholder="Enter book title" />
    <button @click="getBookByTitle">Search</button>
    <ul>
      <li v-for="book in books" :key="book.id">
        <p>Title: {{ book.title }}, Author: {{ book.author }}, Genre: {{ book.genre }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { inputBookTitle, books, getBookByTitle } from '@/scripts/BookApi.js';
</script>

