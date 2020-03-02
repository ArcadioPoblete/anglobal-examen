import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataTable: [],
    dataPie: [],
    transfer: {
      fromAccount: '',
      toAccount: '',
        amount: {
            currency: '',
            value: ''
        },
      sentAt: ''
    },
    dataSeries: [],
    getUser: '',
    cuentas: [],
    transacciones: [],
  },
  mutations: {
   
  },
  actions: {
  },
  modules: {
  }
})
