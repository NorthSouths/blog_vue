<template>
  <div>
    <div class="block" style="margin-top: 5%">
      <el-timeline>
        <el-empty description="暂无待检查题目" v-show="emptyData"></el-empty>

        <el-timeline-item
          placement="top"
          v-for="(check, index) in checks"
          :key="index"
        >
          <el-card>
            <h3></h3>
            <h4>
              {{ check.title }}
            </h4>
            <p>{{ check.content }}</p>
            <el-button
              class="success"
              type="success"
              circle
              @click="right(check.id, check.pid)"
              >✔</el-button
            >
            <el-button
              type="danger"
              circle
              @click="failure(check.id, check.pid)"
              >X</el-button
            >
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-pagination
        class="page"
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="page"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  inject: ["reload"],
  name: "Check",
  components: { Header },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      body: {
        id: "",
        pid: "",
      },
      checks: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
    };
  },
  computed: {
    emptyData() {
      return this.checks.length === 0 ? true : false;
    },
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    failure(id, pid) {
      const _this = this;
      _this.body.id = id;
      _this.body.pid = pid;
      _this.$axios.post("/failure", _this.body).then((res) => {
        _this.$message({
          showClose: true,
          message: res.data.data,
          type: "success",
        });
      });
      location.reload();
      this.$router.go(0);
    },
    right(id, pid) {
      const _this = this;
      _this.body.id = id;
      _this.body.pid = pid;
      _this.$axios.post("/right", _this.body).then((res) => {
        _this.$message({
          showClose: true,
          message: res.data.data,
          type: "success",
        });
      });
      location.reload();
      this.$router.go(0);
    },
    page(currentPage) {
      const _this = this;
      _this.$axios.get("/checks?currentPage=" + currentPage).then((res) => {
        console.log(res);
        _this.checks = res.data.data.records;
        _this.currentPage = res.data.data.currentPage;
        _this.total = res.data.data.total;
        _this.pageSize = res.data.data.size;
        if (_this.total === 0) {
          _this.$message({
            showClose: true,
            message: "暂无题目需要审核",
            type: "success",
          });
        }
      });
    },
  },
  created() {
    this.page(1);
  },
};
</script>

<style scoped>
.page {
  margin: 0 auto;
  text-align: center;
}
</style>
