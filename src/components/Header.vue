<template>
   <div class="header">
      <v-row>
          <v-col cols="12" md="2" lg="2"  xl="2" class="secc-brand pa-0 mt-0">
              <p class="white--text pa-0 ma-0">DASHBOARD</p>
          </v-col>
            <v-col cols="4" md="4" lg="3" xl="3" class="pt-0">
              <v-btn 
                color="transparent" 
                active-class="blue darken-4 active" 
                class="white--text btnNav pt-0"
                tile 
                depressed  
                to="/home">
                Home </v-btn>
              <v-btn 
                color="transparent" 
                active-class="blue darken-4" 
                class="white--text btnNav" 
                tile
                depressed  
                to="/transfer">
                Transfer </v-btn>
            </v-col>
            <v-col cols="2" md="2" lg="2" xl="1" offset-lg="5" class="pt-0 d-flex justify-end align-center">
                <v-btn
                depressed
                small
                color="blue darken-3"
                dark
                to="/"
                class="mr-4"
                >Salir</v-btn>
            </v-col>
      </v-row>
   </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>