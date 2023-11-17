<template>
    <div>Register</div>
    <form @submit.prevent="handleSubmit">
        <input type="email" placeholder="Ingrese su correo" v-model.trim="email">
        <input type="password" placeholder="Ingrese su contraseña" v-model.trim="password">
        <button type="submit" :disabled="userStore.loadingUser">Crear Usuario</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
// import {useRouter} from 'vue-router';

// const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');

const handleSubmit = async() => {
    if(!email.value || !password.value.length > 6){
        return alert('Diligencia los campos')
    }
    await userStore.registerUser(email.value, password.value)
    // router.push('/')
}

</script>