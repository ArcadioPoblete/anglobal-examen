<template>
  <div>
    <Header/>
    <v-container class="mt-12">
      <v-row>
        <v-col cols="4" md="4" lg="4" xl="4">
             <v-card>
              <!-- Titulo -->
              <v-card-title class="headline light-blue darken-1 white--text">
                Create new transfer
              </v-card-title>

              <!-- Card Transfer -->
              <v-card-text>
                  <!-- Formulario -->
                  <v-form ref="formTransfer">
                    <v-row>
                        <!-- Select Cuentas -->
                        <v-col cols="12" class="pb-0">
                          <v-select  :items="select" label="Accounts" v-model="$store.state.transfer.fromAccount"></v-select>
                        </v-col> 
                        
                        <!-- Destino -->
                        <v-col cols="12" class="pt-0 pb-0">
                          <v-text-field  label="Destination account"  counter="8" maxlength="8" v-model="$store.state.transfer.toAccount"></v-text-field>
                        </v-col>
                        
                        <!-- Monto a transferir -->
                        <v-col cols="12" class="pt-0 pb-0">
                          <v-text-field label="Amount" v-model="$store.state.transfer.amount.value"></v-text-field>
                        </v-col> 
                    </v-row>
                  </v-form>
              </v-card-text>

              <v-divider></v-divider>

              <!-- Acciones -->
              <v-card-actions class="pa-0">
                <v-spacer></v-spacer>
                    <!-- New transfer -->
                    <v-btn color="green darken-3" tile dark depressed class="btnTrans" @click="newTransfer">Transfer</v-btn>
                    <!-- Cancel transfer -->
                    <v-btn color="blue-grey lighten-4" tile depressed @click="$refs.formTransfer.reset()" class="btnTrans ml-0">Cancel</v-btn>
              </v-card-actions>

                <!-- Alerta -->
                <v-snackbar v-model="alert.active" :color="alert.color" top right>
                    {{ alert.text }}
                    <v-btn  text @click="alert.active = false">Close</v-btn>
                </v-snackbar>

            </v-card>
        </v-col>
        
        <!-- Componente grafica --------------->
        <v-col cols="12" md="8" lg="8" xl="8" class="d-flex justify-center align-center">
          <char-pie></char-pie>
        </v-col>
        <!-- Componente grafica --------------->

      </v-row>
      <Tabla/>
    </v-container>
  </div>
</template>

<script>
import Header from '../components/Header'
import Tabla from '../components/Tabla'
import charPie from '../components/Chart'

export default {
  data: () => ({
    select: [],
    monto: '',
    alert:{
      active: false,
      color: '',
      text: ''
    },
    loaded: false,
  }),
  created (){

  //////////// Cuentas
    axios.get('../database/accounts.json')
      .then(item => {
          this.$store.state.cuentas = item.data.accounts
      }).catch(err =>   {
        console.log(err)
      })

 //////////// Selector cuentas  
      this.select = this.$store.state.cuentas.map(item => {
          return{
              text: '****' + String(item.account).substr(5,9) + ' - ' + item.money.currency + item.money.value,
              value: item.account
          }
      })

  /////////// Obtener transacciónes
    axios.get('../database/transacctions.json')
      .then(item => {
        let datos = item.data.transactions
       
        let grupos = datos.reduce((cont, item) => {  
              cont[item.fromAccount] = cont[item.fromAccount] || []
              cont[item.fromAccount].push(item)
              return cont  },{})
         }).catch(err => {
          console.log(err)
      })
  },
  methods: {
////////// Agregar datos a las tablas  
      newTransfer(){

      ///////////// Modelo de datos
        let newItem = {
                fromAccount: this.$store.state.transfer.fromAccount,
                toAccount: this.$store.state.transfer.toAccount,
                amount: {
                  currency: '',
                  value: this.$store.state.transfer.amount.value
                },
                sentAt: Date()
          }

      ////////// Validación de la cuenta
          if(this.$store.state.transfer.fromAccount == null){
              
              this.alert.active = true
              this.alert.color = 'red darken-4'
              this.alert.text = 'El campo cuenta esta vacio'
      
      ////////// Validación del campo destino
          }else if (this.$store.state.transfer.toAccount == null){
              
              this.alert.active = true
              this.alert.color = 'red darken-4'
              this.alert.text = 'El campo destino esta vacio'
      
      ////////// Validación del monto
          }else if(this.$store.state.transfer.amount.value == null){
              
              this.alert.active = true
              this.alert.color = 'red darken-4'
              this.alert.text = 'El monto esta vacio'

          }else {            
      
      ///////// Se agregan los datos a la cuenta
            axios.get('../database/accounts.json')
              .then(item => {
                let datos = item.data.accounts
                
      ///////// Se busaca el valor de la moneda
                let cuentas = datos.reduce((acc, item) => {
                      acc[item.account] = acc[item.account] || []
                      acc[item.account].push(item.money.currency)
                      return acc
                },Object.create(null))
      
      ///////// Se valida que la cuenta tenga saldo sufucuente
                let montoCuenta = datos.filter(item => item.account == newItem.fromAccount)
                      .map(item => {
                        return item.money.value
                      })

                  if(newItem.amount.value > parseInt(montoCuenta)){
                      this.alert.active = true
                      this.alert.text = 'La cuenta notien sufucuente saldo'
                      this.alert.color = 'amber darken-2'
                  }else{
                     
        ////////// Si cumple con elmonto se acepta la transferencia
                    newItem.amount.currency = String(cuentas[newItem.fromAccount])

                    if (this.$store.state.dataTable[newItem.fromAccount].push(newItem)) {
                      this.$refs.formTransfer.reset()
                    }else{
                        console.log('Ocurrio un error')
                    }
                  }
                }).catch(err =>   {
                    console.log(err)
                })
          }
        }
  },
  components: {
    Header,
    Tabla,
    charPie
  } 
}
</script>