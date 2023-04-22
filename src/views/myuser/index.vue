<template>
  <div class="app-container">
    <el-row>
      <el-col :span="2">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="toAddNewAdmin"
        >新增</el-button>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-input
          v-model="matchStr"
          placeholder="请输入内容进行搜索"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="toSearch"
          />
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="password" label="密码" />
        <el-table-column prop="createDate" label="创建时间" />
        <el-table-column
          prop="updateDate"
          label="上次修改时间"
        />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="toEditAdmin(scope.row)"
            >编辑</el-button>
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @onConfirm="toDelete(scope.row.id)"
            >
              <el-button
                slot="reference"
                type="danger"
                size="small"
                icon="el-icon-delete"
              >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--新增对话框-->
    <div>
      <el-dialog title="新增" :visible.sync="addVisible">
        <div style="width: 80%; margin: 0 auto">
          <el-row>
            <el-col :span="4">
              <span style="line-height: 2">昵称：</span></el-col>
            <el-col
              :span="18"
            ><el-input
              v-model="entityObj.nickname"
              placeholder="请输入..."
            /></el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="4">
              <span style="line-height: 2">手机号：</span></el-col>
            <el-col
              :span="18"
            ><el-input
              v-model="entityObj.phone"
              disabled
              placeholder="请输入..."
            /></el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="4">
              <span style="line-height: 2">密码：</span></el-col>
            <el-col
              :span="18"
            ><el-input
              v-model="entityObj.password"
              show-password
              placeholder="请输入..."
            /></el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button
            v-if="!isEdit"
            type="primary"
            @click="saveNewAdmin"
          >保存</el-button>
          <el-button
            v-if="isEdit"
            type="primary"
            @click="enshureEdit"
          >更新</el-button>
        </div>
      </el-dialog>
    </div>

    <!--分页组件 start-->
    <div style="height: 40px" />
    <el-pagination
      background
      style="margin-bottom: 100px"
      :current-page="pageNum"
      :page-size="pageSize"
      :total="totalNum"
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChangeOfFenye"
    />
    <!--分页组件 end-->
  </div>
</template>

<script>
import { save, getPage, deleteById } from '@/api/myuser'
export default {
  name: 'MyUserIndex',
  data() {
    return {
      tableData: [],
      addVisible: false,
      isEdit: false,
      entityObj: {
        id: 0,
        nickname: '',
        phone: '',
        password: ''
      },
      matchStr: '',
      pageNum: 1,
      pageSize: 15,
      totalNum: 0
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    toSearch() {
      getPage(this.pageNum, this.pageSize, this.matchStr).then((res) => {
        this.tableData = res.data.records
        this.totalNum = res.data.total
      })
    },
    getAll() {
      getPage(this.pageNum, this.pageSize, this.matchStr).then((res) => {
        this.tableData = res.data.records
        this.totalNum = res.data.total
      })
    },
    toAddNewAdmin() {
      this.addVisible = true
    },
    saveNewAdmin() {
      if (
        this.entityObj.nickname === '' ||
        this.entityObj.phone === '' ||
        this.entityObj.password === ''
      ) {
        this.$message.warning('请完善信息')
        return
      }
      save({
        nickname: this.entityObj.nickname,
        phone: this.entityObj.phone,
        password: this.entityObj.password
      }).then((res) => {
        this.addVisible = false
        this.entityObj.nickname = ''
        this.entityObj.phone = ''
        this.entityObj.password = ''
        this.getAll()
      })
    },
    enshureEdit() {
      if (this.entityObj.username === '' || this.entityObj.roles === '') {
        this.$message.warning('请完善信息')
        return
      } else {
        save({
          id: this.entityObj.id,
          nickname: this.entityObj.nickname,
          phone: this.entityObj.phone,
          password: this.entityObj.password
        }).then((res) => {
          this.addVisible = false
          this.isEdit = false
          this.entityObj.nickname = ''
          this.entityObj.phone = ''
          this.entityObj.password = ''
          this.getAll()
        })
      }
    },
    toEditAdmin(row) {
      this.isEdit = true
      this.addVisible = true
      this.entityObj.id = row.id
      this.entityObj.nickname = row.nickname
      this.entityObj.phone = row.phone
      this.entityObj.password = row.password
    },
    toDelete(id) {
      deleteById(id).then((res) => {
        this.getAll()
      })
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getAll()
    }
  }
}
</script>

<style scoped>
</style>
