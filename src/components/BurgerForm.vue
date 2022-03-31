<template>
    <div>
        <Message :msg="msg" v-show="msg" />
        <div>
            <form id="burger-form" @submit="createBurger">
                <div class="input-container">
                    <label for="name">Nome do cliente:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        v-model="name"
                        placeholder="Digite o seu nome"
                    />
                </div>
                <div class="input-container">
                    <label for="bread">Escolha o pão:</label>
                    <select id="bread" name="bread" v-model="bread">
                        <option value>Selecione o seu pão</option>
                        <option
                            v-for="breads in returnBreads"
                            :key="breads.id"
                            :value="breads.tipo"
                        >{{ breads.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="beef">Escolha a carne do seu Burger:</label>
                    <select id="beef" name="beef" v-model="beef">
                        <option value>Selecione o tipo de carne</option>
                        <option
                            v-for="beefs in returnBeefs"
                            :key="beefs.id"
                            :value="beefs.tipo"
                        >{{ beefs.tipo }}</option>
                    </select>
                </div>
                <div id="optional-container" class="input-container">
                    <label id="optional-title" for="optional">Selecione os opcionais:</label>
                    <div
                        class="checkbox-container"
                        v-for="optionals in returnOptionals"
                        :key="optionals.id"
                    >
                        <input
                            type="checkbox"
                            name="optional"
                            v-model="optional"
                            :value="optionals.tipo"
                        />
                        <span>{{ optionals.tipo }}</span>
                    </div>
                </div>
                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Criar meu Burger" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Message from './Message.vue';

export default {
    name: "BurgerForm",
    components: {
        Message
    },
    data() {
        return {
            bread: "",
            beef: "",
            optional: [],
            name: null,
            msg: null
        };
    },
    computed: mapGetters(["returnBreads", "returnBeefs", "returnOptionals"]),
    mounted() {
        this.requestBreads();
        this.requestBeefs();
        this.requestOptionals();
    },
    methods: {
        ...mapActions(["requestBreads", "requestBeefs", "requestOptionals", "saveBurger"]),
        createBurger(event) {
            event.preventDefault();
            const dataBurger = {
                name: this.name,
                bread: this.bread,
                beef: this.beef,
                optional: Array.from(this.optional),
                status: "Solicitado"
            };
            this.saveBurger(dataBurger)
                .then(response => {
                    this.msg = `Pedido de Nº ${response.data.id} realizado com sucesso!`
                })
                .catch(err => console.log(err));
            this.clearForm();
        },
        clearForm() {
            this.bread = "",
                this.beef = "",
                this.optional = [],
                this.name = null;
            setTimeout(() => this.msg = "", 3000);
        }
    },
    components: { Message }
}
</script>

<style scoped>
#burger-form {
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