<template>
<div>
    <apexchart id="chart" width="300" type="pie" :options="options" :series="options.series"></apexchart>
</div>
        
</template>
<script>
export default {
    name: 'charPie',
    data: () => ({
        valores: [],
        options: {
            chart: {
                id: 'chart'
            },
            series: [30,40],
            labels: [],
            legend: {
                show: false, 
            }
        }
    }),
    created(){

///////// Datos de transacciónes

      axios.get('../database/transacctions.json')
        .then(res => {
            let datos = res.data.transactions

            let valores = datos.reduce((acc, item) => {
                    acc[item.fromAccount] = acc[item.fromAccount] || []
                    acc[item.fromAccount].push(item.amount.value)
                    return acc
            },Object.create(null))
            
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>