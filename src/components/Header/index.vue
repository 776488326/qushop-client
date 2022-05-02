<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>趣购物欢迎您！</p>
          <p v-if="!userInfo">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">注册</router-link>
          </p>
          <p v-else @click="$router.push('/center')" id="persion">
            <el-dropdown @command="logout">
              <span class="el-dropdown-link">
                <img :src="userInfo.avatar" alt="avatar" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{ userInfo.username }}</el-dropdown-item>
                <el-dropdown-item icon="el-icon-user" :command="userInfo.username"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </p>
          <p class="category">
            <router-link
              v-for="(item,index) in categoryList"
              :key="item._id"
              :to="`/search/${item._id}/${index}`"
              >{{ item.name }}</router-link
            >
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center" class="hover" @click.native="alert">个人中心</router-link>
          <router-link to="/shopcart" class="hover" @click.native="alert">我的购物车</router-link>
          <router-link :to="{path:'/order',query:{userId:userInfo&&userInfo._id}}" class="hover" @click.native="alert">我的订单</router-link>
          <el-dropdown>
            <span class="el-dropdown-link">
              关注趣购物<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><a href="https://github.com/776488326"
                  ><img
                    style="width: 500px"
                    src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-764647c8-fd81-4a31-845f-c0bf285f2096/eed6c246-0c8a-4d40-9ea6-0c5cdc61a389.png"
                    alt="" /></a
              ></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="fill"></div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="趣购物">
          <img
            src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-764647c8-fd81-4a31-845f-c0bf285f2096/4497def3-e47b-4aad-8d6a-2b5f4fb9b143.png"
            alt=""
          />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
            autocomplete="off"
            :placeholder="placeholder"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from "vuex";
import _ from "lodash";
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
      placeholder: "国货当自强",
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapState("site", ["siteInfo","categoryList"]),
  },
  async mounted() {
    this.$bus.$on("clearKeyword", this.clearKeyword);
    setInterval(this.change, 3000); 
    this.requestCategoryList();
  },
  methods: {
    change() {
      let index = Math.floor(Math.random() * 4);
      this.placeholder = this.siteInfo.advertisment[index];
    },
    alert(){
      if(this.userInfo == null){
        this.$message.error("您还未登录，请先去登录！");
      }
    },
    ...mapActions("user", ["clearUserTokenAndInfo"]),
    ...mapActions("site",["requestCategoryList"]),
    logout(command) {
      try {
        this.clearUserTokenAndInfo();
        this.$message.success("用户"+command+"退出成功！")
        this.$router.push("/login");
      } catch (error) {
        this.$message({ type: "error", message: "退出失败！" });
      }
    },
    toSearch() {
      //编程式路由导航直接传入路径或者传入一个配置对象
      // this.$router.push('/search')
      let location = {
        name: "search",
        // path:'/search', 有params就不能使用path，如果只有params则必须在路由中配置:keyword来接收传入的参数，如果params是可有可无则在：keyword后加？
        // 如果传入的params是空串，则必须改为undefined，否则路径会出错
        params: { keyword: this.keyword || undefined },
        // query :{change:this.keyword.toUpperCase()
      };
      if (this.$route.query) {
        location.query = this.$route.query;
      }
      if (this.$route.path !== "/home") {
        console.log("head替换成功！");
        this.$router.replace(location);
      } else {
        console.log("head添加成功");
        this.$router.push(location);
      }
    },
    clearKeyword() {
      this.keyword = "";
    },
  },
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.header {
  & > .top {
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0px;
    z-index: 1000;
    height: 70px;
    line-height: 70px;
    background-color: #fff;
    font-size: 14px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.06);
    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .loginList {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          vertical-align: middle;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
          img {
            vertical-align: middle;
            width: 35px;
            margin: 0px 10px;
          }
        }
        #persion {
          cursor: pointer;
        }
        .category {
          margin-left: 50px;
          width: 200px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          a{
              text-decoration: none;
          }
          & > :hover {
            transform: scale(1.2);
            color: #f70 !important;
            cursor: pointer;
          }
          transition: all 0.3s ease;
        }
      }

      .typeList {
        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
        .hover {
          text-decoration: none;
          &:hover {
            color: #f70 !important;
          }
        }
      }
    }
  }

  & > .fill {
    height: 70px;
    width: 100%;
  }
  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 100px;
          margin: 25px 55px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 55px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 40px;
          padding: 0px 15px;
          border-radius: 20px 0px 0px 20px;
          border: 2px solid #ccc;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 40px;
          border-radius: 0px 20px 20px 0px;
          width: 68px;
          background-color: #ccc;
          border: none;
          color: #333;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>