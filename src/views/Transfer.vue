<template>
  <div>
    <Header/>
    <v-container class="mt-10">
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
                <v-snackbar v-model="alert.active" :color="alert.color" top right>
                    {{ alert.text }}
                    <v-btn  text @click="alert.active = false">Close</v-btn>
                </v-snackbar>
            </v-card>
        </v-col>
        
        <v-col cols="8" md="8" lg="8" xl="8" class="d-flex justify-center">
          <Chart v-if="loaded" :chardata="charData" :options="options" class="chart-pie"></Chart>
        </v-col>

      </v-row>
      <Tabla/>
    </v-container>
  </div>
</template>

<script>
import Header from '../components/Header'
import Tabla from '../components/Tabla'
import Chart from '../components/Chart02'

export default {
  data: () => ({
    select: [],
    dato01: 300,
    alert:{
      active: false,
      color: '',
      text: ''
    },
    loaded: false,
    charData: null,
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  created (){
  
  ////////// Actualiza el monto de las cuenta

    let cuentas = this.$store.state.cuentas.filter(item => item.account == 123456789)
    let montoA = cuentas.map(item => item.money.value)
    this.$store.state.cuentaVaul01 = String(montoA)

    let cuentasB = this.$store.state.cuentas.filter(item => item.account == 987654321)
    let montoB = cuentas.map(item => item.money.value)
    this.$store.state.cuentaVaul01 = String(montoA)


  //////////// Cuentas

    axios.get('../database/accounts.json')
      .then(item => {
          this.$store.state.cuentas = item.data.accounts
      }).catch(err =>   {
        console.log(err)
      })

  /////////// Transacciones

    axios.get('../database/transacctions.json')
      .then(item => {
        this.$store.state.transacciones = item.data.transactions
      }).catch(err => {
          console.log(err)
      })

  //////////// Selector cuentas  
      this.select = this.$store.state.cuentas.map(item => {
          return{
              text: '****' + String(item.account).substr(5,9) + ' - ' + item.money.currency + item.money.value,
              value: item.account
          }
      })

  },
  mounted () {
///////// Carga la vista de la grafica
      this.loaded = true

///////// Limpia el formulario 
      this.$refs.formTransfer.reset() 

///////// Extrea el monto de cada transacción de cada cuenta
      let cuenta01 = this.$store.state.transacciones.filter(item =>   item.fromAccount == 123456789)
      let monto01 = cuenta01.map(item => {return  parseInt(item.amount.value )})

      let cuenta02 = this.$store.state.transacciones.filter(item =>   item.fromAccount == 987654321)
      let monto02 = cuenta02.map(item => {return  parseInt(item.amount.value )})

///////// Suma el monto total de cada cuenta
      let total01 = 0
      let total02 = 0

      for(let i of monto01) total01 += i
      for(let e of monto02) total02 += e
    
      this.$store.state.monto01 = total01
      this.$store.state.monto02 = total02

     
///////// Muestra el total de cada transacción de cada una de las cuentas
        this.charData = {
          labels: ['CUENTA: ****6789', 'CUENTA: ****4321'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [total01,total02],
              backgroundColor: ['#4DB6AC','#00897B']
            }
          ]
        }
        
  },
  methods: {

////////// Agregar datos a las tablas  
      newTransfer(){
      
      ////////// Modelo de datos

          let dataTransfer = {
                fromAccount: this.$store.state.transfer.fromAccount,
                toAccount: this.$store.state.transfer.toAccount,
                amount: {
                  currency: '',
                  value: this.$store.state.transfer.amount.value
                },
            sentAt: Date()
          }

////////// Validación de los datos

          if(this.$store.state.transfer.fromAccount == null){
              
              this.alert.active = true
              this.alert.color = 'red darken-4'
              this.alert.text = 'El campo cuenta esta vacio'

          }else if (this.$store.state.transfer.toAccount == null){
              
              this.alert.active = true
              this.alert.color = 'red darken-4'
              this.alert.text = 'El campo destino esta vacio'

          }else if(this.$store.state.transfer.amount.value == null){
              
              this.alert.active = true
              this.alert.color = 'red darken-4'
              this.alert.text = 'El monto esta vacio'

          }else {

            let cuentas = this.$store.state.cuentas.filter(item => item.account == dataTransfer.fromAccount)
            let montoA = cuentas.map(item => item.money.value)
            

////////// Se agregan los datos a las tablas
    
            let cuenta01 = 123456789
            let cuenta02 = 987654321
            this.$store.state.transfer.sentAt = Date()

           
            if(cuenta01 == dataTransfer.fromAccount){
                dataTransfer.amount.currency = '€'
                let suma = this.$store.state.monto01 = 
                    this.$store.state.monto01 + parseInt(dataTransfer.amount.value)
                
                if(this.$store.state.tabla01.push(dataTransfer)){
                    
                    //Alerta exitosa
                    this.alert.active = true
                    this.alert.color = 'green darken-2'
                    this.alert.text = 'El monto se agrego exitosamente'
                    this.$refs.formTransfer.reset()  
                }
                
            }else if(cuenta02 == dataTransfer.fromAccount){
                dataTransfer.amount.currency = '$'
                 let suma = this.$store.state.monto02 = 
                    this.$store.state.monto01 + parseInt(dataTransfer.amount.value)

                if(this.$store.state.tabla02.push(dataTransfer)){
                    
                    //Alerta exitosa
                    this.alert.active = true
                    this.alert.color = 'green darken-2'
                    this.alert.text = 'El monto se agrego exitosamente'
                    this.$refs.formTransfer.reset() 
                }
            }
          }
        }
  },
  components: {
    Header,
    Tabla,
    Chart
  } 
}
</script>