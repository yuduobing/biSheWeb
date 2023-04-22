<template>
  <div class="app-container">
    <el-row style="margin-bottom: 15px;">
      <el-button type="primary" @click="addNewAdviser">添加</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="likes" label="点赞量" width="200" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column prop="tag" label="标签"  width="100">
        <template slot-scope="scope">
          <el-tag>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="视频" width="350">
        <template slot-scope="scope">
          <video :src="imgPathFormat(scope.row.path)" width="320" height="240" controls="controls">
            您的浏览器不支持 video 标签。
          </video>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" width="200" label="创建时间" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editInfo(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加对话框-->
    <el-dialog title="添加视频信息" :visible.sync="dialogVisible" width="50%">
      <el-form :model="entity" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="pass">
          <el-input v-model="entity.title" />
        </el-form-item>
        <el-form-item label="描述" prop="pass">
          <el-input v-model="entity.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="类型" prop="pass">
          <el-select v-model="entity.tag" placeholder="请选择">
            <el-option label="中国狸花猫" value="中国狸花猫"></el-option>
            <el-option label="挪威森林猫" value="挪威森林猫"></el-option>
            <el-option label="布偶猫" value="布偶猫"></el-option>
            <el-option label="哈士奇" value="哈士奇"></el-option>
            <el-option label="中华神犬" value="中华神犬"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频" prop="pass">
          <el-upload
            ref="my-upload"
            class="upload-demo"
            :action="UPLOAD_PATH"
            accept=".mp4"
            :on-success="handleUpLoadSuccess"
            :on-remove="onRemove"
            :before-upload="beforeFengMianUpload"
            multiple
            :limit="1"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">mp4格式视频</div>
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
import { save, deleteById, getPage } from '@/api/jiaoxuevideo'
export default {
  name: 'JiaoxueVideoIndex',
  data() {
    return {
      isEdit: false,
      tableData: [],
      dialogVisible: false,
      entity: {
        id: null,
        path: '',
        likes: null,
        tag: '',
        title: '',
        desc: ''
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
      if (this.entity.path === '' || this.entity.tag === '' || this.entity.title === '' ||
        this.entity.desc === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      save(this.entity).then(res => {
        this.$message.success('添加成功！')
        this.dialogVisible = false
        this.entity.title = ''
        this.entity.path = ''
        this.entity.desc = ''
        this.entity.tag = ''
        this.entity.likes = null

        this.getAllInfo()
        this.isEdit = false
      })
    },
    enshureUpdate() {
      if (this.entity.path === '' || this.entity.tag === '' || this.entity.title === '' ||
        this.entity.desc === '') {
        this.$message.warning('请完善信息！！！')
        return
      }
      save(this.entity).then(res => {
        this.$message.success('修改成功！')
        this.dialogVisible = false
        this.entity.id = null
        this.entity.title = ''
        this.entity.path = ''
        this.entity.desc = ''
        this.entity.tag = ''
        this.entity.likes = null

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
      this.entity.path = res.data.path
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
