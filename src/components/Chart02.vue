<script>
import { Pie } from 'vue-chartjs'

export default {
    name: 'Char',
    extends: Pie,
    props: {
        chardata: {
        type: Object,
        default: null
        },
        options: {
        type: Object,
        default: null
        }
    },
    data: () => ({        
    }),
    mounted () {
        this.renderChart(this.chardata, this.options)
    }
}
</script>