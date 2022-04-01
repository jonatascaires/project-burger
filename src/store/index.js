import { createStore } from 'vuex'
import createBurger from './modules/createBurger';
import requestBurger from './modules/requestBurger';
import authentication from './modules/authentication';
import registerUser from './modules/registerUser';
import updateProfile from './modules/updateProfile';

const store = createStore({
  modules: {
    createBurger,
    requestBurger,
    authentication,
    registerUser,
    updateProfile
  }
});

export default store;