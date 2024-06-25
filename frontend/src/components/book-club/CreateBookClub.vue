<template>
    <div>
        <h3>Create Book Club</h3>
        <ErrorInlineNotification :errorMessage="errorMessage" />
        <form @submit.prevent="createBookClub">
            <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input type="text" class="form-control" v-model="name" required />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description:</label>
                <textarea class="form-control" v-model="description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { errorStateManagement } from '@/components/inline-error/useErrorInlineNotification.js';
import ErrorInlineNotification from '@/components/inline-error/ErrorInlineNotification.vue';
import { API_ENDPOINT } from '@/constants.js';

const { errorMessage, setError, resetError } = errorStateManagement();

const name = ref('');
const description = ref('');
const emits = defineEmits(['bookClubCreated']);

const createBookClub = async () => {
    resetError();
    try {
        const response = await fetch(`${API_ENDPOINT}/book-club`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name.value, description: description.value })
        });
        if (response.ok) {
            const newBookClub = await response.json();
            name.value = '';
            description.value = '';
            emits('bookClubCreated', `Book Club "${newBookClub.name}" created successfully!`);
        } else {
            const errorData = await response.json();
            setError(errorData.message);
        }
    } catch (error) {
        setError(error.message);
    }
};
</script>