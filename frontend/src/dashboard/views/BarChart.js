import { Bar } from 'vue-chartjs'
// const { reactiveProp } = mixins

export default {
  extends: Bar,
  props:['data','options'],
 

  mounted () {
    this.renderChart(this.data, this.options)
  },

}