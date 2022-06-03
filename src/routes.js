/* eslint-disable */
import { createRouter, createWebHistory, START_LOCATION } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// COMPONENTS
import Home from './components/Home/Index_comp.vue';
import Article_comp from './components/Articles/Article_comp.vue';
import Signin from './components/User/Signin_comp.vue';
import store from './Store/index';
import Dashboard from "./components/User/Dashboard/Index_comp.vue";

import UserMain from './components/User/Dashboard/Main_comp.vue';
import UserProfile from './components/User/Dashboard/Pages/user_profile.vue';
import AdminArticles from './components/User/Dashboard/Admin/all_articles.vue';
import AdminAddArticles from './components/User/Dashboard/Admin/add_article.vue';
const routes = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home, name: 'home' },
        { path: '/article/:id', component: Article_comp, name: 'article' },
        { path: '/signin', component: Signin, name: 'signin', meta: { signin: true } },
        {
            path: '/user/dashboard', component: Dashboard, meta: { auth: true }, children: [
                { path: '', component: UserMain, name: 'dashboard' },
                { path: 'profile', component: UserProfile, name: 'user_profile' },
                { path: 'articles', component: AdminArticles, name: 'admin_articles' },
                { path: 'articles/add', component: AdminAddArticles, name: 'admin_add' },
            ]
        }
    ]
})
const auth = getAuth();


const validateCheck = (to, from, next) => {
    if (to.meta.auth && !store.getters['auth/isAuth']) {
        next('/signin');
    } else if (to.meta.signin && store.getters['auth/isAuth']) {
        next('/user/dashboard');
    } else {
        next();
    }
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