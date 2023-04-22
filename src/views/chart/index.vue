<template>
    <div class="app-container">
      <el-row>
        <!--左边-->
        <el-col :span="6">
          <chart-card title="今日确诊病例">
            <zhu-zhuang-tuHeng-xiang-chart
              ref="quezhenZhuZhuangTu"
              :data="zhuzhuangtuhengxiangData"
              style="width: 100%; height: 480px"
            ></zhu-zhuang-tuHeng-xiang-chart>
          </chart-card>

          <div style="margin-top: 40px;">
            <chart-card title="新增趋势">
              <basic-trend-chart  :data="basicIncrTrendData" ref="xinzengTrendChart" style="width: 100%; height: 320px"/>
            </chart-card>
          </div>
        </el-col>

        <!--中间-->
        <el-col :span="12">
          <!--顶部-->
          <el-row>
            <el-col :span="4">
              <basic-data-item-label label="全国累计确诊" :inCrValue="confirmedCount" />
            </el-col>
            <el-col :span="4" style="margin-left:10px;">
              <basic-data-item-label label="全国累计治愈" :inCrValue="zhiyuCount" />
            </el-col>
            <el-col :span="4" style="margin-left:10px;">
              <basic-data-item-label label="全国累计死亡" :inCrValue="deadCount" />
            </el-col>
          </el-row>

          <!--地图-->
          <el-row style="margin-top: 20px;">
            <div style="width: 98%;height: 800px;padding: 10px 10px 10px 10px;background: #0f142b !important; border-radius: 10px;margin: 0 auto;">
                <china-map
                  ref="ChinaMap"
                  title=""
                  :list="mapDataList"
                  style="width: 100%; height: 100%"
                />
            </div>
          </el-row>
        </el-col>

        <!--右边-->
        <el-col :span="6">
          <!--饼状图-->
          <el-row>
            <!--比率图-->
            <chart-card
              title="治愈率和死亡率"
              :innerClass="`cure-and-dead-rate-chart`"
              :customClass="`chart-item-bottom-sep`"
            >
              <rate-chart
                ref="zhiyuRateChart"
                :data="zhiyuRate"
                title="治愈率"
                style="width: 280px; height: 130px"
              />
            </chart-card>

            <!--死亡率饼状图-->
            <chart-card title="死亡率饼状图" style="margin-top: 15px;">
              <basic-pie-chart  :data="basicPieData" ref="basicPieData" style="width: 100%; height: 320px"/>
            </chart-card>

            <!--累计治愈折线图-->
            <div style="margin-top: 20px;">
              <chart-card title="治愈趋势">
                <basic-trend-chart2  :data="zhiyuTrendData" ref="zhiyuTrendChart" style="width: 100%; height: 320px"/>
              </chart-card>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import ChartCard from './ChartCard'
import ZhuZhuangTuHengXiangChart from './ZhuZhuangTuHengXiangChart.vue'
import BasicDataItemLabel from './BasicDataItemLabel.vue'
import BasicTrendChart from './BasicTrendChart.vue'
import BasicTrendChart2 from './BasicTrendChart2.vue'
import ChinaMap from './ChinaMap'
import BasicPieChart from './BasicPieChart'
import RateChart from './RateChart'
import { getToDayConfirmed, getDeadOfProvince, getConfirmedTread, getQuanguoConfirmed,
  getLeijiZhiyu, getLejiDead, getZhiyuTread, getLeijiConfirmed, getDeadAndZhiyuRate } from '@/api/covid'
export default {
  name: 'ChartIndex',
  data() {
    return {
      zhiyuRate: {
        curedRate: 0.2,
        deadRate: 0.3
      },
      zhiyuCount: 0,
      deadCount: 0,
      confirmedCount: 0,
      zhuzhuangtuhengxiangData: {
        keyList: ['河南', '云南', '广州', '上海', '四川', '陕西', '宝宝'],
        valueList: [45, 56, 23, 90, 100, 34, 88]
      },
      basicIncrTrendData: {
        yDateList: [45, 56, 23, 90, 100, 34, 88],
        xDataList: ['1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8']
      },
      zhiyuTrendData: {
        yDateList: [45, 56, 23, 90, 100, 34, 88],
        xDataList: ['1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8']
      },
      basicPieData: {
        showData: []
      },
      mapDataList: [{
        'name': '河南',
        'value': 88
      }]
    }
  },
  components: {
    ChartCard,
    ZhuZhuangTuHengXiangChart,
    BasicDataItemLabel,
    BasicTrendChart,
    BasicTrendChart2,
    ChinaMap,
    BasicPieChart,
    RateChart
  },
  mounted() {
    this.initAllChart()
  },
  methods: {
    initAllChart() {
      this.queryToDayConfirmed()
      this.queryDeadOfProvince()
      this.queryConfirmedTread()
      this.queryQuanguoConfirmed()
      this.queryLeijiZhiyu()
      this.queryLeijiConfirmed()
      this.queryLeijiDead()
      this.queryZhiyuTread()
      this.queryRate()

    },
    queryRate() {
      getDeadAndZhiyuRate().then(res => {
        this.zhiyuRate = res.data
        this.$refs.zhiyuRateChart.initChart()
      })
    },
    queryToDayConfirmed() {
      getToDayConfirmed().then(res => {
        this.zhuzhuangtuhengxiangData = res.data
        console.log('今日确诊数据', res.data)
        this.$refs.quezhenZhuZhuangTu.initChart()
      })
    },
    queryDeadOfProvince() {
      getDeadOfProvince().then(res => {
        console.log('dead饼状图', res.data)
        this.basicPieData.showData = res.data
        this.$refs.basicPieData.initChart()
      })
    },
    queryConfirmedTread() {
      getConfirmedTread().then(res => {
        this.basicIncrTrendData = res.data
        console.log('新增趋势图数据', this.basicIncrTrendData)
        this.$refs.xinzengTrendChart.initChart()
      })
    },
    queryZhiyuTread() {
      getZhiyuTread().then(res => {
        this.zhiyuTrendData = res.data
        console.log('治愈趋势图数据', this.zhiyuTrendData)
        this.$refs.zhiyuTrendChart.initChart()
      })
    },
    queryQuanguoConfirmed() {
      getQuanguoConfirmed().then(res => {
        this.mapDataList = res.data
        this.$refs.ChinaMap.initChart()
      })
    },
    queryLeijiZhiyu() {
      getLeijiZhiyu().then(res => {
        this.zhiyuCount = res.data
      })
    },
    queryLeijiDead() {
      getLejiDead().then(res => {
        this.deadCount = res.data
      })
    },
    queryLeijiConfirmed() {
      getLeijiConfirmed().then(res => {
        this.confirmedCount = res.data
      })
    }
  }
}
</script>

<style scoped>
  .chart-card {
    background: #0f142b !important;
    border-radius: 10px;
    margin: 0 20px;
  }
  .cure-and-dead-rate-chart {
    display: flex;
    justify-content: space-around;
  }
</style>
