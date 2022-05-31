<template>
  <div class="m-content">
    <h3 style="font-size: 28px">欢迎来到HIT算法与博客平台</h3>
    <div class="block" style="width: 100%">
      <span class="demonstration"></span>
      <el-carousel
        trigger="click"
        height="250px"
        :interval="3000"
        arrow="always"
        style="width:800px;margin-left: 10%"
      >
        <el-carousel-item v-for="item in imgList" :key="item.name">
          <img
            :src="item.src"
            style="height:100%;width:100%;"
            alt="图片丢失了"
            :title="item.title"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  hasLogin: false,
  status: false,
  data() {
    return {
      imgList: [
        {
          name: "lj",
          src: require("@/assets/test1.jpg"),
          title: "test1.jpg",
        },
        {
          name: "logo",
          src: require("@/assets/test2.jpg"),
          title: "test2.jpg",
        },
      ],
      user: {
        username: "请先登录",
        avatar:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      },
    };
  },
  methods: {
    logout() {
      const _this = this;
      _this.$axios
        .get("/logout", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          _this.$store.commit("REMOVE_INFO");
          _this.$router.push("/login");
        });
    },
    goSpecial() {
      const _this = this;
      _this.$router.push("/specials");
    },
    goCheck() {
      const _this = this;
      _this.$router.push("/check");
    },
    goRank() {
      const _this = this;
      _this.$router.push("/rank");
    },
    goMake() {
      const _this = this;
      _this.$router.push("/make");
    },
  },
  //回显
  created() {
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username;
      this.user.avatar = this.$store.getters.getUser.avatar;
      this.hasLogin = true;
      if (this.$store.getters.getUser.status === 2) this.status = true;
    }
  },
};
</script>

<style scoped>
.block {
  margin: 50px 0;
}
.m-content {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}
.maction {
  margin: 10px 0;
}
</style>
