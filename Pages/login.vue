<template>
    <div class="container-fluid login__hero">
        <div class="d-flex col-12 justify-content-center">
            <div class="card shadow atas">
                <h4>Login</h4>
                <div>
                <form @submit.prevent="handleSubmit(onSubmit)">
                    <div>
                        <label for="email">Email</label>
                        <input v-model="email" placeholder="Input Email/Username" name="email" type="email" @input="validateEmail" />
                        <span v-if="emailError" class="text-danger">{{ emailError }}</span>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <div class="password-wrapper">
                            <input :type="passwordFieldType" placeholder="Input Password" v-model="password" name="password" @input="validatePassword" />
                            <font-awesome-icon
                            :icon="passwordFieldType === 'password' ? 'eye' : 'eye-slash'"
                            @click="togglePasswordVisibility"
                            class="password-icon"
                            />
                        </div>
                        <span v-if="passwordError" class="text-danger">{{ passwordError }}</span>
                    </div>
                    <a class="btn btn-dark" type="submit">Submit</a>
                </form>
                </div>
                <p class="mt-2">Don't have an account yet ? <NuxtLink to="/signup">Register</NuxtLink></p>
            </div>
        </div> 
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).test('unique', 'Password is not unique', value => {
    const usedPasswords = ['password123', '12345678', 'qwertyuiop','mamamama'];
    return !usedPasswords.includes(value);}),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: email, errorMessage: emailError, handleBlur: validateEmail } = useField('email');
const { value: password, errorMessage: passwordError, handleBlur: validatePassword } = useField('password');

const passwordFieldType = ref<'password' | 'text'>('password');

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
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
    margin-bottom: 10px;
}
input{
    width: 100%;
    margin-bottom: 10px;
}
</style>