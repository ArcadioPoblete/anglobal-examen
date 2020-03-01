<template>
<v-row>
    <!-- Tabla cuenta "123456789" -->
    <v-col cols="6" md="12" lg="12" xl="6">
        <v-card>
            <v-card-title>
                Cuenta: ****6789  Total: {{ this.$store.state.cuentaA }}
            </v-card-title>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">Origin Account</th>
                            <th class="text-center">Destination account</th>
                            <th class="text-center">Transfer date</th>
                            <th class="text-center">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in   $store.state.tabla01" :key="index">
                                <td class="text-center">****{{ String(item.fromAccount).substr(5,9)}}</td>
                                <td class="text-center">{{ item.toAccount }}</td>
                                <td class="text-center">{{ item.sentAt.substr(0,10)}}</td>
                                <td class="text-center">{{item.amount.currency}} {{item.amount.value}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>
    </v-col>

    <!-- Tabla cuenta "987654321" -->
    <v-col cols="6" md="12" lg="12" xl="6">
        <v-card>
            <v-card-title>
                Cuenta: ****4321 Total: {{  this.$store.state.cuentaB }}
            </v-card-title>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">Origin Account</th>
                            <th class="text-center">Destination account</th>
                            <th class="text-center">Transfer date</th>
                            <th class="text-center">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in  $store.state.tabla02" :key="index">
                                <td class="text-center">****{{ String(item.fromAccount).substr(5,9)}}</td>
                                <td class="text-center">{{ item.toAccount }}</td>
                                <td class="text-center">{{ item.sentAt.substr(0,10)}}</td>
                                <td class="text-center">{{item.amount.currency}} {{item.amount.value}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
export default {
    name: 'TablaCuentas',
    data: () => ({
        dataTable: [],
    }),
    created(){
            
    ///////////// Grupo de tablas
        let cuenta01 = this.$store.state.transacciones.filter( item => item.fromAccount == 123456789)
        let cuenta02 = this.$store.state.transacciones.filter( item => item.fromAccount == 987654321)

        this.$store.state.tabla01 = cuenta01
        this.$store.state.tabla02 = cuenta02
    }
}
</script>