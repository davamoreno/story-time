<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useField, useForm, useFormValues } from 'vee-validate';
import * as yup from 'yup';
import { navigateTo } from "nuxt/app";

const store = useAuthStore();
const router = useRouter();


const schema = yup.object({
  identifier: yup.string().required('Identifier is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: identifier, errorMessage: identifierError } = useField('identifier');
const { value: password, errorMessage: passwordError } = useField('password');

const errorMessage = ref<string>('')

const passwordFieldType = ref<'password' | 'text'>('password');

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const login = handleSubmit( async (values) => {
    try{
        await store.getUserLogin(values);
        await store.userProfile;
        router.push('/')
    }
    catch (err) {
        if(err instanceof Error){
            errorMessage.value = err.message
        }
        else{
            errorMessage.value = "An unknown error occured."
        }
    }
});

onMounted(handleSubmit((values) => {
    store.getUserLogin(values);
}));

</script>

<template>
    <div class="container-fluid login__hero">
        <div class="d-flex col-12 justify-content-center">
            <div class="card shadow atas">
                <h4>Login</h4>
                <div>
                <form @submit.prevent="login">
                    <div>
                        <label for="identifier">Username or Email</label>
                        <input v-model="identifier" placeholder="Input Email/Username" id="identifier" type="text" />
                        <p class="text-danger mt-auto">{{ identifierError }}</p>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <div class="password-wrapper">
                            <input :type="passwordFieldType" placeholder="Input Password" v-model="password" name="password" id="password" />
                            <font-awesome-icon
                            :icon="passwordFieldType === 'password' ? 'eye' : 'eye-slash'"
                            @click="togglePasswordVisibility"
                            class="password-icon"
                            />
                        </div>
                        <p class="text-danger">{{ passwordError }}</p>
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