<template>
  <div class="container">
<!--    <Header></Header>-->
    <div class="blog" style="margin-top: 3%">
      <h2>{{problem.title}}</h2>
      <el-divider ></el-divider>
      <h2>{{problem.content}}</h2>
      <el-divider ></el-divider>
      <h3>Input</h3>
      <div class="markdown-body" v-html="problem.input">
      </div>
      <h3>Output</h3>
      <div class="markdown-body" v-html="problem.output">
      </div>
      <h3>SampleInput</h3>
      <div class="markdown-body" v-html="problem.sampleinput">
      </div>
      <h3>SampleOutput</h3>
      <div class="markdown-body" v-html="problem.sampleoutput">
      </div>
      <el-divider></el-divider>
      <h3>请在框内写入C++代码:</h3>

        <el-form ref="Form" :model="ruleForm" :rules="rules" label-width="0px">
          <el-form-item prop="content">
            <el-input type="textarea" v-model="ruleForm.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('Form')">提交</el-button>
            <el-button @click="resetForm('Form')">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "Problem",
  components:{Header},
  data(){
    return {
      problem:[],
      ruleForm: {
        pid:'',
        id:'',
        content: '',
        title:'',
        status:''
      },
      rules: {
        content: [
          { require: true, message: '请输入内容', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    onSubmit(formName) {
      this.$refs[formName].validate((valid)=>{
        if(valid){
            const _this = this
            this.$axios.post('/check',this.ruleForm,{
              headers:{
                "Authorization" : localStorage.getItem("token")
              }
            }).then(res=>{
              this.$notify.success({
                title: 'Info',
                message: res.data.data,
                showClose: false
              });
            })
          }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
      const pid = this.$route.params.pid
      const _this = this
      if(pid){
        this.$axios.get('/problem/'+pid).then(res=>{
          _this.problem = res.data.data
          _this.ruleForm.id=this.$store.getters.getUser.id
          _this.ruleForm.pid=pid
          _this.ruleForm.title=this.problem.title
        })
      }
  }
}
</script>

<style scoped>
.page{
  margin: 0 auto;
  text-align: center;
}
.blog{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width:100%;
  height: 100%;
  padding: 20px 15px;
}
</style>
