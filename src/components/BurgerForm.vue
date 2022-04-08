<template>
    <div>
        <Message :msg="msg" v-show="msg" />
        <div>
            <form id="burger-form" @submit.stop.prevent="createBurger">
                <div class="input-container">
                    <label for="bread">Escolha o pão:</label>
                    <select id="bread" name="bread" v-model="bread_id">
                        <option :value="0">Selecione o seu pão</option>
                        <option
                            v-for="breads in returnBreads"
                            :key="breads.id"
                            :value="breads.id"
                        >{{ breads.name }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="beef">Escolha a carne do seu Burger:</label>
                    <select id="beef" name="beef" v-model="beef_id">
                        <option :value="0">Selecione o tipo de carne</option>
                        <option
                            v-for="beefs in returnBeefs"
                            :key="beefs.id"
                            :value="beefs.id"
                        >{{ beefs.name }}</option>
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
                            v-model="optional_id"
                            :value="optionals.id"
                        />
                        <span>{{ optionals.name }}</span>
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
            bread_id: 0,
            beef_id: 0,
            optional_id: [],
            msg: null
        };
    },
    async mounted() {
        await this.requestBreads();
        await this.requestBeefs();
        await this.requestOptionals();
    },
    computed: mapGetters(["returnBreads", "returnBeefs", "returnOptionals"]),
    methods: {
        ...mapActions(["requestBreads", "requestBeefs", "requestOptionals", "saveBurger"]),
        createBurger() {
            const dataBurger = {
                breads_id: this.bread_id,
                meats_id: this.beef_id,
                optionals: Array.from(this.optional_id),
            };
            this.saveBurger(dataBurger)
                .then(response => {
                    this.msg = `Pedido de Nº ${response.data} realizado com sucesso!`
                })
                .catch(err => console.log(err));
            this.clearForm();
        },
        clearForm() {
            setTimeout(() => this.msg = "", 3000);
            this.bread_id = "";
            this.beef_id = "";
            this.optional_id = [];
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