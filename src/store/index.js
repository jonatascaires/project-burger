import { createStore } from 'vuex'
import createBurger from './modules/createBurger';
import requestBurger from './modules/requestBurger';

const store = createStore({
  modules: {
    createBurger,
    requestBurger
  }
});

export default store;