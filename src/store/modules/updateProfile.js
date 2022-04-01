import api from "../../axios";

const requestProfile = {
    state: {},
    getters: {},
    actions: {
        updateProfile: ({ commit }, data) => {
            console.log('chamou')
            return new Promise(async (resolve, reject) => {
                await api.patch('/account/me', data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error.response.data.message)
                })
            });
        },
    },
    mutations: {}
}

export default requestProfile;