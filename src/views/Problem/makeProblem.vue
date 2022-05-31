<template>
<div>
  <Header></Header>
  <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top: 3%">
    <el-form-item label="题目名称" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input type="textarea" v-model="ruleForm.content"></el-input>
    </el-form-item>
    <el-form-item label="题目类型" prop="sid">
      <el-select v-model="ruleForm.sid" placeholder="请选择题目类型">
        <el-option label="枚举" value="1"></el-option>
        <el-option label="查找" value="2"></el-option>
        <el-option label="贪心" value="3"></el-option>
        <el-option label="搜索" value="4"></el-option>
        <el-option label="分治递归" value="5"></el-option>
        <el-option label="动态规划" value="6"></el-option>
        <el-option label="最小生成树" value="7"></el-option>
        <el-option label="数论" value="8"></el-option>
      </el-select>
    </el-form-item>
<!--    <el-form-item label="创建时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>-->
    <el-form-item label="题目难度" prop="difficult">
      <el-select v-model="ruleForm.difficult" placeholder="请选择题目难度">
        <el-option label="简单" value="简单"></el-option>
        <el-option label="普及-" value="普及-"></el-option>
        <el-option label="普及/提高-" value="普及/提高-"></el-option>
        <el-option label="提高+/省选-" value="提高+/省选-"></el-option>
        <el-option label="省选/NOI-" value="省选/NOI-"></el-option>
        <el-option label="NOI/NOI+/CTSC" value="NOI/NOI+/CTSC"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="输入" prop="input">
      <el-input type="textarea" v-model="ruleForm.input"></el-input>
    </el-form-item>
    <el-form-item label="输出" prop="output">
      <el-input type="textarea" v-model="ruleForm.output"></el-input>
    </el-form-item>
    <el-form-item label="样例输入" prop="sampleinput">
      <el-input type="textarea" v-model="ruleForm.sampleinput"></el-input>
    </el-form-item>
    <el-form-item label="样例输出" prop="sampleoutput">
      <el-input type="textarea" v-model="ruleForm.sampleoutput"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "makeProblem",
  components: {Header},
  data() {
    return {
      ruleForm: {
        title: '',
        content: '',
        date1: '',
        date2: '',
        sid:'',
        difficult:'',
        input: '',
        output:'',
        sampleinput: '',
        sampleoutput: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入题目名称', trigger: 'blur' },
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入题目内容', trigger: 'blur' },
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sid: [
          { required: true, message: '请选择题目类型', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        difficult: [
          { required: true, message: '请选择题目难度', trigger: 'change' }
        ],
        input: [
          { required: true, message: '输入格式', trigger: 'blur' },
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        output: [
          { required: true, message: '输出格式', trigger: 'blur' },
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sampleinput: [
          { required: true, message: '输入用例', trigger: 'blur' },
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sampleoutput: [
          { required: true, message: '输出用例', trigger: 'blur' },
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      _this.$axios.post('/make',_this.ruleForm,{
        headers:{
          "Authorization" : localStorage.getItem("token")
        }
      }).then(res=>{
        this.$message({
          message: res.data.data,
          type: 'success'
        });
      })
      _this.resetForm() //////////////////
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped>
.demo-ruleForm{
  width:100%;
  height: 620px;
}
</style>
