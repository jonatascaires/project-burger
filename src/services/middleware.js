import Cookie from 'js-cookie';
import store from '../store';

export default {
    async auth(to, from, next) {
        const token = Cookie.get('burgerProjectToken');

        if (!token) {
            next('/login');
        }

        await store.dispatch("dataUserRecover").catch(err => {
            Cookie.remove('burgerProjectToken')
            next('/login')
        })

        next()

    }
}