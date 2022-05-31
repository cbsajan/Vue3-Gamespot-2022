import { createStore } from 'vuex';
import AuthModule from './Auth';
import NotificationsModule from './Notifications';
import ArticlesModule from './Articles'

const store = createStore({
    modules: {
        auth: AuthModule,
        notify: NotificationsModule,
        articles: ArticlesModule
    }
});

export default store;