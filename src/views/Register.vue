<template>
  <div>
    <div id="background">
      <a-card id="card" >
        <a-form
            id="ruleForm"
            :form="ruleForm"
            class="register-form"
            @submit="submitForm"
        >
          <img src="..\assets\logo.png" id="imglogo">
          <a-form-item style="margin-top: 10%;margin-left:10%;font-weight:bold;font-size:22px;color:#4da1ff ">
            HIT算法与博客系统
          </a-form-item>
          <a-form-item style="margin-top: -10%;color: #66d1ff">
            Welcome to HIT Blog and OJ System
          </a-form-item>
          <el-switch class="switch"
                     style="display: block;margin-left: -23%;
                     margin-top: -10%"
                     v-model="ruleForm.state"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     active-text="教师"
                     inactive-text="学生"></el-switch>
          <a-form-model layout="inline" :model="ruleForm">
            <a-form-model-item >
              <a-input v-model="ruleForm.username" placeholder="Username" style="width: 120%">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item style="margin-top: 5%;width: 120%" >
              <a-input v-model="ruleForm.email"  placeholder="Email" style="width: 120%">
                <a-icon slot="prefix" type="qq" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item style="margin-top: 5%;width: 120%" >
              <a-input v-model="ruleForm.password" type="password" placeholder="Password" style="width: 120%">
                <a-icon slot="prefix" type="unlock" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item style="margin-top: 5%;width: 120%" >
              <a-input v-model="ruleForm.passwordagain" type="password" placeholder="PasswordAgain" style="width: 120%">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item style="margin-top: 5%">
              <el-button type="primary" @click="submitForm(ruleForm)">注册</el-button>
              <el-button @click="resetForm(ruleForm)">重置</el-button>
            </a-form-model-item>
          </a-form-model>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    }
    return {
      ruleForm: {
        password: '',
        username: '',
        state:true,
        passwordagain:'',
        email:''
      },
      rules: {
        password: [
          {required:true,validator: validatePass, trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        passwordagain: [
          {required: true, message: '请正确输入密码', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请正确输入密码', trigger: 'blur'},
          {max: 24, message: '长度小于 24 个字符', trigger: 'blur'}
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      if(this.ruleForm.passwordagain===this.ruleForm.password){
      const _this = this
          this.$axios.post("/user/register", this.ruleForm).then((res)=>{
            this.$message({
              type: 'success',
              message: '注册成功!'
            })
            this.$router.push('/newLogin')
          })
      }else{
        this.$message({
          type: 'error',
          message: '重复密码错误'
        })
      }
        },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

  mounted() {
    this.$notify({
      title: '看这里：',
      message: '+Q250225923看第一手帅哥任明宇',
      duration: 1500
    });
  }
}
</script>
<style scoped>
.switch{
  left: 60px;
  top: -6px
}
#card{
  width: 300px;
  margin-left: 40%;
  margin-top: 5%;
}
#imglogo{
  height: 100px;
  margin-left: 25%
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
