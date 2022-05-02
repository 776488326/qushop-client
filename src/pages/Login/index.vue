<template>
  <div class="login_container">
    <div class="header">
      <h3>
        <span>
          <router-link to="/home" class="title">趣购物商城</router-link>
        </span>
        <span class="go"
          >没有账号，去 <router-link to="/register">注册</router-link>
        </span>
      </h3>
    </div>
    <!-- 登录 -->
    <div class="login_form">
      <div class="login_title">
        <pre>趣 购 物</pre>
      </div>
      <div class="login_content">
        <input type="counter" v-model="counter" @focus="counter = ''" />
        <input type="counter" v-model="password" @focus="password = ''" />
        <div class="login_option">
          <div class="pwd_box">
            <input type="checkbox" id="remember" :checked="ischecked" />
            <label for="remember" @click="ischecked = !ischecked"
              >记住密码</label
            >
          </div>
          <div id="findpwd">忘记密码</div>
        </div>
      </div>
      <div class="login_footer">
        <button @click="login"><pre>登  录</pre></button>
      </div>
    </div>

    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>趣购物社区</li>
        <li>联系我们</li>
      </ul>
      <div class="address">地址：河北省唐山市华北理工大学</div>
      <div class="beian">京ICP备20210927号</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "Login",
  data() {
    return {
      ischecked: false,
      counter: "请输入您的账号",
      password: "请输入您的密码",
    };
  },
  methods: {
    ...mapActions("user",["loginUser"]),
    login() {
      let { counter, password } = this;
      if (counter && password) {
        this.loginUser({ username: counter, password })
          .then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "登录成功，即将前往首页",
              });
              this.$router.push("/")
            } else {
              this.$message({
                type: "warning",
                message: res.msg,
              });
            }
          })
          .catch((err) => {
            this.$message.error("登录失败");
          });
      } else {
        this.$message({
          message: "账号或密码不可为空！！！",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@fontcolor: #777;
.login_container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .header {
    width: 100%;
    height: 70px;
    line-height: 60px;
    box-sizing: border-box;
    margin: 0px auto;
    h3 {
      width: 1200px;
      margin: auto;
      padding: 6px 15px;
      color: #333;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      span {
        font-size: 14px;
        .title{
          font-size: 24px;
        }
        a {
          text-decoration: none;
          color: #f70;
        }
      }
    }
  }
  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
  .login_form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 20px;
    width: 500px;
    border: 1px solid @fontcolor;
    margin-bottom: 100px;
    .login_title {
      box-sizing: border-box;
      width: 100%;
      padding: 20px;
      font-size: 18px;
      text-align: center;
      color: @fontcolor;
    }
    .login_content {
      box-sizing: border-box;
      margin: 50px auto;
      width: 80%;
      display: flex;
      flex-direction: column;
      color: @fontcolor;
      input {
        margin: 20px;
        border: none;
        border-bottom: 2px solid @fontcolor;
        background: none;
        box-sizing: border-box;
        font-size: 16px;
        padding: 10px;
        text-align: center;
        &::placeholder {
          text-align: center;
          color: @fontcolor;
          font-size: 16px;
        }
        outline: none;
        margin: 20px;
      }
      .login_option {
        display: flex;
        justify-content: space-between;
        .pwd_box {
          display: flex;
          align-items: center;
        }
        #findpwd {
          margin: 20px;
          cursor: pointer;
        }
      }
    }
    .login_footer {
      width: 100%;
      text-align: center;
      button {
        padding: 20px;
        box-sizing: border-box;
        border-radius: 20px;
        width: 50%;
        font-size: 18px;
        color: @fontcolor;
        background: none;
        border: none;
        border-bottom: 1px solid #f70;
        &:hover {
          border-color: @fontcolor;
          color: #f70;
        }
      }
    }
  }
}
</style>