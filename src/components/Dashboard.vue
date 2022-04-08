<template>
    <div class="burger-table">
        <Message :msg="msg" v-show="msg" />
        <div>
            <div id="burger-table-heading">
                <div class="order-id">#:</div>
                <div>Data:</div>
                <div>Pão:</div>
                <div>Carne:</div>
                <div>Opcionais:</div>
                <div>Status:</div>
            </div>
        </div>
        <div id="burger-table-rows">
            <div
                v-for="burgers in returnBurgers.content"
                :key="burgers.id"
                class="burger-table-row"
            >
                <div class="order-number">{{ burgers.id }}</div>
                <div>{{ format(new Date(burgers.created_at), 'dd/MM/yyyy HH:mm:ss') }}</div>
                <div>{{ burgers.breads }}</div>
                <div>{{ burgers.meats }}</div>
                <div>
                    <ul>
                        <li
                            v-for="optionals in burgers.optionals"
                            :key="optionals.length"
                        >{{ optionals.optional }}</li>
                    </ul>
                </div>
                <div>
                    {{ burgers.status_orders }}
                    <button
                        class="delete-btn"
                        @click="removeBurger(burgers.id)"
                        v-show="burgers.status_orders === 'Solicitado'"
                    >Cancelar</button>
                </div>
                <div>
                    <!-- <select
                        name="status"
                        class="status"
                        @change="updateStatusBurger($event.target.value, burgers.id)"
                        v-show="returnUser.level === 'admin'"
                    >
                        <option
                            v-for="status in returnStatus"
                            :key="status.id"
                            :value="status.tipo"
                            :selected="burgers.status == status.tipo"
                        >{{ status.tipo }}</option>
                    </select>-->
                    <!-- <button class="delete-btn" @click="removeBurger(burgers.id)" v-show="burgers.status_orders === 'Solicitado'">Cancelar</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Message from './Message.vue';
import { format } from 'date-fns'

export default {
    name: "Dashboard",
    data() {
        return {
            msg: null,
            format
        }
    },
    components: {
        Message
    },
    computed: mapGetters(["returnBurgers", "returnStatus", "returnUser"]),
    mounted() {
        this.requestBurgers();
        this.requestStatus();
    },
    methods: {
        ...mapActions(["requestBurgers", "requestStatus", "deleteBurger", "updateBurger"]),
        removeBurger(id) {
            this.deleteBurger(id).then(response => {
                this.requestBurgers();
                this.msg = `Pedido de Nº ${id} foi cancelado!`
                setTimeout(() => this.msg = "", 3000)
            })
        },
        updateStatusBurger(event, id) {
            const data = {
                id: id,
                status: event
            }
            this.updateBurger(data).then(response => {
                this.requestBurgers();
                this.msg = `Pedido de Nº ${id} foi atualizado para ${response.data.status}`
                setTimeout(() => this.msg = "", 3000)
            })
        }
    }
}
</script>

<style scoped>
#burger-table {
    max-width: 1200px;
    margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
    display: flex;
    flex-wrap: wrap;
}

#burger-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
}

#burger-table-heading div,
.burger-table-row div {
    width: 19%;
}

.burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #ccc;
}

#burger-table-heading .order-id,
.burger-table-row .order-number {
    width: 5%;
}

select {
    padding: 12px 6px;
    margin-right: 12px;
}

.delete-btn {
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

.delete-btn:hover {
    background-color: transparent;
    color: #222;
}
</style>