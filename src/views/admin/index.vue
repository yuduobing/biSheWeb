<template>
  <div class="app-container">
    <el-row>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddNewAdmin">新增</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="roles" label="角色">
          <template slot-scope="scope"><el-tag>{{scope.row.roles}}</el-tag></template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
        <el-table-column prop="updateDate" label="上次修改时间"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.roles !== 'SuperAdmin'" type="primary" size="small" icon="el-icon-edit" @click="toEditAdmin(scope.row)">编辑</el-button>
            <el-popconfirm v-if="scope.row.roles !== 'SuperAdmin'" confirm-button-text="确认" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="确定删除吗？" @onConfirm="toDelete(scope.row.id)">
              <el-button slot="reference" type="danger" size="small" icon="el-icon-delete">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--新增对话框-->
    <div>
      <el-dialog title="新增" :visible.sync="addVisible">
        <div style="width: 80%;margin: 0 auto;">
          <el-row>
            <el-col :span="4"> <span style="line-height: 2">用户名：</span></el-col>
            <el-col :span="18"><el-input v-model="admin.username" placeholder="请输入..." /></el-col>
          </el-row>
          <el-row style="margin-top: 15px;">
            <el-col :span="4"> <span style="line-height: 2">密码：</span></el-col>
            <el-col :span="18"><el-input v-model="admin.password" show-password placeholder="请输入..." /></el-col>
          </el-row>
          <el-row style="margin-top: 15px;">
            <el-col :span="4"> <span style="line-height: 2">电话：</span></el-col>
            <el-col :span="18"><el-input v-model="admin.phone" placeholder="请输入..." /></el-col>
          </el-row>
          <el-row style="margin-top: 15px;">
            <el-col :span="4"> <span style="line-height: 2">角色：</span></el-col>
            <el-select v-model="admin.roles" placeholder="请选择">
<!--              <el-option label="超级管理员" value="SuperAdmin"></el-option>-->
              <el-option label="普通管理员" value="admin"></el-option>
            </el-select>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="saveNewAdmin">保存</el-button>
          <el-button v-if="isEdit" type="primary" @click="enshureEdit">更新</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { save, getAllAdmin, deleteById } from '@/api/admin'
export default {
  name: 'AdminIndex',
  data() {
    return {
      tableData: [],
      addVisible: false,
      isEdit: false,
      admin: {
        id: 0,
        username: '',
        roles: '',
        password: '',
        phone: ''
      }
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    hasLetter(str) {
      for (var i in str) {
        var asc = str.charCodeAt(i)
        if ((asc >= 65 && asc <= 90 || asc >= 97 && asc <= 122)) {
          return true
        }
      }
      return false
    },
    getAll() {
      getAllAdmin().then(res => {
        this.tableData = res.data
      })
    },
    toAddNewAdmin() {
      this.addVisible = true
    },
    saveNewAdmin() {
      if (this.admin.username === '' || this.admin.roles === '' || this.admin.password === '' || this.admin.phone === '') {
        this.$message.warning('请完善信息')
        return
      }
      /* if (!this.hasLetter(this.admin.password)) {
        this.$message.warning('密码需要包含字母')
        return
      }
      if (this.admin.password.length < 8) {
        this.$message.warning('密码长度需要大于8位')
        return
      }*/
      save({
        username: this.admin.username,
        roles: this.admin.roles,
        phone: this.admin.phone,
        password: this.admin.password
      }).then(res => {
        this.addVisible = false
        this.admin.username = ''
        this.admin.roles = ''
        this.getAll()
      })
    },
    enshureEdit() {
      if (this.admin.username === '' || this.admin.roles === '') {
        this.$message.warning('请完善信息')
        return
      } else {
        save({
          id: this.admin.id,
          username: this.admin.username,
          roles: this.admin.roles,
          phone: this.admin.phone,
          password: this.admin.password
        }).then(res => {
          this.addVisible = false
          this.isEdit = false
          this.admin.username = ''
          this.admin.phone = ''
          this.admin.roles = ''
          this.getAll()
        })
      }
    },
    toEditAdmin(row) {
      this.isEdit = true
      this.addVisible = true
      this.admin.id = row.id
      this.admin.username = row.username
      this.admin.phone = row.phone
      this.admin.roles = row.roles
    },
    toDelete(id) {
      deleteById(id).then(res => {
        this.getAll()
      })
    }
  }
}
</script>

<style scoped>

</style>
