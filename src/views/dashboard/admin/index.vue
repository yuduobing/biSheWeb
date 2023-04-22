<template>
  <div class="dashboard-editor-container">
    <h2>疫情数据可视化系统：</h2>
    <div style="height: 30px"></div>
    <panel-group />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
import { getDataTrendData } from '@/api/home'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup
  },
  data() {
    return {
      appointments: [],
      lineChartData: {
        x: [],
        y: []
      }
    }
  },
  mounted() {
    // this.getDakaTrendData()
  },
  methods: {
    getAllInfo() {},
    getDakaTrendData() {
      getDataTrendData().then((res) => {
        this.lineChartData.x = res.data.xZhou
        this.lineChartData.y = res.data.yZhou
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
