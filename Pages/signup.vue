<template>
    <div class="container-fluid mt-3">
        <div class="d-flex col-12 justify-content-center signup__hero">
            <div class="card shadow atas">
                <h4>Register</h4>
                <div class="">
                    <form @submit.prevent="register">
                        <div class="mt-2">
                            <label for="name">Name</label>
                            <input v-model="form.name" class="input-group" id="name" type="text" name="name" placeholder="Enter name" required/>
                            <!-- <span v-if="nameError" class="text-danger">{{ nameError }}</span> -->
                        </div>
                        <div class="mt-2">
                            <label for="username">Username</label>
                            <input v-model="form.username" id="username" class="input-group" type="text" name="username" placeholder="Enter username" required/>
                            <!-- <span v-if="usernameError" class="text-danger">{{ usernameError }}</span> -->
                        </div>
                        <div class="mt-2">
                            <label for="email">Email</label>
                            <input v-model="form.email" class="input-group" id="email" type="email" name="email" placeholder="Enter email" required/>
                            <!-- <span v-if="emailError" class="text-danger">{{ emailError }}</span> -->
                        </div>
                        <div class="mt-2">
                            <label for="password">Password</label>
                            <div class="password-wrapper">
                                <input v-model="form.password" id="password" class="input-group" :type="passwordFieldType" name="password" placeholder="Enter password" required/>
                                <font-awesome-icon
                                :icon="passwordFieldType === 'password' ? 'eye' : 'eye-slash'"
                                @click="togglePasswordVisibility"
                                class="password-icon"
                            />
                            </div>
                            <!-- <span v-if="passwordError" class="text-danger">{{ passwordError }}</span> -->
                        </div>
                        <div class="mt-1 mb-2">
                            <label for="passwordConfirm">Password Confirmation</label>
                            <div class="password-wrapper">
                                <input class="input-group" id="passwordConfirm" :type="passwordConfirmFieldType" v-model="form.passwordConfirm" name="passwordConfirm" placeholder="Enter password confirmation" required/>
                                <font-awesome-icon
                                :icon="passwordConfirmFieldType === 'password' ? 'eye' : 'eye-slash'"
                                @click="togglePasswordConfirmVisibility"
                                class="password-icon"
                            />
                            </div>
                            <!-- <span v-if="passwordConfirmError" class="text-danger">{{ passwordConfirmError }}</span> -->
                        </div>
                        <button type="submit" id="success" class="btn btn-dark submit">Register</button>
                    </form>
                    <div v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</div>
                </div>
                <p class="mt-2">Already have account ? <NuxtLink to="/login">Login</NuxtLink></p>
            </div>
        </div> 
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();
interface RegisterForm{
    username: string
    name: string
    email: string
    password: string
    passwordConfirm: string
}
const form = ref<RegisterForm>({
    username: '',
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
})
const errorMessage = ref<string>('')
const passwordFieldType = ref < 'password' | 'text' > ('password');
const passwordConfirmFieldType = ref < 'password' | 'text' > ('password');

const togglePasswordVisibility = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const togglePasswordConfirmVisibility = () => {
    passwordConfirmFieldType.value = passwordConfirmFieldType.value === 'password' ? 'text' : 'password';
}

const register = async() => {
    try{
    await store.getRegister(form.value)
    router.push('/')
    }catch(err){
        if(err instanceof Error){
            errorMessage.value = err.message
        } else {
            errorMessage.value = "An unknown error occured."
        }
    }
}
</script>

<style lang="scss" scoped>
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
.signup__hero{
    margin-top: 150px;
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
    margin-bottom: 5px;
}
input{
    width: 100%;
    margin-bottom: 10px;
}
</style>