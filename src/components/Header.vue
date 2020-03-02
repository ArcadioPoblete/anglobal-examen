<template>
  <div>
    <v-app-bar color="light-blue darken-2" dense flat dark>
        <v-toolbar-title>DASHBOARD</v-toolbar-title>
        <v-btn  color="transparent" active-class="light-blue darken-4 active" class="white--text btnNav pt-0 ml-10" tile depressed  to="/home">Home </v-btn>
        <v-btn  color="transparent" active-class="light-blue darken-4" class="white--text btnNav" tile depressed  to="/transfer">Transfer </v-btn>
        <!-- Separador -->
        <v-spacer></v-spacer>
        <v-btn depressed small color="blue darken-3" dark to="/" class="mr-4">Salir</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
    name: 'Header',
    data: () => ({
        
    })
}
</script>