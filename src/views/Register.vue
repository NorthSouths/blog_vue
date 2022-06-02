<template>
  <div>
    <!-- <div class="box">
      <a-card id="card">
        <a-form
          id="ruleForm"
          :form="ruleForm"
          class="register-form"
          @submit="submitForm"
        >
          <img src="..\assets\logo.png" id="imglogo" />
          <a-form-item
            style="margin-top: 10%;margin-left:10%;font-weight:bold;font-size:22px;color:#4da1ff "
          >
            HIT算法与博客系统
          </a-form-item>
          <a-form-item style="margin-top: -10%;color: #66d1ff">
            Welcome to HIT Blog and OJ System
          </a-form-item>
          <el-switch
            class="switch"
            style="display: block;margin-left: -23%;
                     margin-top: -10%"
            v-model="ruleForm.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="教师"
            inactive-text="学生"
          ></el-switch>
          <a-form-model layout="inline" :model="ruleForm">
            <a-form-model-item>
              <a-input
                v-model="ruleForm.username"
                placeholder="Username"
                style="width: 120%"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-model-item>
            <a-form-model-item style="margin-top: 5%;width: 120%">
              <a-input
                v-model="ruleForm.email"
                placeholder="Email"
                style="width: 120%"
              >
                <a-icon slot="prefix" type="qq" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item style="margin-top: 5%;width: 120%">
              <a-input
                v-model="ruleForm.password"
                type="password"
                placeholder="Password"
                style="width: 120%"
              >
                <a-icon
                  slot="prefix"
                  type="unlock"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-model-item>
            <a-form-model-item style="margin-top: 5%;width: 120%">
              <a-input
                v-model="ruleForm.passwordagain"
                type="password"
                placeholder="PasswordAgain"
                style="width: 120%"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-model-item>
            <a-form-model-item style="margin-top: 5%">
              <el-button type="primary" @click="submitForm(ruleForm)"
                >注册</el-button
              >
              <el-button @click="resetForm(ruleForm)">重置</el-button>
            </a-form-model-item>
          </a-form-model>
        </a-form>
      </a-card>
    </div> -->
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      :label-position="right"
      class="login-box"
    >
      <img src="..\assets\logo.png" class="img-logo" />
      <h4>HIT算法与博客平台</h4>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.passwordagain"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="info" @click="register()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        if (regEmail.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确格式的邮箱"));
        }
      }
    };
    return {
      ruleForm: {
        password: "",
        username: "",
        state: false,
        passwordagain: "",
        email: "",
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        passwordagain: [
          { required: true, message: "请正确输入密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      if (this.ruleForm.passwordagain === this.ruleForm.password) {
        const _this = this;
        this.$axios.post("/user/register", this.ruleForm).then((res) => {
          this.$message({
            type: "success",
            message: "注册成功!",
          });
          this.$router.push("/newLogin");
        });
      } else {
        this.$message({
          type: "error",
          message: "重复密码错误",
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.img-logo {
  display: block;
  margin: 20px auto;
  width: 150px;
  height: 150px;
}
.login-box {
  margin: 0 auto;
  width: 40%;
  min-width: 400px;
}
.login-box h4 {
  margin: 0 auto 40px;
  text-align: center;
}
</style>
