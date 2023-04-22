<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="12" :offset="6" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="个人信息" name="account">
                <el-form>
                  <!-- <el-form-item label="用户名">
                    <el-input disabled v-model.trim="user.username" />
                  </el-form-item> -->
                  <el-form-item label="电话">
                    <el-input v-model.trim="user.phone" disabled />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model.trim="user.password" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onsubmit">更新</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAdminInfo, save } from '@/api/admin'
export default {
  name: 'Profile',
  data() {
    return {
      user: {
        id: 0,
        username: '',
        phone: '',
        password: ''
      },
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'roles'])
  },
  created() {
    this.getUser()
  },
  methods: {
    onsubmit() {
      save(this.user).then((res) => {
        this.$message.success('修改成功')
      })
    },
    getUser() {
      getAdminInfo().then((res) => {
        this.user.id = res.data.id
        this.user.phone = res.data.phone
        this.user.username = res.data.username
        this.user.password = res.data.password
        this.user.roles = res.data.roles
      })
    }
  }
}
</script>
