<template>
  <div>
        <Header></Header>
      <el-main id="main">
        <el-table
            :data="problem"
            style="width: 100%">
          <el-table-column
              fixed
              prop="created"
              label="发布日期"
              width="120">
          </el-table-column>
          <el-table-column
              prop="title"
              label="题目"
              width="120">
          </el-table-column>
          <el-table-column
              prop="status"
              label="成功数"
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
              <!--scope.$index : 当前列的索引 scope.row 当前列的值 @click="goDetail(scope.$index,tableData)"      -->
              <el-button
                  type="text"
                  size="small">
                <router-link :to="{name:'Problem',params:{pid:scope.row.pid}}">
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
  name: "SpecialDetail",
  components: {Header},
  data(){
    return{
      problem:[

      ]
    }
  },
  methods: {

  },
  created() {
    const sid = this.$route.params.sid
    const _this = this
    if (sid) {
      _this.$axios.get('/special/'+sid).then(res => {
        _this.problem = res.data.data
      })
    }
  }
}
</script>

<style scoped>
#main{
  margin-top: 3%;
  margin-left: 15%;
  width: 80%;
}
</style>
