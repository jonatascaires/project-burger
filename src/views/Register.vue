<template>
  <div class="main-container">
    <h1>Cadastro:</h1>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="register-form" @submit.stop.prevent="registerNewUser()">
        <div class="input-container">
          <label for="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            placeholder="Digite o seu nome"
            required
          />
        </div>
        <div class="input-container">
          <label for="email">E-mail:</label>
          <input
            type="text"
            id="email"
            name="email"
            v-model="email"
            placeholder="Digite o seu e-mail"
            required
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
            required
          />
        </div>
        <div class="input-container">
          <label for="address">Endereço:</label>
          <input
            type="text"
            id="address"
            name="address"
            v-model="address"
            placeholder="Digite o seu endereço"
            required
          />
        </div>
        <div class="input-container">
          <label for="address">Número:</label>
          <input
            type="number"
            id="number"
            name="number"
            v-model="number"
            placeholder="Digite o número"
            required
          />
        </div>
        <div class="input-container">
          <label for="complement">Complemento:</label>
          <input
            type="text"
            id="complement"
            name="complement"
            v-model="complement"
            placeholder="Digite se tem complemento"
          />
        </div>
        <div class="input-container">
          <label for="phone">Contato:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            v-model="phone"
            placeholder="Digite o seu nº de contato"
            required
          />
        </div>
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Cadastrar" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";
import { mapActions } from 'vuex';

export default {
  name: "Register",
  components: { Message },
  data() {
    return {
      msg: null,
      name: null,
      email: null,
      password: null,
      address: null,
      number: null,
      complement: null,
      phone: null
    }
  },
  methods: {
    ...mapActions(["registerUser"]),
    registerNewUser() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        address: this.address,
        number: this.number,
        complement: this.complement,
        phone: this.phone
      }
      if (this.complement == null || this.complement == "") {
        delete data.complement
      }
      this.registerUser(data)
        .then(async response => {
          this.msg = "Usuário cadastrado com sucesso!"
          setTimeout(() => this.msg = "", 3000)
          this.$router.push('/login')
        })
        .catch(error => {
          this.msg = error
        });
    }
  }
}
</script>

<style scoped>
#register-form {
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
