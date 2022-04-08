import api from "../../axios";

const createBurger = {
    state: {
        breads: [],
        beefs: [],
        optionals: []
    },
    getters: {
        returnBreads: state => state.breads,
        returnBeefs: state => state.beefs,
        returnOptionals: state => state.optionals,
    },
    actions: {
        requestBreads: async ({ commit }) => {
            await api.get(`/breads`).then((response) => {
                const breads = response.data.content;
                commit("addBreads", breads);
            });
        },
        requestBeefs: async ({ commit }) => {
            await api.get(`/meats`).then((response) => {
                const beefs = response.data.content;
                commit("addBeefs", beefs);
            });
        },
        requestOptionals: async ({ commit }) => {
            await api.get(`/optionals`).then((response) => {
                const optionals = response.data.content;
                commit("addOptionals", optionals);
            });
        },
        saveBurger: ({ commit }, dataBurger) => {
            return new Promise(async (resolve, reject) => {
                await api.post(`/hamburger`, dataBurger).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error.response.data.message)
                })
            });
        },
    },
    mutations: {
        addBreads: (state, breads) => state.breads = breads,
        addBeefs: (state, beefs) => state.beefs = beefs,
        addOptionals: (state, optionals) => state.optionals = optionals
    }
}

export default createBurger;