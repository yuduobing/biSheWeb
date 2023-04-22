<!-- 累计趋势 -->
<template>
  <div ref="basicPieChart" style="width: 100%; height: 100%" />
</template>
<script>
import * as echarts from 'echarts'
let chart = null
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    data: Object
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        if (oldValue !== newValue) {
          this.setOptions()
        }
      },
      deep: true
    }
  },
  watch: {
    data: {
      handler(newList, oldList) {
        if (oldList !== newList) {
          this.setOptions()
        }
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      if (chart !== null && undefined !== chart) {
        chart.dispose()
      }
      chart = echarts.init(this.$refs.basicPieChart)
      this.setOptions()
    },
    setOptions() {
      var yData = this.data.showData
      const option = {
        // backgroundColor: '#0B1837',
        color: [
          '#EAEA26',
          '#906BF9',
          '#FE5656',
          '#01E17E',
          '#3DD1F9',
          '#FFAD05'
        ],
        grid: {
          left: -100,
          top: 50,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        polar: {},
        angleAxis: {
          interval: 1,
          type: 'category',
          data: [],
          z: 10,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#0B4A6B',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: '#0B4A6B',
            margin: 8,
            fontSize: 16
          }
        },
        radiusAxis: {
          min: 40,
          max: 120,
          interval: 20,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#0B3E5E',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            formatter: '{value} %',
            show: false,
            padding: [0, 0, 20, 0],
            color: '#0B3E5E',
            fontSize: 16
          },
          splitLine: {
            lineStyle: {
              color: '#0B3E5E',
              width: 2,
              type: 'solid'
            }
          }
        },
        calculable: true,
        series: [
          {
            type: 'pie',
            radius: ['5%', '10%'],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false,
                length: 30,
                length2: 55
              },
              emphasis: {
                show: false
              }
            },
            data: [
              {
                name: '',
                value: 0,
                itemStyle: {
                  normal: {
                    color: '#0B4A6B'
                  }
                }
              }
            ]
          },
          {
            type: 'pie',
            radius: ['90%', '95%'],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false,
                length: 30,
                length2: 55
              },
              emphasis: {
                show: false
              }
            },
            name: '',
            data: [
              {
                name: '',
                value: 0,
                itemStyle: {
                  normal: {
                    color: '#0B4A6B'
                  }
                }
              }
            ]
          },
          {
            stack: 'a',
            type: 'pie',
            radius: ['20%', '80%'],
            roseType: 'area',
            zlevel: 10,
            label: {
              normal: {
                show: true,
                formatter: '{b} :{c}',
                textStyle: {
                  fontSize: 12
                },
                position: 'outside'
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 55
              },
              emphasis: {
                show: false
              }
            },
            data: yData
          }
        ]
      }
      chart.setOption(option)
    }
  }
}
</script>
