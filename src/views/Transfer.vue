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

                <!-- Alerta -->
                <v-snackbar v-model="alert.active" :color="alert.color" top right>
                    {{ alert.text }}
                    <v-btn  text @click="alert.active = false">Close</v-btn>
                </v-snackbar>
            </v-card>
        </v-col>
        
        <!-- Componente grafica --------------->
        <v-col cols="8" md="8" lg="8" xl="8" class="d-flex justify-center">
          <apexchart width="500" type="pie" :options="options" :series="options.series"></apexchart>
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
import Chart from '../components/Chart02'

export default {
  data: () => ({
    select: [],
    alert:{
      active: false,
      color: '',
      text: ''
    },
    loaded: false,
    options: {
        chart: {
          id: 'vuechart-example'
        },
        series: [],
        labels: []
      }
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
        this.$store.state.transacciones = item.data.transactions
        

        ///// Total de la cuenta 123456789
        this.$store.state.cuentaA = item.data.transactions
            .filter(item => item.fromAccount ==  123456789)
            .reduce((total, item) => {
              return total + item.amount.value
        },0)

        ///// Total de la cuenta 987654321
        this.$store.state.cuentaB = item.data.transactions
            .filter(item => item.fromAccount ==  987654321)
            .reduce((total, item) => {
              return total + item.amount.value
        },0)

        this.options.series = [this.$store.state.cuentaA,this.$store.state.cuentaB]
        
//////  Agrupar cuentas
        let datos = item.data.transactions
        let grupos = datos.reduce((cont, item) => {  
              cont[item.fromAccount] = cont[item.fromAccount] || []
              cont[item.fromAccount].push(item)
              return cont  },{})
         }).catch(err => {
          console.log(err)
      })
  },
  mounted () {
///////// Limpia el formulario 
      this.$refs.formTransfer.reset()         
  },
  methods: {

////////// Agregar datos a las tablas  
      newTransfer(){
      
      ///////////// Modelo de datos
          let dataTransfer = {
                fromAccount: this.$store.state.transfer.fromAccount,
                toAccount: this.$store.state.transfer.toAccount,
                amount: {
                  currency: '',
                  value: this.$store.state.transfer.amount.value
                },
            sentAt: Date()
          }
          
      ////////// Validación de los datos del formulario
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

////////// Se agregan los datos a las tablas

            this.$store.state.transfer.sentAt = Date()

            if(123456789 == dataTransfer.fromAccount){
                dataTransfer.amount.currency = '€'
                
              this.$store.state.cuentaA = 
                  this.$store.state.cuentaA + parseInt(dataTransfer.amount.value)

                if(this.$store.state.tabla01.push(dataTransfer)){

                    //Alerta exitosa
                    this.alert.active = true
                    this.alert.color = 'green darken-2'
                    this.alert.text = 'El monto se agrego exitosamente'
                    this.$refs.formTransfer.reset()  
                } 
                
            }else if(987654321 == dataTransfer.fromAccount){
                dataTransfer.amount.currency = '$'

                this.$store.state.cuentaB = 
                  this.$store.state.cuentaB + parseInt(dataTransfer.amount.value)
                console.log(this.$store.state.cuentaB)

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