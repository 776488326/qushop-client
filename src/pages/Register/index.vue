<template>
  <div class="register-container">
    <div class="header">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登录</router-link>
        </span>
      </h3>
    </div>
    <!-- 注册内容 -->
    <div class="register">
      <div class="title">
        <h3>趣购物</h3>
      </div>
      <div class="content">
        <input type="text" placeholder="请输入您的账号" v-model="username" />
        <input
          type="password"
          placeholder="请输入您的密码"
          v-model="password"
        />
        <input
          type="password"
          placeholder="请确认您的密码"
          v-model="checkpwd"
        />
        <input type="text" placeholder="请输入您的手机号" v-model="phone" />
        <input type="text" placeholder="请输入您的邮箱" v-model="email" />
      </div>
      <div class="submit">
        <button @click="register">注册</button>
      </div>
    </div>
    <!-- 底部 -->
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
import { mapState } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      password: "",
      email: "",
      username: "",
      checkpwd: "",
    };
  },
  methods: {
    async register() {
      let { phone, password, email, username, checkpwd } = this;
      if (phone && password && email && username && checkpwd === password) {
        try {
          const result = await this.$store.dispatch("registerUser", {
            phone,
            password,
            username,
            email,
          });
          console.log(result);
          if (result.errno === 200) {
            this.$message({
              type: "success",
              message: "注册成功，即将前往登陆页面！",
            });
            console.log('111')
            this.$router.push("/login");
          } else {
            this.$message.error(result.msg);
          }
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert("error");
      }
    },
    async getCode() {
      try {
        this.checkcode = await this.$store.dispatch(
          "getCheckCode",
          this.phonenum
        );
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
@fontcolor: #777;
.register-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
      span {
        font-size: 14px;
        float: right;

        a {
          color: #f70;
        }
      }
    }
  }
  .register {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 20px;
    width: 500px;
    border: 1px solid @fontcolor;
    .title {
      box-sizing: border-box;
      width: 100%;
      padding: 20px;
      font-size: 18px;
      text-align: center;
      color: @fontcolor;
    }
    .content {
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
    }
    .submit {
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
}
</style>