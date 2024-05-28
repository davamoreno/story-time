<template>
    <div class="container-fluid mt-3">
        <div class="d-flex col-12 justify-content-center signup__hero">
            <div class="card shadow atas">
                <h4>Register</h4>
                <div class="">
                    <form @submit.prevent="store.register">
                        <div class="mt-2">
                            <label for="name">Name</label>
                            <input v-model="store.name" class="input-group" id="name" type="text" name="name" placeholder="Enter name" @input="validateName" required/>
                            <!-- <span v-if="nameError" class="text-danger">{{ nameError }}</span> -->
                        </div>
                        <div class="mt-2">
                            <label for="username">Username</label>
                            <input v-model="store.username" id="username" class="input-group" type="text" name="username" placeholder="Enter username" @input="validateUsername" required/>
                            <!-- <span v-if="usernameError" class="text-danger">{{ usernameError }}</span> -->
                        </div>
                        <div class="mt-2">
                            <label for="email">Email</label>
                            <input v-model="store.email" class="input-group" id="email" type="email" name="email" placeholder="Enter email" @input="validateEmail" required/>
                            <!-- <span v-if="emailError" class="text-danger">{{ emailError }}</span> -->
                        </div>
                        <div class="mt-2">
                            <label for="password">Password</label>
                            <div class="password-wrapper">
                                <input v-model="store.password" id="password" class="input-group" :type="passwordFieldType" name="password" placeholder="Enter password" @input="validatePassword"/>
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
                                <input class="input-group" id="passwordConfirm" :type="passwordConfirmFieldType" v-model="store.passwordConfirm" name="passwordConfirm" placeholder="Enter password confirmation" @input="validatePasswordConfirm"/>
                                <font-awesome-icon
                                :icon="passwordConfirmFieldType === 'password' ? 'eye' : 'eye-slash'"
                                @click="togglePasswordConfirmVisibility"
                                class="password-icon"
                            />
                            </div>
                            <!-- <span v-if="passwordConfirmError" class="text-danger">{{ passwordConfirmError }}</span> -->
                        </div>
                        <button type="submit" class="btn btn-dark submit">Register</button>
                    </form>
                    <div v-if="error" class="text-danger mt-2">{{ error }}</div>
                </div>
                <p class="mt-2">Already have account ? <NuxtLink to="/login">Login</NuxtLink></p>
            </div>
        </div> 
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { useField, useForm } from 'vee-validate';
    import { useAuthStore } from '~/stores/auth';
    import * as yup from 'yup';
    import { useRouter } from 'vue-router';

const router = useRouter()
const store = useAuthStore()

// const {name, username, email, password, passwordConfirm, error, register } = store;

const schema = yup.object({
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(8).test('unique', 'Password is not unique', value => {
    const usedPasswords = ['password123', '12345678', 'qwertyuiop', 'mamamama'];
    return !usedPasswords.includes(value);}),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], 'password must match'),
});
const {handleSubmit,errors} = useForm({
    validationSchema: schema,
});

const {value: nameField, errorMessage: nameError, handleBlur: validateName} = useField('name');
const {value: usernameField, errorMessage: usernameError, handleBlur: validateUsername } = useField('username');
const {value: emailField, errorMessage:emailError, handleBlur: validateEmail} = useField('email');
const {value: passwordField, errorMessage:passwordError, handleBlur: validatePassword} = useField('password');
const {value: passwordConfirmField,  errorMessage: passwordConfirmError, handleBlur: validatePasswordConfirm } = useField('passwordConfirm');

const passwordFieldType = ref < 'password' | 'text' > ('password');
const passwordConfirmFieldType = ref < 'password' | 'text' > ('password');

const togglePasswordVisibility = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const togglePasswordConfirmVisibility = () => {
    passwordConfirmFieldType.value = passwordConfirmFieldType.value === 'password' ? 'text' : 'password';
}

const onSubmit = async (values : any) => {
  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    const response = await fetch('https://storytime-api.strapi.timedoor-js.web.id//api/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    success.value = 'Registration successful!';
    setTimeout(() => {
      router.push('/');
    }, 2000);
  } catch (err) {
    error.value = 'Terjadi kesalahan, mohon ulangi';
  } finally {
    loading.value = false;
  }
};
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