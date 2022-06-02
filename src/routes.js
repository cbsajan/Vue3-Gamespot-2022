/* eslint-disable */
import { createRouter, createWebHistory, START_LOCATION } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// COMPONENTS
import Home from './components/Home/Index_comp.vue';
import Article_comp from './components/Articles/Article_comp.vue';
import Signin from './components/User/Signin_comp.vue';
import store from './Store/index';
 

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home, name: 'home' },
        { path: '/article/:id', component: Article_comp, name: 'article' },
        { path: '/signin', component: Signin, name: 'signin' }
    ]
})
const auth = getAuth();


const validateCheck = (to, from, next) => {
    next();

    store.commit('notify/setLoading', false);
}


routes.beforeEach((to, from, next) => {
    if (from === START_LOCATION) {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                store.dispatch('auth/autosign', user).then(() => {
                    validateCheck(to, from, next)
                })
            } else {
                validateCheck(to, from, next)
            }
        })
        unsubscribe();
    } else {
        validateCheck(to, from, next)
    }
})


export default routes;