<template>
  <div>
    <el-main class="main">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="sname" label="专题" width="120">
        </el-table-column>
        <el-table-column prop="difficult" label="难度" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small">
              <router-link
                :to="{ name: 'SpecialDetail', params: { sid: scope.row.sid } }"
              >
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
  components: { Header },
  data() {
    return {
      username: false,
      tableData: [
        {
          sid: "",
          created: "",
          sname: "",
          status: "",
          difficute: "",
        },
      ],
      specials: [],
    };
  },
  methods: {
    specials() {
      const _this = this;
      _this.$axios.get("/specials").then((res) => {
        _this.specials = res.data.data;
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    goDetail(index, rows) {
      this.$router.push("/special/" + this.tableData[index].sid);
    },
  },
  created() {
    const _this = this;
    _this.$axios.get("/specials").then((res) => {
      _this.tableData = res.data.data;
    });
    if (_this.$store.getters.getUser.username === "Myren") {
      _this.username = true;
    }
  },
};
</script>

<style scoped>
.main {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 90%;
  margin: 20px;
}
</style>
