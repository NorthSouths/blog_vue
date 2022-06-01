<template>
  <div>
    <div class="blog" style="margin-top: 5%">
      <h2>{{ blog.title }}</h2>
      <h2>作者: {{ user.username }}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }">
          编辑
        </router-link>
      </el-link>

      <i class="el-icon-delete" v-if="ownBlog" @click="delblog('blog')">删除</i>

      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import "github-markdown-css/github-markdown.css";
export default {
  name: "BlogDetail",
  components: { Header },
  data() {
    return {
      id: "",
      blog: {
        id: "",
        description: "",
        title: "标题",
        content: "内容",
        userId: "",
      },
      user: {
        username: "",
        id: "",
      },
      ownBlog: false,
    };
  },
  methods: {
    delblog(blog) {
      const _this = this;
      this.$axios
        .post("/blog/del", _this.blog, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          var msg = res.data.data;
          if (res.data.code === 200) {
            this.$message({
              message: msg,
              type: "success",
            });
            _this.$router.push("/test/blogs");
          } else this.$message.error(msg);
        });
    },
    fun1(id) {
      this.$axios.get("/user/" + id).then((res) => {
        this.user.username = res.data.data.username;
      });
    },
  },
  created() {
    const blogId = this.$route.params.blogId;
    if (blogId) {
      this.$axios.get("/blog/" + blogId).then((res) => {
        const blog = res.data.data;
        this.id = res.data.data.userId;
        this.blog.id = blog.id;
        this.blog.title = blog.title;
        this.blog.description = blog.description;
        this.user.id = blog.userId;
        var MarkdownIt = require("markdown-it");
        var md = new MarkdownIt();
        this.blog.content = md.render(blog.content);
        this.fun1(this.id);
        if (this.$store.getters.getUser != null) {
          this.ownBlog = blog.userId === this.$store.getters.getUser.id;
        }
      });
    }
  },
};
</script>

<style scoped>
.blog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 800px;
  padding: 20px 15px;
}
.button {
}
.el-icon-delete {
  padding: 20px 10px;
}
</style>
