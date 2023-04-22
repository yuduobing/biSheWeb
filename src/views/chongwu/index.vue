<template>
  <div class="app-container">
    <el-row style="margin-bottom: 15px;">
      <el-button type="primary" @click="addNewAdviser">添加</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="名字"  width="100"  />
      <el-table-column prop="xixing" label="习性" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="addr" label="地址" />
      <el-table-column prop="age" label="年龄"  width="100"  />
      <el-table-column prop="healthy" label="健康"  width="100"  />
      <el-table-column prop="status" label="状态"  width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0">未被领养</el-tag>
          <el-tag v-if="scope.row.status === 1">被申请</el-tag>
          <el-tag v-if="scope.row.status === 2">被领养</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="cover" label="封面" width="120">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="imgPathFormat(scope.row.cover)"
            :fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" />
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
      <el-form :model="entity" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名字" prop="pass">
          <el-input v-model="entity.name" />
        </el-form-item>
        <el-form-item label="习性" prop="pass">
          <el-input v-model="entity.xixing" />
        </el-form-item>
        <el-form-item label="类型" prop="pass">
          <el-select v-model="entity.type" placeholder="请选择">
            <el-option label="中国狸花猫" value="中国狸花猫"></el-option>
            <el-option label="挪威森林猫" value="挪威森林猫"></el-option>
            <el-option label="布偶猫" value="布偶猫"></el-option>
            <el-option label="哈士奇" value="哈士奇"></el-option>
            <el-option label="中华神犬" value="中华神犬"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="pass">
          <el-input v-model="entity.addr" />
        </el-form-item>
        <el-form-item label="年龄" prop="pass">
          <el-select v-model="entity.age" placeholder="请选择">
            <el-option label="1个月" value="1个月"></el-option>
            <el-option label="2个月" value="2个月"></el-option>
            <el-option label="3个月" value="3个月"></el-option>
            <el-option label="4个月" value="4个月"></el-option>
            <el-option label="5个月" value="5个月"></el-option>
            <el-option label="半岁" value="半岁"></el-option>
            <el-option label="1岁" value="1岁"></el-option>
            <el-option label="1岁半" value="1岁半"></el-option>
            <el-option label="2岁" value="2岁"></el-option>
            <el-option label="2岁半" value="2岁半"></el-option>
            <el-option label="3岁" value="3岁"></el-option>
            <el-option label="4岁" value="4岁"></el-option>
            <el-option label="5岁" value="5岁"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="健康" prop="pass">
          <el-select v-model="entity.healthy" placeholder="请选择">
            <el-option label="健康" value="健康"></el-option>
            <el-option label="良好" value="良好"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面图" prop="pass">
          <el-upload
            ref="my-upload"
            class="upload-demo"
            :action="UPLOAD_PATH"
            accept=".jpg,.png,.jpeg"
            :on-success="handleUpLoadSuccess"
            :on-remove="onRemove"
            :before-upload="beforeFengMianUpload"
            multiple
            :limit="1"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png/jpeg格式图片</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" prop="pass">
          <el-input v-model="entity.remark" type="textarea" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!isEdit" type="primary" @click="enshureAdd">确 定</el-button>
        <el-button v-if="isEdit" type="success" @click="enshureUpdate">修 改</el-button>
      </span>
    </el-dialog>

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
  </div>
</template>

<script>
import { save, deleteById, getPage } from '@/api/chongwu'
export default {
  name: 'ChongwuIndex',
  data() {
    return {
      isEdit: false,
      tableData: [],
      dialogVisible: false,
      entity: {
        id: null,
        name: '',
        xixing: '',
        type: '',
        addr: '',
        age: '',
        healthy: '',
        remark: '',
        cover: '',
        status: 0,
        userId: null
      },
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      UPLOAD_PATH: '',
      UPLOAD_HOST: '',
      fileList: []
    }
  },
  mounted() {
    this.initUploadPath()
    this.getAllInfo()
  },
  methods: {
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getAllInfo()
    },
    enshureAdd() {
      if (this.entity.name === '' || this.entity.xixing === '' || this.entity.cover === '' ||
        this.entity.type === '' || this.entity.addr === '' || this.entity.age === '' ||
        this.entity.healthy === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      save(this.entity).then(res => {
        this.$message.success('添加成功！')
        this.dialogVisible = false
        this.entity.name = ''
        this.entity.xixing = ''
        this.entity.type = ''
        this.entity.addr = ''
        this.entity.age = ''
        this.entity.cover = ''
        this.entity.healthy = ''
        this.entity.remark = ''
        this.entity.status = 0
        this.entity.userId = null

        this.getAllInfo()
        this.isEdit = false
      })
    },
    enshureUpdate() {
      if (this.entity.name === '' || this.entity.xixing === '' || this.entity.cover === '' ||
        this.entity.type === '' || this.entity.addr === '' || this.entity.age === '' ||
        this.entity.healthy === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      save(this.entity).then(res => {
        this.$message.success('修改成功！')
        this.dialogVisible = false
        this.entity.id = null
        this.entity.name = ''
        this.entity.xixing = ''
        this.entity.type = ''
        this.entity.addr = ''
        this.entity.cover = ''
        this.entity.age = ''
        this.entity.healthy = ''
        this.entity.remark = ''
        this.entity.status = 0
        this.entity.userId = null

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
      this.entity = row
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
    },
    imgPathFormat(path) {
      return this.UPLOAD_HOST + path
    },
    handleUpLoadSuccess(res, file) {
      this.entity.cover = res.data.path
      this.fileList.push({
        name: res.data.originalFileName,
        path: res.data.path
      })
      console.log(this.fileList)
    },
    beforeFengMianUpload() {},
    onRemove(file, fileList) {
      this.fileList = []
      this.entity.cover = ''
    },
    initUploadPath() {
      this.UPLOAD_PATH = this.$UPLOAD_PATH
      this.UPLOAD_HOST = this.$UPLOAD_HOST
    }
  }
}
</script>

<style scoped>

</style>
