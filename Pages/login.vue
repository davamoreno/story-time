<template>
    <div class="container-fluid login__hero">
        <div class="d-flex col-12 justify-content-center">
            <div class="card shadow atas">
                <h4>Login</h4>
                <div>
                <form @submit.prevent="login">
                    <div>
                        <label for="identifier">Username or Email</label>
                        <input v-model="form.identifier" placeholder="Input Email/Username" id="identifier" type="text" required>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <div class="password-wrapper">
                            <input :type="passwordFieldType" placeholder="Input Password" v-model="form.password" name="password" id="password" required>
                            <font-awesome-icon
                            :icon="passwordFieldType === 'password' ? 'eye' : 'eye-slash'"
                            @click="togglePasswordVisibility"
                            class="password-icon"
                            />
                        </div>
                    </div>
                    <button class="btn btn-dark" type="submit">Submit</button>
                </form>
                <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
                </div>
                <p class="mt-2">Don't have an account yet ? <NuxtLink to="/signup">Register</NuxtLink></p>
            </div>
        </div> 
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

interface LoginForm {
    identifier: string
    password: string
}

const form = ref<LoginForm>({
    identifier: '',
    password: ''
})
const errorMessage = ref<string>('')

const passwordFieldType = ref<'password' | 'text'>('password');
const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const login = async () => {
    try{
        const success = await store.getUserLogin(form.value);
        if(success){
            router.push('/');
        }
        else{
            alert ('login gagal')
        }
    }
    catch (err) {
        if(err instanceof Error){
            errorMessage.value = err.message
        }
        else{
            errorMessage.value = "An unknown error occured."
        }
    }
}

onMounted(() => {
    store.getUserLogin(form.value);
})
</script>

<style lang="scss" scoped>
$primary-color : #000000;
.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.password-icon {
  position: absolute;
  right: 7px;
  bottom: 16px;
  cursor: pointer;
}
.login__hero{
    margin-top: 100px;
    margin-bottom: 25px;
}
.submit{
    width: 100%;
    padding-top: 5px;
    justify-content: center;
    border-radius: 0;
}
.atas{
    width: 400px;
    padding: 20px;
}
label{
    width: 100%;
    margin-bottom: 10px;
}
input{
    width: 100%;
    margin-bottom: 10px;
}
</style>