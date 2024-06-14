<template>
   <QuillEditor :options="options" contentType="html"/>
</template>

<script setup>
    import { QuillEditor } from '@vueup/vue-quill';
    import '@vueup/vue-quill/dist/vue-quill.snow.css';

    const toolbarOptions = [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'link'],

        [{ 'list': 'ordered'}, { 'list': 'bullet' } ],

        ['clean']
    ];

    const options = ref({
        modules: {
            toolbar: toolbarOptions
        },
        placeholder: 'Insert text here...',
        readOnly: false,
        Theme: 'snow' 
    })
</script>