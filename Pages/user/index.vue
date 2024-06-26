<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css';
import { url } from '@vee-validate/rules';

const store = useAuthStore();
const router = useRouter();
const urlBase = 'https://storytime-api.strapi.timedoor-js.web.id/';

const showPasswordForm = ref(false);
const showEditProfile = ref(false);
const name = ref('');   
const biodata = ref('');
const imageUrl = ref('');
const cropper = ref('');
const image = ref();
const showImageCropper = ref(false);
const passwordFieldType = ref<'password' | 'text'>('password');
const oldPasswordFieldType = ref<'password' | 'text'>('password');
const newPasswordFieldType = ref<'password' | 'text'>('password');

const togglePasswordVisibility = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
}

const oldTogglePasswordVisibility = () => {
    oldPasswordFieldType.value = oldPasswordFieldType.value === 'password' ? 'text' : 'password';
}

const newTogglePasswordVisibility = () => {
    newPasswordFieldType.value = newPasswordFieldType.value === 'password' ? 'text' : 'password';
}

onMounted(() => {
    if(store.userProfile){
        name.value = store.userProfile.name;
        biodata.value = store.userProfile.biodata;
    }
})

const updateProfile = async () => {
    const user = store.userProfile;
    try {
        if(user.name === null){
            throw new Error("Username Harus Diisi");
        }
        user.name = name.value;
        user.biodata = biodata.value;
        await store.editUserProfile(name.value, biodata.value);
        await store.userProfile;
        router.push('/user');
        toggleProfileForm();
    } catch (error) {
        console.log("error", error);
    }
}

const togglePasswordForm = () => {
    showPasswordForm.value = !showPasswordForm.value;
}
const toggleProfileForm = () => {
    showEditProfile.value = !showEditProfile.value;
}

const handleFileChange = (file: File) => {
    image.value = file; 
    imageUrl.value = URL.createObjectURL(file);
}

const handleCroppedImage = async () => {
    if(cropper.value){
        const croppedCanvas = cropper.value.getCropppedCanvas();
        croppedCanvas.toBlop(async (blop) => {
            if(blop){
                try {
                    await store.uploadUserPicture(blop);
                    await store.userProfile();
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }
}

const cancelCrop = () => {
    showImageCropper.value = false;
}

</script>

<template>
    <main class="main-wrapper">
        <section class="section-space">
            <div class="container">
                <div class="row">
                    <PagesUserPage></PagesUserPage>
                    <div class="col-lg-9">
                        <div class="profile">
                            <div class="profile__head">
                                <h1 class="profile__title">My Profile</h1>
                                <button @click="toggleProfileForm" v-if="!showEditProfile" type="button" class="btn btn-outline-primary btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 36 36" class="font20 iconify iconify--clarity">
                                        <path fill="currentColor" d="M28 30H6V8h13.22l2-2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15l-2 2Z" class="clr-i-outline clr-i-outline-path-1"></path>
                                        <path fill="currentColor" d="m33.53 5.84l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.17 16.26l-1.11 4.81A1.61 1.61 0 0 0 14.63 23a1.7 1.7 0 0 0 .37 0l4.85-1.07L33.53 8.12a1.61 1.61 0 0 0 0-2.28M18.81 20.08l-3.66.81l.85-3.63L26.32 6.87l2.82 2.82ZM30.27 8.56l-2.82-2.82L29 4.16L31.84 7Z" class="clr-i-outline clr-i-outline-path-2"></path>
                                        <path fill="none" d="M0 0h36v36H0z"></path>
                                    </svg>
                                    <span class="ml-5px">Edit Profile</span>
                                </button>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="image-wrapper"> 
                                        <div class="profile_image">
                                            <img :src="store.userProfile?.profile_picture?.formats?.thumbnail?.url 
                                            ? urlBase + store.userProfile?.profile_picture?.formats?.thumbnail?.url 
                                            : 'https://via.placeholder.com/150'" alt="">
                                        </div>
                                        <fieldset class="form-group">
                                            <div>
                                                <label for="image-upload" class="btn btn-outline-primary btn-block w-100" data-bs-toggle="modal" data-bs-target="#cropper">Change Avatar</label>
                                                <ui-base-input-img class="d-none" name="image" v-model="image" type="file" label=""
                                                    identity="inputImage" @change="handleFileChange" 
                                                />
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="col-lg-8" v-if="!showEditProfile">
                                    <div class="profile__info">
                                        <table class="table table-borderless pb-0">
                                            <tbody>
                                                <tr>
                                                    <th>Name</th>
                                                    <td>{{ store.userProfile.name }}</td>
                                                </tr>
                                                <tr>
                                                    <th>Email</th>
                                                    <td>{{ store.userProfile.email }}</td>
                                                </tr>
                                                <tr>
                                                    <th>Biodata</th>
                                                    <td>{{ store.userProfile.biodata }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-lg-8" v-if="showEditProfile">
                                    <div class="profile__info">
                                        <span>
                                            <form @submit.prevent="updateProfile" enctype="multipart/form-data" class="editProfile">
                                                <fieldset class="form-group">
                                                    <label for="name">Name</label>
                                                    <input type="text" id="name" v-model="name" required class="form-control">
                                                </fieldset>
                                                <fieldset class="form-group">
                                                    <label for="biodata">Biodata</label>
                                                    <textarea id="biodata" rows="5" v-model="biodata" class="form-control"></textarea>
                                                </fieldset>
                                                <div class="d-flex justify-content-between">
                                                    <button type="submit" class="btn btn-primary mt-4">Save</button>
                                                    <button @click="toggleProfileForm" type="button" class="btn btn-outline-primary mt-4">Cancel</button>
                                                </div>
                                            </form>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="profile mt-4">
                                <div class="profile__head">
                                    <h1 class="profile__title">Ubah Password</h1>
                                    <button @click="togglePasswordForm" v-if="!showPasswordForm" type="button" class="btn btn-outline-primary btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 36 36" class="font20 iconify iconify--clarity">
                                            <path fill="currentColor" d="M28 30H6V8h13.22l2-2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15l-2 2Z" class="clr-i-outline clr-i-outline-path-1"></path>
                                            <path fill="currentColor" d="m33.53 5.84l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.17 16.26l-1.11 4.81A1.61 1.61 0 0 0 14.63 23a1.7 1.7 0 0 0 .37 0l4.85-1.07L33.53 8.12a1.61 1.61 0 0 0 0-2.28M18.81 20.08l-3.66.81l.85-3.63L26.32 6.87l2.82 2.82ZM30.27 8.56l-2.82-2.82L29 4.16L31.84 7Z" class="clr-i-outline clr-i-outline-path-2"></path>
                                            <path fill="none" d="M0 0h36v36H0z"></path>
                                        </svg>
                                        <span class="ml-5px">Edit Password</span>
                                    </button>
                                </div>
                                <div class="row" v-if="showPasswordForm">
                                    <div class="col-lg-8">
                                        <div class="profile__info">
                                            <span>
                                                <form>
                                                    <fieldset class="form-group">
                                                        <label for="old-password">Old Password</label>
                                                        <div class="input-group">
                                                            <input :type="oldPasswordFieldType" id="old-password" required class="form-control">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-outline-secondary" @click="oldTogglePasswordVisibility">
                                                                    <span v-if="oldPasswordFieldType === 'password'">Show</span>
                                                                    <span v-else>Hide</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <fieldset class="form-group">
                                                        <label for="new-password">New Password</label>
                                                        <div class="input-group">
                                                            <input :type="newPasswordFieldType" id="new-password" required class="form-control">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-outline-secondary" @click="newTogglePasswordVisibility">
                                                                    <span v-if="newPasswordFieldType === 'password'">Show</span>
                                                                    <span v-else>Hide</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <fieldset class="form-group">
                                                        <label for="password">Confirm Password</label>
                                                        <div class="input-group">
                                                            <input :type="passwordFieldType" id="password" required class="form-control">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-outline-secondary" @click="togglePasswordVisibility">
                                                                    <span v-if="passwordFieldType === 'password'">Show</span>
                                                                    <span v-else>Hide</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <div class="d-flex justify-content-between">
                                                        <button type="submit" class="btn btn-primary mt-4">Save</button>
                                                        <button @click="togglePasswordForm" type="button" class="btn btn-outline-primary mt-4">Cancel</button>
                                                    </div>
                                                </form>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <div class="modal mt-5" id="cropper" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Adjust Image</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cancelCrop"></button>
                </div>
                <div class="modal-body">
                    <vue-cropper v-if="imageUrl" ref="cropper" :aspect-ratio="16 / 16" :src="imageUrl" preview=".preview" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-dark rounded-0" data-bs-dismiss="modal" @click="cancelCrop">Cancel</button>
                    <button type="button" class="btn btn-dark rounded-0" data-bs-dismiss="modal" @click="handleCroppedImage">Change</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

.password{
    padding: 25px;
    margin-top: 30px;
}



.password__head {
    display: flex;
    justify-content: space-between;
}

.main-wrapper {
    padding: 78px 0 100px;
}
.section-space{
    padding-top: 22px;
}

.profile__info{
    table th {
    font-weight: 500;
    width: 20%;
    padding-top: 0;
    padding-left: 0;
    padding-bottom: 1rem;}
    table td {
        padding-top: 0;
        padding-bottom: 1em;
    }
}

img, svg {
    vertical-align: middle;
}

.image-wrapper{
    width: 200px;
}

.p-10px {
    padding: 10px !important;
}

.profile_image{
    margin-bottom: 20px;
    height: 200px;
    width: 200px;
    img {
    height: 100%;
    width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 50%;
    }
}

.form-group{
    margin-bottom: 1em;
}

.btn{
    border-radius: 0;
    padding: 7px 25px;
    font-weight: 500;
    transition: all .3s ease;
    .btn-sm {
    padding: 25rem 5rem;
    font-size: 875rem;
    line-height: 1.5;
    border-radius: 2rem;
    }
    .btn:not(:disabled):not(.disabled){
    cursor: pointer;
    }
}

.font20 {
    font-size: 20px !important;
}

.profile, .password{
    border: none;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
    border-radius: 0;
    padding: 25px;
}

.profile__head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.profile__title {
    font-size: 24px;
}

.btn-sm {
    padding: 5px 15px;
}

.btn-outline-primary{
    color: #0e0e0e;
    border-color: #0e0e0e;

}

.form-control:disabled, .form-control[readonly] {
    background-color: #e9ecef;
    opacity: 1;
}
</style>