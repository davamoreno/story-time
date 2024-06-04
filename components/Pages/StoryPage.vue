<template>
    <div class="container">
        <section class="section-story">
            <div class="home__filter">
                <div class="row justify-content-between">
                    <div class="col-4">
                        <div role="group" class="input-group">
                            <input class="form-control" type="text" id="searchInput" placeholder="Search Story..." v-model="keyword" @input="onKeywordChange"> 
                            <div class="input-group-append">
                                <button type="button" class="btn btn-dark" >
                                    <svg width="10px" height="10px" class="svg" viewBox="0 0 0 0" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="box" stroke-linejoin="box"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <select class="mb-3 costum-select" v-model="sort" @change="onSortChange">
                            <option disabled="disabled" value="sort"> Sort </option><slot/>
                            <option value="newest"> Newest </option><slot/>
                            <option value="az"> A-Z </option><slot/>
                            <option value="za"> Z-A </option><slot/>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6 col-lg-3 mb-25px" v-for="story in stories" :key="story.id">
                    <div class="story h-100">
                        <NuxtLink :to="`/posts/${story.id}`" ref="" class="story__image">
                            <img v-if="story.cover_image" :src="baseUrl + story.cover_image.url" alt="" class="img-fluid">
                        </NuxtLink>
                        <div class="story__info">
                            <a href="" class="story__link">
                                <h2 class="story__title">{{ story.title }}</h2>
                            </a>
                            <p class="story__desc">{{ story.content }}</p>
                            <div class="story__footer">
                                <p class="story__sub-info" v-if="story.author">by {{ story.author.username }}</p>
                                <p class="story__sub-info">{{ formatDate(story.createdAt) }}</p>
                                <button class="btn story__favorite shadow"><i class="fa-regular fa-bookmark"></i></button>
                            </div>
                            <div class="story__footer">
                                <span class="m badge badge-secondary" v-if="story.author">{{ story.category.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
                <a class="btn btn-outline-dark" v-if="hasMore" @click="loadMore">Load More</a>
            </div>
        </section>
    </div>    
</template>

<script setup lang="ts">
import { ref,computed } from 'vue'
import { useStories } from '~/stores/stories'
import { useNuxtApp } from '#app';

const baseUrl = "https://storytime-api.strapi.timedoor-js.web.id/";

const storyStore = useStories();

const stories = computed(() => storyStore.stories);
const hasMore = computed(() => storyStore.hasMore);

const keyword = ref<string>('');
const sort = ref<string>('sort');

const onKeywordChange = () => {
    storyStore.setKeyword(keyword.value);
}
const onSortChange = () => {
    storyStore.setSortBy(sort.value);
}

const loadMore = () => {
    storyStore.fetchStories(true);
}

onMounted(() => {
    storyStore.fetchStories()
})

function formatDate(time) {
    const date = new Date(time);
    
    // Get year, month, and day part from the date
    const year = date.toLocaleString("default", { year: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    
    return `${day} ${month} ${year}`;
}
</script>

<style lang="scss" scoped>
.remove-space, body, figure, h1, h2, h3, h4, h5, h6, html, p {
    margin: 0;
    padding: 0;
}
a {
    color: #0e0e0e;
    text-decoration: none;
    background-color: transparent;
}
.story{
    position: relative;
    transition: all .3s ease;
}
.story__favorite{
    opacity: 0;
    position: absolute;
    font-size: 18px;
    top: 5px;
    right: 5px;
    background: #fff;
    padding: 7px;
    border-radius: 50px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn:not(:disabled):not(.disabled) {
    cursor: pointer;
    }
}
.badge-secondary {
    background-color: #eee;
    color: #0e0e0e;
    font-weight: 500;
}
.mb-25px {
    margin-bottom: 25px !important;
}
.badge {
    display: inline-block;
    padding: .25em .4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
.story__desc{
    font-size: 14px;
    color: #8f8f8f;
    display: block;
    display: -webkit-box;
    line-height: 1.4;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
.story__title{
    font-size: 18px;
    margin-bottom: 5px;
}
.story__footer{
    font-size: 12px;
    color: #8f8f8f;
    margin-top: 5px;
}
.story__sub-info{
    font-size: 12px;
    color: #8f8f8f;
    line-height: 1.2;
}
.story__info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
}
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #fff;
}
.row{
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}
.story__image{
    display: block;
    position: relative;
    height: 160px;
    img{
    object-fit: cover;
    height: 100%;
    width: 100%;
    }
}
.card, .story {
    border: none;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
    border-radius: 0;
}
.costum-select{
    display: inline-block;
    width: 100%;
    color: #495057;
    vertical-align: middle;
    height: calc(1.5rem + .75rem + 2px);
    padding: .375rem 1.75rem .375rem .75rem;
    background: #fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") right .75rem center/8px 10px no-repeat;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.btn{
    border-radius: 0;
}
.home__filter{
    margin: 20px 0;
}
option:disabled {
    color: light-dark(graytext, rgb(170, 170, 170));
}
option {
    font-weight: normal;
    display: block;
    min-height: 1.2em;
    padding: 0px 2px 1px;
    white-space: nowrap;
}
</style>