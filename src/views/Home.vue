<template>
<div>
  <Header></Header>
    <v-container class="mt-10">
      <v-row>
        <v-col cols="8" md="8" lg="8" xl="8" offset-lg="2" class="mt-3">
          <h2 class="text-center">Welcome to your online backign {{ this.$store.state.getUser }}</h2>
        </v-col>
      </v-row>
      <v-row>
        
        <!-- Chart pie -->
        <v-col cols="4" md="4" lg="3" xl="4">
          <v-card>
            <v-card-text>
               <apexchart width="500" type="pie" :options="options" :series="options.series"></apexchart>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <h2>Transactions History</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
              industry's standard dummy text ever since the 1500s.</p>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- Chart pie -->
        
            <!-- Componente card 01 ---------->
            <v-col cols="4" md="4" lg="4" xl="4">
              <card01 />
            </v-col>
            <!-- Componente card01 ---------->

            <!-- Componente card 02 ---------->
            <v-col cols="4" md="4" lg="5" xl="4">
              <card02 />
            </v-col>
            <!-- Componente card 02 ---------->
            
      </v-row>
    </v-container>
</div>
</template>

<script>
import Header from '../components/Header'
import Chart from '../components/Chart02'
import card01 from '../components/Card01'
import card02 from '../components/CardBalane'

export default {
  data: () => ({
    loaded: false,
    userName: '',
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
  },
  mounted (){
    this.loaded = true
       this.options.series = [this.$store.state.cuentaA,this.$store.state.cuentaB]

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

  },
  components:{
    Header,
    Chart,
    card01,
    card02
  }
}
</script>
