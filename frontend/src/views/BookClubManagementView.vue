<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h1>Book Club Management</h1>
                <hr />
                <!-- Tabs -->
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a 
                            class="nav-link" 
                            :class="{ active: activeTab === 'list' }" 
                            href="#"
                            @click.prevent="activeTab = 'list'"
                            >
                            List Book Clubs
                        </a>
                    </li>
                    <li class="nav-item">
                        <a 
                            class="nav-link" 
                            :class="{ active: activeTab === 'create' }" 
                            href="#"
                            @click.prevent="activeTab = 'create'"
                            >
                            Create Book Club
                        </a>
                    </li>
                </ul>
                <!-- Panels -->
                <div class="tab-content mt-3">
                    <div v-if="activeTab === 'list'" class="tab-pane active">
                        <ListBookClub />
                    </div>
                    <div v-if="activeTab === 'create'" class="tab-pane active">
                        <CreateBookClub @bookClubCreated="handleBookClubCreated" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CreateBookClub from '@/components/book-club/CreateBookClub.vue';
import ListBookClub from '@/components/book-club/ListBookClub.vue';

import { showToast } from '@/components/toast/useToastNotification';
const activeTab = ref('list');

const handleBookClubCreated = (message) => {
    showToast(message); //Show toast
    activeTab.value = 'list'; // Switch to the list tab
};
</script>