<template>
    <div id="nav">
        <router-link to="/" id="logo_url">
            <img :src="logo" :alt="alt" id="logo" />
        </router-link>
        <router-link to="/profile" v-show="authenticated" id="name-user">{{returnUser.name}}</router-link>
        <router-link to="/" v-show="authenticated">Novo pedido</router-link>
        <router-link to="/pedidos" v-show="authenticated">Meus pedidos</router-link>
        <router-link to="/ebook" v-show="authenticated">E-Book</router-link>
        <router-link to="/login" @click="logout" v-show="authenticated">Sair</router-link>
        <router-link to="/login" v-show="!authenticated && (this.$route.name == 'Login' || this.$route.name == 'Register')">Login</router-link>
        <router-link to="/register" v-show="!authenticated && (this.$route.name == 'Login' || this.$route.name == 'Register')">Cadastro</router-link>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "Navbar",
    props: ['logo', 'alt'],
    computed: mapGetters(["authenticated", "returnUser"]),
    methods: {
        ...mapActions(["userLogout"]),
        logout() {
            Cookie.remove('burgerProjectToken')
            this.userLogout()
        }
    }
}
</script>

<style scoped>
#nav {
    background-color: #222;
    border-bottom: 4px solid #111;
    padding: 10px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

#nav #logo_url {
    margin: auto;
    margin-left: 0;
}

#logo {
    height: 75px;
    width: 85px;
}

#nav a {
    color: #fcba03;
    text-decoration: none;
    margin: 12px;
    transition: 0.5s;
}

#nav a:hover {
    color: #fff;
}

#name-user {
    color: #fff;
    margin-right: 12px;
    padding-right: 20px;
    border-right: 2px solid #fff;
}
</style>