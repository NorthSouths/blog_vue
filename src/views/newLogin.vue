<template>
  <div id="background">
    <a-card id="card" >
      <a-form
          id="ruleForm"
          :form="ruleForm"
          class="login-form"
          @submit="submitForm"
      >
        <img src="..\assets\logo.png" id="imglogo">
        <a-form-item style="margin-top: 10%;margin-left:10%;font-weight:bold;font-size:22px;color:#4da1ff ">
          HIT算法与博客系统
        </a-form-item>
        <a-form-item style="margin-top: -10%;color: #66d1ff">
          Welcome to HIT Blog and OJ System
        </a-form-item>

        <a-form-model layout="inline" :model="ruleForm">
          <a-form-model-item style="margin-top: -5%">
            <a-input v-model="ruleForm.username" placeholder="Username" style="width: 120%">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item style="margin-top: 5%;width: 120%" >
            <a-input v-model="ruleForm.password" type="password" placeholder="Password" style="width: 120%">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item style="margin-top: 5%">
            <el-button type="primary" @click="submitForm(ruleForm)">登录</el-button>
            <el-button @click="resetForm(ruleForm)">重置</el-button>
            <el-button type="info" @click="register()">注册</el-button>
          </a-form-model-item>
        </a-form-model>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
    data() {
      return {
        ruleForm: {
          password: '',
          username: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        const _this = this
            // 提交逻辑
            this.$axios.post("/login", this.ruleForm).then((res)=>{
              const token = res.headers['authorization']
              _this.$store.commit('SET_TOKEN', token)
              _this.$store.commit('SET_USERINFO', res.data.data)
              _this.$router.push("/test/blogs")
            })
          },
      resetForm(formName) {
        this.ruleForm.username=''
        this.ruleForm.password=''
      },
      register(){
        this.$router.push('/register')
      }
    },
    mounted() {
      this.$notify({
        title: '看这里：',
        message: '+Q250225923看第一手帅哥任明宇',
        duration: 1500
      });
    }
};
</script>


<style>
#imglogo{
  height: 100px;
  margin-left: 25%
}
#card{
  width: 300px;
  margin-left: 40%;
  margin-top: 5%;
}
.label1{
  margin-top:10%;
  margin-left:10%;
  font-weight:bold;
  font-size:22px;
  color:#4da1ff;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
html,body{
  margin:0;
  padding:0;
}
#background{
  background:url("../assets/backgrount.jpg");
  padding:30px;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-size:100% 100%;
}
</style>
