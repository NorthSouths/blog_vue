<template>
  <div>
    <div class="content" style="margin-top: 5%">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "BlogEdit",
  components: { Header },
  data() {
    return {
      ruleForm: {
        id: "",
        title: "",
        description: "",
        content: "",
      },
      rules: {
        title: [
          { require: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 25,
            message: "长度在3到25个字符之间",
            trigger: "blur",
          },
        ],
        description: [
          { require: true, message: "请输入摘要", trigger: "blur" },
        ],
        content: [{ require: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确定要添加或修改文章吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              const _this = this;
              this.$axios
                .post("/blog/edit", this.ruleForm, {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                })
                .then((res) => {
                  this.$message({
                    type: "success",
                    message: "添加成功!",
                  });
                  this.$router.push("/test/blogs");
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消添加",
              });
            });
        } else {
          alert("error submit");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    const blogId = this.$route.params.blogId;
    const _this = this;
    if (blogId) {
      this.$axios.get("/blog/" + blogId).then((res) => {
        const blog = res.data.data;
        _this.ruleForm.id = blog.id;
        _this.ruleForm.title = blog.title;
        _this.ruleForm.description = blog.description;
        _this.ruleForm.content = blog.content;
      });
    }
  },
};
</script>

<style scoped>
.m-content {
  text-align: center;
}
</style>
