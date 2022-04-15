<template>
  <div class="login_container">
    <!-- 登录 -->
    <div class="login_form">
      <div class="login_title">
        <pre>趣 购 物</pre>
      </div>
      <div class="login_content">
        <input type="counter" placeholder="请输入您的账号" v-model="counter">
        <input type="password" placeholder="请输入您的密码" v-model="password">
        <div class="login_option">
          <div class="pwd_box">
            <input type="checkbox" id="remember" :checked="ischecked">
            <label for="remember" @click="ischecked=!ischecked">记住密码</label>
          </div>
          <div id="findpwd">忘记密码</div>
        </div>
      </div>
      <div class="login_footer">
        <button @click="login"><pre>登  录</pre></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ischecked: false,
      counter: "",
      password: "",
    };
  },
  methods: {
    async login() {
      let { counter, password } = this;
      if (counter && password) {
        await this.$store.dispatch("loginUser", { username: counter, password }).then(rel=>{
          if(rel.errno===200){
            this.$message({
              type: "success",
              message: "登录成功，即将前往首页"
            })
            
            this.$router.push("/");
          }
          else{
            this.$message({
              type: "warning",
              message: rel.msg
            })
          }
        }).catch(err=>{
          this.$message.console.error("登录失败");
        })
      
      }
      else{
        this.$message(
          {
            message: "账号或密码不可为空！！！",
            type: "warning"
          }
        )
      }
    },
  },
};
</script>

<style lang="less" scoped>
  @fontcolor: #777;
  .login_container{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login_form{
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
      .login_title{
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
        font-size: 18px;
        text-align: center;
        color: @fontcolor;
      } 
      .login_content{
        box-sizing: border-box;
        margin: 50px auto;
        width: 80%;
        display: flex;
        flex-direction: column;
        color: @fontcolor;
        input{
          margin: 20px;
          border: none;
          border-bottom: 2px solid @fontcolor;
          background: none;
          box-sizing: border-box;
          font-size: 16px;
          padding: 10px;
          text-align: center;
          &::placeholder{
            text-align: center;
            color: @fontcolor;
            font-size: 16px;
          }
          outline: none;
          margin: 20px;
        }
        .login_option{
          display: flex;
          justify-content: space-between;
          .pwd_box{
            display: flex;
            align-items: center;
          }
          #findpwd{
            margin: 20px;
            cursor: pointer;
          }
        }
      }
      .login_footer{
        width: 100%;
        text-align: center;
        button{
          padding: 20px;
          box-sizing: border-box;
          border-radius: 20px;
          width: 50%;
          font-size: 18px;
          color: @fontcolor;
          background: none;
          border: none;
          border-bottom: 1px solid #f70;
          &:hover{
            border-color: @fontcolor;
            color: #f70;
          }
        }
      }
    }
  }

</style>