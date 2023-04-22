<template>
  <div class="app-container">
    <el-row style="margin-bottom: 15px;">
      <el-button type="primary" @click="addNewAdviser">添加</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="150" />
      <el-table-column prop="text" label="公告内容" />
      <el-table-column prop="createDate" width="200" label="创建时间" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editInfo(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加对话框-->
    <el-dialog title="添加公告信息" :visible.sync="dialogVisible" width="50%">
      <el-form :model="noticeObj" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公告内容" prop="pass">
          <el-input v-model="noticeObj.text" type="textarea" />
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
import { save, getAll, deleteById, update } from '@/api/notice'
export default {
  name: 'NoticeIndex',
  data() {
    return {
      isEdit: false,
      tableData: [],
      dialogVisible: false,
      noticeObj: {
        text: ''
      }
    }
  },
  mounted() {
    this.getAllInfo()
  },
  methods: {
    enshureAdd() {
      if (this.noticeObj.text === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      save(this.noticeObj).then(res => {
        this.$message.success('添加成功！')
        this.dialogVisible = false
        this.noticeObj.text = ''

        this.getAllInfo()
        this.isEdit = false
      })
    },
    enshureUpdate() {
      if (this.noticeObj.text === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      update(this.noticeObj).then(res => {
        this.$message.success('修改成功！')
        this.dialogVisible = false
        this.noticeObj.text = ''
        this.getAllInfo()
        this.isEdit = false
      })
    },
    getAllInfo() {
      getAll().then(res => {
        this.tableData = res.data
      })
    },
    addNewAdviser() {
      this.dialogVisible = true
    },
    editInfo(row) {
      this.isEdit = true
      this.dialogVisible = true
      this.noticeObj = row
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
