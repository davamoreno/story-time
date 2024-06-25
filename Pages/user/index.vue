<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

const showPasswordForm = ref();
const showEditProfile = ref();
const name = ref('');
const biodata = ref('');
const imageUrl = ref('');
const image = ref();
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

const uploadedImage = async () => {
    const newImage = new FormData();
      newImage.append('files', image.value);
      newImage.append('refId', store.userProfile);
      newImage.append('ref', 'api::story.story');
      newImage.append('field', 'cover_image');

      await store.uploadUserPicture(newImage);
}

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  if (file) {
    image.value = file;
    imageUrl.value = URL.createObjectURL(file );
  }
};

const togglePasswordForm = () => {
    showPasswordForm.value = !showPasswordForm.value;
}
const toggleProfileForm = () => {
    showEditProfile.value = !showEditProfile.value;
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
                                <button @click="toggleProfileForm" v-if="!showEditProfile" type="button" class="btn btn-outline-primary btn-sm"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 36 36" class="font20 iconify iconify--clarity"><path fill="currentColor" d="M28 30H6V8h13.22l2-2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15l-2 2Z" class="clr-i-outline clr-i-outline-path-1"></path><path fill="currentColor" d="m33.53 5.84l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.17 16.26l-1.11 4.81A1.61 1.61 0 0 0 14.63 23a1.7 1.7 0 0 0 .37 0l4.85-1.07L33.53 8.12a1.61 1.61 0 0 0 0-2.28M18.81 20.08l-3.66.81l.85-3.63L26.32 6.87l2.82 2.82ZM30.27 8.56l-2.82-2.82L29 4.16L31.84 7Z" class="clr-i-outline clr-i-outline-path-2"></path><path fill="none" d="M0 0h36v36H0z"></path></svg><span class="ml-5px">Edit Profile</span></button>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="image-wrapper">
                                        <div class="profile_image" v-if="!imageUrl">
                                            <img src="https://via.placeholder.com/150" alt="">
                                        </div>
                                        <div class="profile_image" v-if="imageUrl">
                                            <img :src="imageUrl" alt="">
                                        </div>
                                    <fieldset class="form-group">
                                        <div>
                                            <label for="image-upload" class="btn btn-outline-primary btn-block w-100">Change Avatar</label>
                                            <input type="file" id="image-upload" @change="handleFileChange" data-bs-toggle="modal" data-bs-target="#crop-photo___BV_modal_outer_" accept=".png, .jpg, .jpeg" class="d-none form-control-file">
                                        </div>
                                        <!---->
                                    </fieldset>
                                        
                                        <div id="crop-photo___BV_modal_outer_" style="position: absolute; z-index: 1040;">
                                            <div id="crop-photo" role="dialog" aria-hidden="true" aria-labelledby="crop-photo___BV_modal_title_" aria-describedby="crop-photo___BV_modal_body_" class="modal fade" style="display: none;">
                                                <div class="modal-dialog modal-md modal-dialog-centered"><!---->
                                                    <div id="crop-photo___BV_modal_content_" tabindex="-1" class="modal-content">
                                                        <header id="crop-photo___BV_modal_header_" class="modal-header">
                                                            <h5 id="crop-photo___BV_modal_title_" class="modal-title">Adjust Image</h5>
                                                            <button type="button" aria-label="Close" class="close">x</button>
                                                        </header>
                                                        <div id="crop-photo___BV_modal_body_" class="modal-body">
                                                            <div class="cropper text-center">
                                                                <img :src="imageUrl" alt="">
                                                            </div>
                                                        </div>
                                                        <footer id="crop-photo___BV_modal_footer_" class="modal-footer">
                                                            <button type="button" class="btn btn-outline-primary">
                                                                 Cancel
                                                            </button> 
                                                            <button type="button" class="btn btn-primary">
                                                                <span>Change</span>
                                                            </button>
                                                        </footer>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                                    <td v-if="store.userProfile.biodata">{{ store.userProfile?.biodata }}</td>
                                                    <td v-else> - </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-lg-8" v-if="showEditProfile">
                                    <div class="profile__info">
                                        <span>
                                            <form class="" @submit.prevent="updateProfile()">
                                                <span>
                                                    <div role="group" class="form-group" id="__BVID__83">
                                                        <label for="fullname" class="d-block" id="__BVID__83__BV_label_">
                                                            Name
                                                        </label>
                                                        <div>
                                                            <input v-model="name" id="fullname" type="text" placeholder="Enter your name" class="form-control"><!----><!----><!---->
                                                        </div>
                                                    </div>
                                                </span>
                                                 <span>
                                                    <div role="group" class="form-group" id="__BVID__86">
                                                        <label for="email" class="d-block" id="__BVID__86__BV_label_">
                                                            Email
                                                        </label>
                                                        <div>
                                                            <input id="email" type="email" placeholder="Enter your email" readonly="readonly" class="form-control">
                                                        <!----><!----><!---->
                                                        </div>
                                                    </div>
                                                </span> 
                                                <span>
                                                    <div role="group" class="form-group" id="__BVID__89">
                                                        <label for="about-me" class="d-block" id="__BVID__89__BV_label_">
                                                            About me
                                                        </label>
                                                        <div>
                                                            <textarea v-model="biodata" id="about-me" placeholder="Enter about me" rows="4" wrap="soft" class="form-control">

                                                            </textarea><!----><!----><!---->
                                                        </div>
                                                    </div>
                                                </span> 
                                                <div class="d-flex justify-content-end">
                                                    <button type="button" class="btn mr-5px btn-outline-primary" @click="toggleProfileForm">
                                                        Cancel
                                                    </button>
                                                    <button type="submit" class="btn btn-primary"><!---->
                                                        Save
                                                    </button>
                                                </div>
                                            </form>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-v-b8dd6178="" class="password">
                            <div class="password__head">
                                <h1 class="password__title mb-0">
                                    Password
                                </h1> 
                                <button type="button" class="btn btn-outline-primary btn-sm" @click="togglePasswordForm" v-if="!showPasswordForm">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 36 36" class="iconify iconify--clarity"><path fill="currentColor" d="M28 30H6V8h13.22l2-2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15l-2 2Z" class="clr-i-outline clr-i-outline-path-1"></path><path fill="currentColor" d="m33.53 5.84l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.17 16.26l-1.11 4.81A1.61 1.61 0 0 0 14.63 23a1.7 1.7 0 0 0 .37 0l4.85-1.07L33.53 8.12a1.61 1.61 0 0 0 0-2.28M18.81 20.08l-3.66.81l.85-3.63L26.32 6.87l2.82 2.82ZM30.27 8.56l-2.82-2.82L29 4.16L31.84 7Z" class="clr-i-outline clr-i-outline-path-2"></path><path fill="none" d="M0 0h36v36H0z"></path></svg> 
                                    <span class="ml-5px">
                                        Change Password
                                    </span>
                                </button>
                            </div>
                            <div class="password__info" v-if="showPasswordForm">
                                <span>
                                    <form class="" @submit.prevent="">
                                        <span>
                                            <div role="group" class="form-group" id="__BVID__44">
                                                <label for="old-password" class="d-block" id="__BVID__44__BV_label_">
                                                    Old Password
                                                </label>
                                                <div>
                                                    <div role="group" class="input-group"><!---->
                                                        <input id="old-password" :type="oldPasswordFieldType" placeholder="Enter old password" class="form-control"> 
                                                        <font-awesome-icon
                                                            :icon="oldPasswordFieldType === 'password' ? 'eye' : 'eye-slash'"
                                                            @click="oldTogglePasswordVisibility"
                                                             class="password-icon"
                                                         />
                                                    </div><!----><!----><!---->
                                                </div>
                                            </div>
                                        </span> 
                                        <span>
                                            <div role="group" class="form-group" id="__BVID__48">
                                                <label for="new-password" class="d-block" id="__BVID__48__BV_label_">
                                                    New Password
                                                </label>
                                                <div>
                                                    <div role="group" class="input-group"><!---->
                                                        <input id="new-password"  :type="newPasswordFieldType" placeholder="Enter a new password" class="form-control"> 
                                                        <font-awesome-icon
                                                            :icon="newPasswordFieldType === 'password' ? 'eye' : 'eye-slash'"
                                                            @click="newTogglePasswordVisibility"
                                                             class="password-icon"
                                                         />
                                                </div><!----><!----><!---->
                                            </div>
                                        </div>
                                    </span> 
                                    <span>
                                        <div role="group" class="form-group" id="__BVID__52">
                                            <label for="new-password-confirmation" class="d-block" id="__BVID__52__BV_label_">
                                                New Password Confirmation
                                            </label>
                                            <div>
                                                <div role="group" class="input-group"><!---->
                                                    <input id="new-password-confirmation" :type="passwordFieldType" placeholder="Enter new password confirmation" class="form-control">
                                                    <font-awesome-icon
                                                        :icon="passwordFieldType === 'password' ? 'eye' : 'eye-slash'"
                                                         @click="togglePasswordVisibility"
                                                        class="password-icon"
                                                    />
                                                    </div><!----><!----><!---->
                                                </div>
                                            </div>
                                        </span> 
                                        <div class="d-flex justify-content-end">
                                            <button type="button" class="btn mr-5px btn-outline-primary" @click="togglePasswordForm">
                                                Cancel
                                            </button> 
                                            <button type="submit" class="btn btn-primary"><!---->
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </span>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    </main>

    
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