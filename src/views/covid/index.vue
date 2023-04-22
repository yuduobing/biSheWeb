<template>
  <div class="app-container">
    <el-row style="margin-bottom: 15px;">
      <el-button type="primary" @click="addNewAdviser">添加</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="150" />
      <el-table-column prop="province" label="省份" />
      <el-table-column prop="day" label="数据时间" />
      <el-table-column prop="confirmed" label="确诊数" />
      <el-table-column prop="dead" label="死亡数" />
      <el-table-column prop="zhiyu" label="治愈术" />
      <el-table-column prop="createDate" width="200" label="创建时间" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editInfo(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件 start-->
    <div style="height: 40px;" />
    <el-pagination
      background
      style="margin-bottom: 100px;"
      :current-page="pageNum"
      :page-size="pageSize"
      :total="totalNum"
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChangeOfFenye"
    />
    <!--分页组件 end-->
    <!--添加数据-->
    <el-dialog title="添加疫情信息" :visible.sync="dialogVisible" width="50%">
      <el-form :model="entityObj" label-width="100px" class="demo-ruleForm">
        <el-form-item label="省份" prop="pass">
          <el-select v-model="entityObj.province" placeholder="请选择省份" @keyup.enter.native="handleQuery">
            <el-option v-for="item in provinceOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据日期" prop="pass">
          <el-date-picker
            v-model="entityObj.day"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="确诊数" prop="pass">
          <el-input-number v-model="entityObj.confirmed" :min="0" :max="1000000"></el-input-number>
        </el-form-item>
        <el-form-item label="死亡数" prop="pass">
          <el-input-number v-model="entityObj.dead" :min="0" :max="1000000"></el-input-number>
        </el-form-item>
        <el-form-item label="治愈数" prop="pass">
          <el-input-number v-model="entityObj.zhiyu" :min="0" :max="1000000"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!isEdit" type="primary" @click="enshureAdd">确 定</el-button>
        <el-button v-if="isEdit" type="success" @click="enshureUpdate">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { save, getPage, deleteById, update } from '@/api/covid'
export default {
  name: 'CovidIndex',
  data() {
    return {
      isEdit: false,
      tableData: [],
      dialogVisible: false,
      entityObj: {
        id: '',
        province: '',
        day: '',
        confirmed: 0,
        dead: 0,
        zhiyu: 0
      },
      pageNum: 1,
      pageSize: 20,
      totalNum: 0,
      provinceOptions: [{
        value: '北京',
        label: '北京'
      }, {
        value: '天津',
        label: '天津'
      }, {
        value: '河北',
        label: '河北'
      }, {
        value: '内蒙古',
        label: '内蒙古'
      }, {
        value: '辽宁',
        label: '辽宁'
      }, {
        value: '吉林',
        label: '吉林'
      }, {
        value: '黑龙江',
        label: '黑龙江'
      }, {
        value: '上海',
        label: '上海'
      }, {
        value: '江苏',
        label: '江苏'
      }, {
        value: '浙江',
        label: '浙江'
      }, {
        value: '安徽',
        label: '安徽'
      }, {
        value: '福建',
        label: '福建'
      }, {
        value: '江西',
        label: '江西'
      }, {
        value: '山东',
        label: '山东'
      }, {
        value: '河南',
        label: '河南'
      }, {
        value: '湖北',
        label: '湖北'
      }, {
        value: '湖南',
        label: '湖南'
      }, {
        value: '广东',
        label: '广东'
      }, {
        value: '广西',
        label: '广西'
      }, {
        value: '海南',
        label: '海南'
      }, {
        value: '重庆',
        label: '重庆'
      }, {
        value: '四川',
        label: '四川'
      }, {
        value: '西藏',
        label: '西藏'
      }, {
        value: '陕西',
        label: '陕西'
      }, {
        value: '甘肃',
        label: '甘肃'
      }, {
        value: '青海',
        label: '青海'
      }, {
        value: '宁夏回族',
        label: '宁夏回族'
      }, {
        value: '新疆维吾尔',
        label: '新疆维吾尔'
      }, {
        value: '台湾',
        label: '台湾'
      }, {
        value: '香港特别行政区',
        label: '香港特别行政区'
      }, {
        value: '澳门特别行政区',
        label: '澳门特别行政区'
      }
      ]
    }
  },
  mounted() {
    this.getAllInfo()
  },
  methods: {
    enshureAdd() {
      if (this.entityObj.text === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      save(this.entityObj).then(res => {
        this.$message.success('添加成功！')
        this.dialogVisible = false
        this.entityObj.id = ''
        this.entityObj.province = ''
        this.entityObj.day = ''
        this.entityObj.confirmed = 0
        this.entityObj.dead = 0
        this.entityObj.zhiyu = 0

        this.isEdit = false
        console.log('======')
        this.getAllInfo()
      })
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getAll()
    },
    enshureUpdate() {
      if (this.entityObj.province === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      update(this.entityObj).then(res => {
        this.$message.success('修改成功！')
        this.dialogVisible = false
        this.entityObj.id = ''
        this.entityObj.province = ''
        this.entityObj.day = ''
        this.entityObj.confirmed = 0
        this.entityObj.dead = 0
        this.entityObj.zhiyu = 0
        this.getAllInfo()
        this.isEdit = false
      })
    },
    getAllInfo() {
      getPage(this.pageNum, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.totalNum = res.data.total
      })
    },
    addNewAdviser() {
      this.dialogVisible = true
    },
    editInfo(row) {
      this.isEdit = true
      this.dialogVisible = true
      this.entityObj = row
    },
    deleteInfo(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(id).then(res => {
          this.$message.success('删除成功！')
          this.getAllInfo()
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    }
  }
}
</script>

<style scoped>

</style>
