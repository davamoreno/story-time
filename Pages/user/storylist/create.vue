<script setup lang="ts">

</script>

<template>
    <main class="main-wrapper">
        <section class="section-space">
            <div class="container">
                <div class="row">
                    <PagesUserPage></PagesUserPage>
                    <div class="col-lg-9">
                        <div class="story-form">
                            <div class="story-form__head">
                                <NuxtLink to="/user/storylist" target="_self" class="mr-20px">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" class="font20 iconify iconify--akar-icons"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11 5l-7 7l7 7m-7-7h16"></path></svg>
                                </NuxtLink> 
                                <h1 class="story-form__title">
                                    Create Story
                                </h1>
                            </div> 
                            <div class="story-form__wrapper">
                                <span>
                                    <form class="">
                                        <span>
                                            <div role="group" class="form-group" id="__BVID__278">
                                                <label for="title" class="d-block" id="__BVID__278__BV_label_">
                                                    Title
                                                </label>
                                                <div>
                                                    <input id="title" type="text" placeholder="Enter a story title" class="form-control">
                                                </div>
                                            </div>
                                        </span> 
                                        <span><div role="group" class="form-group" id="__BVID__281">
                                            <label for="category" class="d-block" id="__BVID__281__BV_label_">
                                                Category
                                            </label>
                                            <div>
                                                <select id="category" class="custom-select">
                                                    <option disabled="disabled" value="">
                                                        Select a category
                                                    </option> 
                                                    <option  value="3">
                                                        Comedy
                                                    </option>
                                                    <option  value="4">
                                                        Horror
                                                    </option>
                                                    <option  value="5">
                                                        Romance
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </span> 
                                    <span >
                                        <div role="group" class="form-group" id="__BVID__284">
                                            <label for="content" class="d-block" id="__BVID__284__BV_label_">
                                                Content
                                            </label>
                                            <div>
                                                <div class="quill-editor" id="content"> 
                                                    <div class="ql-toolbar ql-snow">
                                                        <span class="ql-formats">
                                                            <span class="ql-header ql-picker">
                                                                <span class="ql-picker-label" tabindex="0" role="button" aria-expanded="false" aria-controls="ql-picker-options-2"><svg viewBox="0 0 18 18"> 
                                                                    <polygon class="ql-stroke" points="7 11 9 13 11 11 7 11">

                                                                    </polygon> 
                                                                    <polygon class="ql-stroke" points="7 7 9 5 11 7 7 7">

                                                                    </polygon> </svg>
                                                                </span>
                                                                <span class="ql-picker-options" aria-hidden="true" tabindex="-1" id="ql-picker-options-2">
                                                                    <span tabindex="0" role="button" class="ql-picker-item" data-value="1">

                                                                    </span>
                                                                    <span tabindex="0" role="button" class="ql-picker-item" data-value="2">

                                                                    </span>
                                                                    <span tabindex="0" role="button" class="ql-picker-item" data-value="3">

                                                                    </span>
                                                                    <span tabindex="0" role="button" class="ql-picker-item ql-selected">

                                                                    </span>
                                                                </span>
                                                            </span>
                                                            <select class="ql-header" style="display: none;">
                                                                <option value="1">

                                                                </option>
                                                                <option value="2">

                                                                </option>
                                                                <option value="3">

                                                                </option>
                                                                <option selected="selected">

                                                                </option>
                                                            </select>
                                                        </span>
                                                        <span class="ql-formats">
                                                            <button type="button" class="ql-bold">
                                                                <svg viewBox="0 0 18 18">
                                                                    <path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"></path> <path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"></path> </svg>
                                                                </button>
                                                                <button type="button" class="ql-italic"><svg viewBox="0 0 18 18"> 
                                                                    <line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"></line> 
                                                                    <line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"></line> 
                                                                    <line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"></line> </svg>
                                                                </button>
                                                                <button type="button" class="ql-underline"><svg viewBox="0 0 18 18">
                                                                    <path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3">

                                                                    </path> <rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"></rect> </svg>
                                                                </button>
                                                                <button type="button" class="ql-link">
                                                                    <svg viewBox="0 0 18 18"> <line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line> <path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path> <path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path> </svg>
                                                                </button></span><span class="ql-formats">
                                                                    <button type="button" class="ql-list" value="ordered"><svg viewBox="0 0 18 18"> <line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"></line> <line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"></line> <line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"></line> <line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"></line> <path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"></path> <path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"></path> <path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"></path> </svg>
                                                                    </button>
                                                                    <button type="button" class="ql-list" value="bullet"><svg viewBox="0 0 18 18"> <line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"></line> <line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"></line> <line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"></line> <line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"></line> <line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"></line> <line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"></line> </svg>
                                                                    </button>
                                                                </span>
                                                                <span class="ql-formats">
                                                                    <button type="button" class="ql-clean"><svg class="" viewBox="0 0 18 18"> <line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"></line> <line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"></line> <line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"></line> <line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"></line> <rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"></rect> </svg>
                                                                    </button></span>
                                                                </div>
                                                                <div class="ql-container ql-snow">
                                                                    <div class="ql-editor ql-blank" data-gramm="false" contenteditable="true" data-placeholder="Insert text here ...">
                                                                        <p>
                                                                            <br>
                                                                        </p>
                                                                    </div>
                                                                    <div class="ql-clipboard" contenteditable="true" tabindex="-1">

                                                                    </div>
                                                                    <div class="ql-tooltip ql-hidden">
                                                                        <a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank">

                                                                        </a>
                                                                        <input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">
                                                                        <a class="ql-action"></a><a class="ql-remove">

                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </span> 
                                                <span>
                                                    <div  role="group" class="form-group" id="__BVID__287">
                                                        <label for="cover-image" class="d-block" id="__BVID__287__BV_label_">
                                                        Cover Image
                                                        </label>
                                                        <div>
                                                            <div  class="image-upload">
                                                                <label for="image-upload" class="image-upload__label form-control"><svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000" width="20" height="20"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>
                                                                    <p >Add Image</p>
                                                                </label> 
                                                                <input type="file" id="image-upload" accept=".png, .jpg, .jpeg" class="d-none form-control-file">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </span> 
                                        <div class="d-flex justify-content-end">
                                            <button type="button" class="btn btn-outline-primary mr-5px">
                                                Batal
                                            </button> 
                                            <button type="submit" class="btn btn-primary">
                                                Simpan
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

<style scoped>
.main-wrapper {
    padding: 78px 0 100px;
}

.section-space{
    padding-top: 22px;
}

</style>