<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h1>Book Search (Powered by Gooogle Books API)</h1>
                <hr />
                <div class="row">
                    <!-- Search by Title -->
                    <div class="col">
                        <input 
                            v-model="inputBookTitle" 
                            class="form-control" 
                            placeholder="Enter book title" />
                    </div>
                    <div class="col-auto">
                        <button 
                            @click="getBookByTitle" 
                            class="btn btn-primary" 
                            style="margin-left: 5px;"
                            >Search
                        </button>
                    </div>
                </div>
                <!-- Search by Author -->
                <div class="row">
                    <div class="col">
                        <input
                            v-model="inputBookAuthor"
                            class="form-control"
                            placeholder="Enter book author" />
                    </div>
                    <div class="col-auto">
                        <button @click="getBookByAuthor"
                            class="btn btn-primary"
                            style="margin-left: 5px;"
                            >Search
                        </button>
                    </div>
                </div>
                
                <!-- Search by Genre -->
                <div class="row">
                    <div class="col">
                        <input
                            v-model="inputBookGenre"
                            class="form-control"
                            placeholder="Enter book genre" />
                    </div>
                    <div class="col-auto">
                        <button
                            @click="getBookByGenre"
                            class="btn btn-primary"
                            style="margin-left: 5px;"
                            >Search
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- List of books -->
            <div>
                <h3>Search Results</h3>
                <ErrorInlineNotification :errorMessage="errorMessage" />
                <ul class="list-group">
                    <li v-for="book in books" :key="book.id" class="list-group-item">
                        <span>Title: {{ book.title }}</span>
                        <span>Author: {{ book.authors }}</span>
                        <span>Genre: {{ book.categories }}</span>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { API_ENDPOINT } from '@/constants.js';
import { errorStateManagement } from '@/components/inline-error/useErrorInlineNotification.js';
import ErrorInlineNotification from '@/components/inline-error/ErrorInlineNotification.vue';
import { fetchWithAuth } from '@/utils/apiHelper.js'


const { errorMessage, setError, resetError } = errorStateManagement();

const inputBookAuthor = ref('');
const inputBookTitle = ref('');
const inputBookGenre = ref('');
const books = ref([]);

const resetBookslist = () => {
    books.value = [];
}

const getBookByTitle = async () => {
    resetError();
    resetBookslist();
    console.log(inputBookTitle.value);
    
    //Shortcircuit
    if (!inputBookTitle.value) {
        return;
    }

    try {
        const response = await fetchWithAuth(`${API_ENDPOINT}/google-book/title/${inputBookTitle.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP-Error: ${response.status}`);
        }

        const data = await response.json();
        // if data does not exists show error.
        if (!data) {
            throw new Error('No book found with this title');
        }

        // reset the book list with the new data the data to the books list
        books.value = data;
    } catch (error) {
        setError(error.message);
        console.error(error);
    }
}  

const getBookByAuthor = async () => {

}

const getBookByGenre = async () => {
    
}
</script>

<style scoped>
.list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
