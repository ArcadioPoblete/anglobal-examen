import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    transfer: {
      fromAccount: '',
      toAccount: '',
        amount: {
            currency: '',
            value: ''
        },
      sentAt: ''
    },
    getUser: '',
    cuentas: [],
    transacciones: [],
    options: [],
    tabla01: [],
    tabla02: [],
    cuentaA: '',
    cuentaB: ''
  },
  mutations: {
    alert(state){

    }
  },
  actions: {
  },
  modules: {
  }
})
