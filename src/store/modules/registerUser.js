import api from "../../axios";

const registerNewUser = {
    state: {},
    getters: {},
    actions: {
        registerUser: ({ commit }, data) => {
            return new Promise(async (resolve, reject) => {
                await api.post('/account', data).then(response => {
                    console.log('then')
                    resolve(response)
                }).catch(error => {
                    reject(error.response.data.message)
                })
            });
        },
    },
    mutations: {}
}

export default registerNewUser;