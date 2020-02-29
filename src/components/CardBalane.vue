<template>
<v-card>
    <v-card-text>
        <h2>Current Balance</h2>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-center">Account Nº</th>
                    <th class="text-center">Balance</th>
                    <th class="text-center">Date of Latest Transfer</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in dataBalance" :key="index">
                    <td class="text-center">****{{ String(item.account).substr(0,4) }}</td>
                    <td class="text-center">{{ item.balance.currency }} {{ item.balance.value }}</td>
                    <td class="text-center">{{ item.createdAt }}</td>
                </tr>
                </tbody>
            </template>  
        </v-simple-table>
    </v-card-text>
</v-card>
</template>


<script>
export default {
    name: 'Card02',
    data: () => ({
        dataBalance: []
    }),
    created(){

        const urlBalance = '../database/balance.json'

        axios.get(urlBalance).then( item =>{
            this.dataBalance = item.data.balance
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>