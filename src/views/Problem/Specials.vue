<template>
<div>
      <Header></Header>
    <el-main id="main" style="margin-top: 0%">
      <el-table
          :data="tableData"
          style="width: 100%">
<!--          max-height="250">-->
        <el-table-column
            fixed
            prop="created"
            label="发布日期"
            width="150">
        </el-table-column>
        <el-table-column
            prop="sname"
            label="专题"
            width="120">
        </el-table-column>
        <el-table-column
            prop="difficult"
            label="难度"
            width="120">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
          <template slot-scope="scope">
<!--            <el-button v-if="username"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
              移除
            </el-button>-->
<!--scope.$index : 当前列的索引 scope.row 当前列的值 @click="goDetail(scope.$index,tableData)"      -->
            <el-button
                       type="text"
                       size="small">
              <router-link :to="{name:'SpecialDetail',params:{sid:scope.row.sid}}">
                做题
              </router-link>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
</div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "Specials",
  components: {Header},
  data() {
    return {
      username:false,
      tableData: [{
        sid:'',
        created: '',
        sname: '',
        status: '',
        difficute:''
      }],
      specials: []
    }
  },
  methods: {
    specials() {
      const _this = this
      _this.$axios.get("/specials").then(res=>{
        _this.specials = res.data.data
      })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    goDetail(index,rows){
      this.$router.push('/special/'+this.tableData[index].sid)
    }
  },
  created() {
    const _this = this
    _this.$axios.get("/specials").then(res=>{
      _this.tableData = res.data.data
    })
    if(_this.$store.getters.getUser.username==="Myren"){
      _this.username=true
    }
  }
}
</script>

<style scoped>
#main{
  margin-top: 13%;
  margin-left: 18%;
  width: 700px;
  height: 100%;
}
</style>
