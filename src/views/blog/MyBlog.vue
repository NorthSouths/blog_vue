<template>
  <div>
    <div class="block" style="margin-top: 5%">
      <el-empty description="暂无已发表博客" v-show="emptyData"></el-empty>
      <el-timeline>
        <el-timeline-item
          :timestamp="blog.created"
          placement="top"
          v-for="blog in blogs"
        >
          <el-card>
            <h3></h3>
            <h4>
              <router-link
                :to="{ name: 'BlogDetail', params: { blogId: blog.id } }"
              >
                {{ blog.title }}
              </router-link>
            </h4>
            <p>{{ blog.description }}</p>
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
import "github-markdown-css/github-markdown.css";
export default {
  name: "MyBlog",
  components: { Header },
  data() {
    return {
      blogs: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
    };
  },
  computed: {
    emptyData() {
      return this.blogs.length === 0 ? true : false;
    },
  },
  methods: {
    page(currentPage) {
      const _this = this;
      var id = _this.$store.getters.getUser.id;
      _this.$axios
        .get("/myblog?currentPage=" + currentPage + "&id=" + id, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          _this.blogs = res.data.data.records;
          _this.currentPage = res.data.data.currentPage;
          _this.total = res.data.data.total;
          _this.pageSize = res.data.data.size;
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
