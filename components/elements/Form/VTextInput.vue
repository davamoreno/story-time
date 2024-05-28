<template>
    <div class="form-floating mb-3">
        <VField :name="name" v-slot="{field, meta}">
            <input v-bind="Field" 
                class="form-control just-bottom-border" 
                :id="id" 
                :class="{'is-valid' : meta.valid && meta.touched,
                'is-invalid' : meta.valid && meta.touched
                }" :placeholder="placeholder" 
                :type="type" 
                :autocomplete="autocomplete"
            />
            <span class="show-hide-password" v-if="activePasswordEye">
                <i class="fa fa-eye fa-fw" id="show_password" @click="showPassword"></i>
                <i class="fa fa-eye-slash d-none fa-fw" id="hide_password" @click="hidePassword"></i>
            </span>

            <VErrorMessage :name="name" as="div" class="help is-invalid"/>
        </VField>
        <label :for="id" class="form-label" v-if="label">{{ label }}</label>
    </div>
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default:"text",
        require: true
    },
    name:{
        type: String,
        require: true
    },
    id:{
        type: String,
        default: "text",
        require: true,
    },
    label:{
        type: String
    },
    placeholder:{
        type: String,
        default: ""
    },
    autocomplete:{
        type: String,
        default: "true"
    },
    activePasswordEye:{
        type: Boolean,
        default: false
    }
});

const showPassword = (event) => {
    event.target.parentNode.parentNode.children[0].setAttribute('type', 'text')
    event.target.parentNode.parentNode.children[1].children[0].classList.add('d-none')
    event.target.parentNode.parentNode.children[1].children[1].classList.remove('d-none')
}
const hidePassword = (event) => {
    event.target.parentNode.parentNode.children[0].setAttribute('type', 'password')
    event.target.parentNode.parentNode.children[1].children[0].classList.remove('d-none')
    event.target.parentNode.parentNode.children[1].children[1].classList.add('d-none')
}
</script>

<style lang="scss" scoped>

</style>