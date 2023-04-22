<template>
  <div class="app-container">
    <el-row style="margin-bottom: 15px;">
      <el-button type="primary" @click="addNewAdviser">添加</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="名字"  />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="age" label="年龄"  />
      <el-table-column prop="healthy" label="健康"  />
      <el-table-column prop="cover" label="封面" width="120">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="imgPathFormat(scope.row.cover)"
            :fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="myUser.name" label="申请用户" width="150">
        <template slot-scope="scope">
          <el-tag type="warning">{{scope.row.myUser.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updateDate" width="200" label="申请时间" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="agree(scope.row)">同意</el-button>
          <el-button type="danger" size="small" @click="jujue(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { shenqingInfo, setStatus } from '@/api/chongwu'
export default {
  name: 'ShenqingIndex',
  data() {
    return {
      tableData: [],
      UPLOAD_HOST: ''
    }
  },
  mounted() {
    this.initUploadPath()
    this.getAllInfo()
  },
  methods: {
    getAllInfo() {
      shenqingInfo().then(res => {
        this.tableData = res.data
      })
    },
    agree(row) {
      setStatus(row.id, 2).then(res => {
        this.getAllInfo()
      })
    },
    jujue(row) {
      setStatus(row.id, 0).then(res => {
        this.getAllInfo()
      })
    },
    imgPathFormat(path) {
      return this.UPLOAD_HOST + path
    },
    initUploadPath() {
      this.UPLOAD_HOST = this.$UPLOAD_HOST
    }
  }
}
</script>

<style scoped>

</style>
