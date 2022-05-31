/* eslint-disable */
import { createRouter, createWebHistory, START_LOCATION } from 'vue-router';

// COMPONENTS
import Home from './components/Home/Index_comp.vue';
import Article_comp from './components/Articles/Article_comp.vue';


const routes = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home, name: 'home' },
        { path: '/article/:id', component: Article_comp, name: 'article' }
    ]
})


export default routes;