<template>
  <div class="box">
    <!-- <a-card id="card">
      <a-form
        id="ruleForm"
        :form="ruleForm"
        class="login-form"
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

        <a-form-model layout="inline" :model="ruleForm">
          <a-form-model-item style="margin-top: -5%">
            <a-input
              v-model="ruleForm.username"
              placeholder="Username"
              style="width: 120%"
            >
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item style="margin-top: 5%;width: 120%">
            <a-input
              v-model="ruleForm.password"
              type="password"
              placeholder="Password"
              style="width: 120%"
            >
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item style="margin-top: 5%">
            <el-button type="primary" @click="submitForm(ruleForm)"
              >登录</el-button
            >
            <el-button @click="resetForm(ruleForm)">重置</el-button>
            <el-button type="info" @click="register()">注册</el-button>
          </a-form-model-item>
        </a-form-model>
      </a-form>
    </a-card> -->

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
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">清空</el-button>
        <el-button type="info" @click="register()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (value.length < 3) {
          callback(new Error("用户名长度不能小于3"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        username: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      const _this = this;
      // 提交逻辑
      this.$axios.post("/login", this.ruleForm).then((res) => {
        const token = res.headers["authorization"];
        _this.$store.commit("SET_TOKEN", token);
        _this.$store.commit("SET_USERINFO", res.data.data);
        _this.$router.push("/test/blogs");
      });
    },
    resetForm(formName) {
      this.ruleForm.username = "";
      this.ruleForm.password = "";
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
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
