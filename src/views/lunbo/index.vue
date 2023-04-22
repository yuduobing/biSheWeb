<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="省份" prop="provinceLabel">
        <el-input
          v-model="queryParams.provinceLabel"
          placeholder="请输入省份"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="累计感染" prop="confirmedCount">
        <el-input
          v-model="queryParams.confirmedCount"
          placeholder="请输入累计感染"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="累计死亡" prop="deadCount">
        <el-input
          v-model="queryParams.deadCount"
          placeholder="请输入累计死亡"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="累计治愈" prop="currentConfirmedCount">
        <el-input
          v-model="queryParams.currentConfirmedCount"
          placeholder="请输入累计治愈"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"

        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"

        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"

        >删除</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="covidList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id
" align="center" prop="id" />
      <el-table-column label="省份" align="center" prop="provinceLabel" />
      <el-table-column label="累计感染" align="center" prop="confirmedCount" />
      <el-table-column label="累计死亡" align="center" prop="deadCount" />
      <el-table-column label="累计治愈" align="center" prop="currentConfirmedCount" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"

          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"

          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改大屏数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="省份" prop="provinceLabel">
          <el-input v-model="form.provinceLabel" placeholder="请输入省份" />
        </el-form-item>
        <el-form-item label="累计感染" prop="confirmedCount">
          <el-input v-model="form.confirmedCount" placeholder="请输入累计感染" />
        </el-form-item>
        <el-form-item label="累计死亡" prop="deadCount">
          <el-input v-model="form.deadCount" placeholder="请输入累计死亡" />
        </el-form-item>
        <el-form-item label="累计治愈" prop="currentConfirmedCount">
          <el-input v-model="form.currentConfirmedCount" placeholder="请输入累计治愈" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCovid, getCovid, delCovid, addCovid, updateCovid } from "@/api/system/covid";

export default {
  name: "Covid",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 大屏数据表格数据
      covidList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        provinceLabel: null,
        confirmedCount: null,
        deadCount: null,
        currentConfirmedCount: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询大屏数据列表 */
    getList() {
      this.loading = true;
      listCovid(this.queryParams).then(response => {

        this.covidList = response.data;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        provinceLabel: null,
        confirmedCount: null,
        deadCount: null,
        currentConfirmedCount: null
      };
      this.resetForm("form");
    },

    resetForm(refName) {
      if (this.$refs[refName]) {
        this.$refs[refName].resetFields();

      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加大屏数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCovid(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改大屏数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {

          if (this.form.id != null) {
            updateCovid(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCovid(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });

    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除大屏数据编号为"' + ids + '"的数据项？').then(function() {
        return delCovid(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/covid/export', {
        ...this.queryParams
      }, `covid_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
