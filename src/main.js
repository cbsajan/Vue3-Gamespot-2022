import { createApp } from 'vue'
import Toaster from "@meforma/vue-toaster";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import StarRating from 'vue-star-rating'
import './firebase'

import App from './App.vue';
import Store from './Store';
import Router from './routes';

const app = createApp(App);
app.component('star-rating', StarRating);
app.use(Antd);
app.use(Toaster);
app.use(Router);
app.use(Store);
app.mount('#app')