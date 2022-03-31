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
            await api.get(`/ingredientes`).then((response) => {
                const breads = response.data.paes;
                commit("addBreads", breads);
            });
        },
        requestBeefs: async ({ commit }) => {
            await api.get(`/ingredientes`).then((response) => {
                const beefs = response.data.carnes;
                commit("addBeefs", beefs);
            });
        },
        requestOptionals: async ({ commit }) => {
            await api.get(`/ingredientes`).then((response) => {
                const optionals = response.data.opcionais;
                commit("addOptionals", optionals);
            });
        },
        saveBurger: ({ commit }, dataBurger) => {
            return new Promise(async (resolve, reject) => {
                await api.post(`/burgers`, dataBurger).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
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