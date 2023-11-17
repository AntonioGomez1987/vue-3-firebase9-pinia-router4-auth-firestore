<template>
    <div>Home</div>
    <p>{{ userStore.userData?.email }}</p>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

onAuthStateChanged(auth, (user) => {
    console.log(user);
})
</script>