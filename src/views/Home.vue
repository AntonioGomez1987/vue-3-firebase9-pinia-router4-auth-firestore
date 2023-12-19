<template>
    <div>Home</div>
    <p>{{ userStore.userData?.email }}</p>

    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Ingrese url" v-model="url">
        <button type="submit">Agregar</button>
    </form>

    <p v-if="databaseStore.loadingDoc">loading docs...</p>

    <ul v-else>
        <li v-for="item of databaseStore.documents" :key="item.id">
            {{ item.id }}
            <br/>
            {{ item.name }}
            <br/>
            {{ item.short }}
            <br>
            <button @click="databaseStore.deleteUrl(item.id)" color="primary">Eliminar</button>
            <button @click="router.push(`/editar/${item.id}`)">Editar</button>
            
            <Camera
                color="green"
                :size="32"
                
            />

        </li>
    </ul>
    
</template>

<script setup>

import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/database';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Camera } from 'lucide-vue-next'

const userStore = useUserStore();
const databaseStore = useDatabaseStore()
const router = useRouter();

databaseStore.getUrls()

const url = ref('')

const handleSubmit = () => {
    // validaciones de esa url...
    databaseStore.addUrls(url.value)
}

</script>