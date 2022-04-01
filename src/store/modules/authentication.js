import api from "../../axios";

const authentication = {
    state: {
        user: [],
        userAuthenticated: false
    },
    getters: {
        returnUser: state => state.user,
        authenticated: state => state.userAuthenticated
    },
    actions: {
        authenticateUser: ({ commit }, data) => {
            return new Promise(async (resolve, reject) => {
                await api.post('/authentication', data).then(response => {
                    commit("addUser", response.data.user);
                    resolve(response)
                }).catch(error => {
                    reject(error.response.data.message)
                })
            });
        },
        userLogout: ({ commit }) => {
            commit("logout");
        },
        dataUserRecover: ({ commit }) => {
            return new Promise(async (resolve, reject) => {
                await api.get('/account/me').then(response => {
                    commit("addUser", response.data.content);
                    resolve(response)
                }).catch(error => {
                    reject(error.response.data.message)
                })
            });
        }
    },
    mutations: {
        addUser: (state, user) => {
            state.user = user
            state.userAuthenticated = true
        },
        logout: (state) => {
            state.user = []
            state.userAuthenticated = false
        },
    }
}

export default authentication;