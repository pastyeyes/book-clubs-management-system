<template>
    <div>
        <h3>Available Book Clubs</h3>
        <ErrorInlineNotification :errorMessage="errorMessage" />
        <template v-if="isBookClubsListEmpty">
            <p> None book clubs have been created yet </p>
        </template>
        <template v-if="!isBookClubsListEmpty">
            <ul class="list-group">
                <li v-for="bookClub in bookClubs" :key="bookClub.id" class="list-group-item">
                    <h5>{{ bookClub.name }}</h5>
                    <p>{{ bookClub.description }}</p>
                    <div class="d-flex justify-content-end">
                        <button
                            v-if="!isMember(bookClub.id)"
                            @click="joinBookClub(bookClub.id)"
                            class="btn btn-success btn-sm me-2"
                            >
                            Join
                        </button>
                        <button
                            v-if="isMember(bookClub.id)"
                            @click="leaveBookClub(bookClub.id)"
                            class="btn btn-danger btn-sm"
                            >
                            Leave
                        </button>
                    </div>
                </li>
            </ul>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { errorStateManagement } from '@/components/inline-error/useErrorInlineNotification.js';
import ErrorInlineNotification from '@/components/inline-error/ErrorInlineNotification.vue';
import { API_ENDPOINT } from '@/constants.js';
import { useAuthStore } from '@/stores/auth';
import { fetchWithAuth } from '@/utils/apiHelper.js'
import { showToast } from '@/components/toast/useToastNotification';

const { errorMessage, setError, resetError } = errorStateManagement();

const bookClubs = ref([]);
const isBookClubsListEmpty = computed(() => bookClubs.value.length === 0);
const userMemberships = ref([]); // This hold the IDs of the book clubs the user belongs to


const fetchBookClubs = async () => {
    resetError();
    try {
        const response = await fetchWithAuth(`${API_ENDPOINT}/book-club`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            bookClubs.value = data;
        } else {
            setError(`HTTP-Error: ${response.status}`);
        }
    } catch (error) {
        setError(error.message);
    }
};

const fetchUserMemberships = async () => {
    resetError();
    try {
        const userId = useAuthStore().user.id;
        const response = await fetchWithAuth(`${API_ENDPOINT}/book-club-member/persona/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            userMemberships.value = data.map(obj => obj.id);
        } else if(response.status == 404){ //User does not belong to any bookclub
            userMemberships.value = [];
        }else{
            setError(`HTTP-Error: ${response.status}`);
        }
    } catch (error) {
        setError(error.message);
    }
};

const joinBookClub = async (bookClubId) => {
    resetError();
    try {
        const userId = useAuthStore().user.id;
        const response = await fetchWithAuth(`${API_ENDPOINT}/book-club-member/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                'bookClubId' : bookClubId, 
                'personaId' : userId 
            })
        });
        if (response.ok) {
            userMemberships.value.push(bookClubId);
            showToast(`You've joined the Book Club #${bookClubId}" successfully!`);
        }else if(response.status == 400){
            setError(`User could not be bind to the book club`);
        }else{
            setError(`HTTP-Error: ${response.status}`);
        }
    } catch (error) {
        setError(error.message);
    }
};

const leaveBookClub = async (bookClubId) => {
    resetError();
    try {
        const userId = useAuthStore().user.id;
        const response = await fetchWithAuth(`${API_ENDPOINT}/book-club-member/leave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                bookClubId : bookClubId, 
                personaId : userId 
            })
        });
        if (response.ok) {
            userMemberships.value = userMemberships.value.filter(id => id !== bookClubId);
            showToast(`You've left the Book Club #${bookClubId}" successfully!`);
        }else if(response.status == 404){
            setError(`User could not be unbind to the book club`);
        }else{
            setError(`HTTP-Error: ${response.status}`);
        }
    } catch (error) {
        setError(error.message);
    }
};

const isMember = (bookClubId) => {
    return userMemberships.value.includes(bookClubId);
};

onMounted(async() => {
    await fetchBookClubs();
    if(!isBookClubsListEmpty.value){
        await fetchUserMemberships();
    }
});
</script>

<style scoped>
.list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>