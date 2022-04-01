import Cookie from 'js-cookie';
import store from '../store';

export default {
    async auth(to, from, next) {
        const token = Cookie.get('burgerProjectToken');

        if (!token) {
            next('/login');
        }

        store.dispatch("dataUserRecover").then().catch(err => next('/login'))

        next();

    }
}