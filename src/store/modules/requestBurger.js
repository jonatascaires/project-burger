import api from "../../axios";

const requestBurger = {
    state: {
        burgers: [],
        status: []
    },
    getters: {
        returnBurgers: state => state.burgers,
        returnStatus: state => state.status,
    },
    actions: {
        requestBurgers: async ({ commit }) => {
            await api.get(`/burgers`).then((response) => {
                const burgers = response.data;
                commit("addBurgers", burgers);
            });
        },
        requestStatus: async ({ commit }) => {
            await api.get(`/status`).then((response) => {
                const status = response.data;
                commit("addStatus", status);
            });
        },
        deleteBurger: ({ commit }, id) => {
            return new Promise(async (resolve, reject) => {
                await api.delete(`/burgers/${id}`).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            });
        },
        updateBurger: ({ commit }, data) => {
            return new Promise(async (resolve, reject) => {
                await api.patch(`/burgers/${data.id}`, {status: data.status}).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            });
        },
    },
    mutations: {
        addBurgers: (state, burgers) => state.burgers = burgers,
        addStatus: (state, status) => state.status = status,
    }
}

export default requestBurger;