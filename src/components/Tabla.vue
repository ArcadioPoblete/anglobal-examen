<template>
<v-row>
    <v-col cols="6" md="6" lg="12" xl="6" v-for="(item,index) in $store.state.dataTable" :key="index">
        <v-card>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">Origin Account</th>
                            <th class="text-center">Destination account</th>
                            <th class="text-center">Transfer date</th>
                            <th class="text-left">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(res, index) in item " :key="index">
                                <td class="text-center">* * * * *{{ String(res.fromAccount).substr(5,9) }} </td>
                                <td class="text-center">{{ res.toAccount }}</td>
                                <td class="text-center">{{ res.sentAt.substr(0,10) }}</td>
                                <td class="text-left">{{ res.amount.currency }} {{ res.amount.value }}</td>
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

    }),
    created(){
    ///////////// Grupo de tablas
       axios.get('../database/transacctions.json')
        .then(res => {
            
            let datos = res.data.transactions

            let createTable = datos.reduce((acc, item) => {
                acc[item.fromAccount] = acc[item.fromAccount] || []
                acc[item.fromAccount].push(item)
                return  acc
            },Object.create(null))
    
            this.$store.state.dataTable = createTable

        }).catch(err => {
            console.log(err)
        })

    },
    mounted(){
        
    }
}
</script>