import { email, password, userStore, router } from './Register.vue';

export const handleSubmit = () => {
if (!email.value || !password.value.length > 6) {
return alert('Diligencia los campos');
}
await userStore.registerUser(email.value, password.value);
router('/');
};
