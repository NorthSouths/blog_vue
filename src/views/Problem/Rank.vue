<template>
<div>
      <Header></Header>
    <el-main id="main" >
      <el-button type="success" circle>AC:{{AC}}</el-button>
      <el-button type="info" circle>EX:{{this.TR}}</el-button>
      <el-button type="danger" circle>WA:{{WA}}</el-button>

      <el-table
          :data="tableData"
          style="width: 100%">
        <!--          max-height="250">-->
        <el-table-column
            fixed
            prop="pid"
            label="题号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="sname"
            label="类型"
            width="120">
        </el-table-column>
        <el-table-column
            prop="title"
            label="题目"
            width="120">
        </el-table-column>
        <el-table-column
            prop="status"
            label="通过"
            width="120">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作(并没用)"
            width="120">
          <span class="demonstration">默认不区分颜色</span>
          <el-rate v-model="value1"></el-rate>
        </el-table-column>
      </el-table>
    </el-main>
</div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "Rank",
  components: {Header},
  data() {
    return {
      message:'',
      best:[],
      WA:'',
      AC:'',
      TR:'',
      tableData: []
    }
  },
  created() {
    const _this = this
    const id = _this.$store.getters.getUser.id
    _this.$axios.get("/ranksu/"+id).then(res=>{
      _this.tableData = res.data.data
    })
    _this.$axios.get("/rank/"+id).then(res=>{
      this.AC = res.data.data.ac
      this.WA = res.data.data.wa
      this.TR = res.data.data.tr
    })
    _this.$axios.get("/best").then(res=>{
      _this.best=res.data.data
      for(var i in _this.best){
        _this.message +="用户名:"+_this.best[i].username+"  的AC数目:  "+_this.best[i].ac+"\n"
      }
      this.$notify({
        title: '封神榜',
        message: _this.message,
        duration: 0
      });
    })
  }
}
</script>

<style scoped>

#main{
  margin-top: 0%;
  width: 100%;
  height: 100%;
}
</style>
