/* eslint-disable */
import { createRouter, createWebHistory, START_LOCATION } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// COMPONENTS
import Home from './components/Home/Index_comp.vue';
import Article_comp from './components/Articles/Article_comp.vue';
import Signin from './components/User/Signin_comp.vue';


const routes = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home, name: 'home' },
        { path: '/article/:id', component: Article_comp, name: 'article' },
        { path: '/signin', component: Signin, name: 'signin' }
    ]
})
const auth = getAuth();


routes.beforeEach((to, from, next) => {
    if (from === START_LOCATION) {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log(user, 'autosign in')
            } else {
                console.log(user, 'not autosign in')
            }
        })
        next();
    } else {
        console.log('other')
        next()
    }
})

export default routes;