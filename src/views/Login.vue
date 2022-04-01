<template>
  <div class="main-container">
    <h1>Login:</h1>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="login-form" @submit.stop.prevent="authenticate()">
        <div class="input-container">
          <label for="email">E-mail:</label>
          <input
            type="text"
            id="email"
            name="email"
            v-model="email"
            placeholder="Digite o seu e-mail"
          />
        </div>
        <div class="input-container">
          <label for="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            placeholder="Digite a sua senha"
          />
        </div>
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Entrar" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";
import { mapGetters, mapActions } from 'vuex';
import Cookie from 'js-cookie';

export default {
  name: "Login",
  components: { Message },
  data() {
    return {
      msg: null,
      email: null,
      password: null
    }
  },
  computed: mapGetters([""]),
  mounted() {

  },
  methods: {
    ...mapActions(["authenticateUser"]),
    authenticate() {
      const data = {
        email: this.email,
        password: this.password
      }
      this.authenticateUser(data)
        .then(async response => {
          this.msg = "Usuário autenticado!"
          setTimeout(() => this.msg = "", 3000)
          await Cookie.set('burgerProjectToken', response.data.user.token);
          this.$router.push('/')
        })
        .catch(err => {
          this.msg = "E-mail e/ou senha incorreto(s)!"
          setTimeout(() => this.msg = "", 3000)
        });
    }
  }
}
</script>

<style scoped>
#login-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

input,
select {
  padding: 5px 10px;
  width: 300px;
}

#optional-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#optional-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
