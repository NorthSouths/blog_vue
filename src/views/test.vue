<template>
    <el-container id="containter" style="width: 1000px;height: 1200px;">
      <el-aside id="aside" width="200px" style="background-color: white;">
        <el-menu router :default-active="$route.path" :default-openeds="['/test/blogs']">
          <br><br>
          <img src="../assets/logo.png" style="width: 50%;margin-left: 20%">
          <div style="margin-top: 2%;margin-left: 50px;font-size: 25px">{{user.username}}</div>
          <a-tag style="font-size: 18px;border: none;margin-top: 15px;margin-left: 5%">{{this.nowDate}}</a-tag>
          <el-menu-item index="/test/blogs" style="margin-top: 20px;margin-left: 10%">
            <i class="el-icon-menu"></i>博客首页</el-menu-item>
          <el-menu-item index="/test/myblog" v-show="hasLogin" style="margin-left: 10%"><i class="el-icon-user-solid"></i>我的博客</el-menu-item>
          <el-menu-item index="/newLogin" v-show="!hasLogin" style="margin-left: 10%"><i class="el-icon-s-order"></i>登录页面</el-menu-item>
          <el-menu-item index="/test/blog/add" v-show="hasLogin" style="margin-left: 10%"><i class="el-icon-s-order"></i>发布博客</el-menu-item>
          <el-menu-item index="/test/specials" v-show="hasLogin" style="margin-left: 10%"><i class="el-icon-edit"></i>查看题类</el-menu-item>
          <el-menu-item index="/test/make" v-show="status" style="margin-left: 10%"><i class="el-icon-s-ticket"></i>出题页面</el-menu-item>
          <el-menu-item index="/test/check" v-show="status" style="margin-left: 10%"><i class="el-icon-s-management"></i>检验信息</el-menu-item>
          <el-menu-item index="/test/rank" v-show="hasLogin" style="margin-left: 10%"><i class="el-icon-medal"></i>我的记录</el-menu-item>
          <el-menu-item  v-show="hasLogin" @click="logout" style="margin-left: 10%;color: crimson"><i class="el-icon-switch-button"></i>退出登录</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main id="main"  style="height:1250px;flex-grow:1;">
        <router-view></router-view>
      </el-main>
    </el-container>
</template>

<script>

export default {
  name: 'Test',
  nowDate:'',
  data() {
    return {
      nowDate:'',
      hasLogin:false,
      status:false,
      user:{
        username:'请先登录',
        avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      }
    }
  },
  methods: {
    logout() {
      const _this = this;
      _this.$axios.get("/logout", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/newLogin")
      })
    },
    currentTimeBySecond() {
      setInterval(this.formatDateBySecond, 500);
    },
    formatDateBySecond() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let week = date.getDay(); // 星期
      let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.nowDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    this.currentTimeBySecond();
  },
  created() {
    if(this.$store.getters.getUser.username){
      this.user.username=this.$store.getters.getUser.username
      this.user.avatar=this.$store.getters.getUser.avatar
      this.hasLogin=true
      if(this.$store.getters.getUser.status===2)
        this.status=true
    }
  }
}
</script>

<style scoped>
html,body,#app,.demo,.el-container {
  height: 100%;
}

#aside {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 15px;
  left: 15px;
  color: #333;
}
#main{
  width: 100%;
  height: 100%;
  position: relative;
}

</style>
