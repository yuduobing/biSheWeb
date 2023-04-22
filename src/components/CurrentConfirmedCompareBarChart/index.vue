<template>
  <div
    ref="currentConfirmedComoareBarChart"
    style="width: 50%; height: 20%"
  ></div>
</template>
<script>
import * as echarts from 'echarts'
let chart = null
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {
          provinceList: [],
          valueList: []
        }
      }
    }
  },
  methods: {
    initChart () {
      if (null != chart && undefined != chart) {
        chart.dispose()
      }
      chart = this.$echarts.init(this.$refs.currentConfirmedComoareBarChart)
      this.setOptions()
    },
    setOptions() {
      var salvProValue = this.data.valueList;

      var salvProMax = [];//背景按最大值

      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[i])
      }
      if (salvProValue.length>10){
        salvProMax = [];
        for (let i = 0; i < 10; i++) {
          salvProMax.push(salvProValue[i])
        }
      }
      //ss

      let option = {
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          top: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.data.provinceList
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: salvProMax,
            type: 'bar'
          }
        ]
      }
      chart.setOption(option)
    }
  },
  watch: {
    data: {
      handler (newValue, oldValue) {
        if (oldValue != newValue) {
          this.setOptions()
        }
      },
      deep: true
    }
  }
}
</script>
