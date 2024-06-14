<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useAuthStore();

const logout = () => {
    try{
        store.logout();
        router.push('/');
    }
    catch(err){
        console.log("err");
    }
}
</script>

<template>
    <div class="col-lg-3">
        <div class="sidebar card">
            <NuxtLink to="/user" class="sidebar_item"><svg data-v-604fec54="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 32 32" class="font20 iconify iconify--carbon"><path fill="currentColor" d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3"></path><path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.9 11.9 0 0 1-12 0m13.993-1.451A5 5 0 0 0 19 20h-6a5 5 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0"></path></svg>My Profil</NuxtLink>
            <NuxtLink to="/user/storylist" class="sidebar_item"><svg data-v-604fec54="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 36 36" class="font20 iconify iconify--clarity"><path fill="currentColor" d="M15 8h9v2h-9z" class="clr-i-outline clr-i-outline-path-1"></path><path fill="currentColor" d="M15 12h9v2h-9z" class="clr-i-outline clr-i-outline-path-2"></path><path fill="currentColor" d="M15 16h9v2h-9z" class="clr-i-outline clr-i-outline-path-3"></path><path fill="currentColor" d="M15 20h9v2h-9z" class="clr-i-outline clr-i-outline-path-4"></path><path fill="currentColor" d="M15 24h9v2h-9z" class="clr-i-outline clr-i-outline-path-5"></path><path fill="currentColor" d="M11 8h2v2h-2z" class="clr-i-outline clr-i-outline-path-6"></path><path fill="currentColor" d="M11 12h2v2h-2z" class="clr-i-outline clr-i-outline-path-7"></path><path fill="currentColor" d="M11 16h2v2h-2z" class="clr-i-outline clr-i-outline-path-8"></path><path fill="currentColor" d="M11 20h2v2h-2z" class="clr-i-outline clr-i-outline-path-9"></path><path fill="currentColor" d="M11 24h2v2h-2z" class="clr-i-outline clr-i-outline-path-10"></path><path fill="currentColor" d="M28 2H8a2 2 0 0 0-2 2v28a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m0 30H8V4h20Z" class="clr-i-outline clr-i-outline-path-11"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>Story List</NuxtLink>
            <NuxtLink to="/user/bookmark" class="sidebar_item"><svg data-v-604fec54="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 32 32" class="font20 iconify iconify--carbon"><path fill="currentColor" d="M24 4v22.75l-7.1-3.59l-.9-.45l-.9.45L8 26.75V4zm0-2H8a2 2 0 0 0-2 2v26l10-5l10 5V4a2 2 0 0 0-2-2"></path></svg>Bookmark</NuxtLink>
            <div class="p-10px">
                <button class="btn d-flex justify-content-between align-items-center btn-block btn-outline-danger" type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Logout
                    <svg data-v-604fec54="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 15 15" class="font20 iconify iconify--teenyicons"><path fill="currentColor" fill-rule="evenodd" d="M1 1h7v1H2v11h6v1H1zm9.854 3.146l3.34 3.34l-3.327 3.603l-.734-.678L12.358 8H4V7h8.293l-2.147-2.146z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Logout</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure want to logout?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-dark rounded-0" data-bs-dismiss="modal">Cancle</button>
                    <button type="button" class="btn btn-dark rounded-0" data-bs-dismiss="modal" @click="logout()">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
a {
    text-decoration: none;
    background-color: transparent;
}

a:hover {
    color: #0e0e0e;; 
    background-color: #f0f0f0; 
    text-decoration: none;
}

.btn-block {
    display: block;
    width: 100%;
}

img, svg {
    vertical-align: middle;
}

.btn {
    border-radius: 0;
    padding: 7px 25px;
    font-weight: 500;
    transition: all .3s ease;
    .btn-sm {
    padding: .25rem .5rem;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: .2rem;
    }
    .btn:not(:disabled):not(.disabled){
    cursor: pointer;
    }
}

.font20 {
    font-size: 20px !important;
}

.sidebar{
    border: none;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
    border-radius: 0;
    margin-bottom: 20px;
}

.sidebar_item{
    border-top: 1px solid #eee;
    color: #8f8f8f;
    padding: 10px;
    font-size: 14px;
    transition: all .3s ease;
}

.btn-sm {
    padding: 5px 15px;
}
</style>