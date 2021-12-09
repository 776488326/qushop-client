<template>
  <div class="register-container">
    <div class="header">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登录</router-link>
        </span>
      </h3>
    </div>
    <!-- 注册内容 -->
    <div class="register">
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phonenum">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="checkcode">
        <button style="height:38px;width:100px" @click="getCode">获取验证码</button>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码" v-model="password">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model="checkpwd">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="ischeck">
        <span>同意协议并注册《趣购物用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
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
      <div class="beian">京ICP备20210927号
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: 'Register',
    data(){
      return{
        phonenum:'',
        password:'',
        checkpwd:'',
        checkcode:'',
        ischeck:true,
      }
    },
    methods:{
      async register(){
        let {phonenum,password,checkpwd,checkcode} = this
        if(phonenum&&password&&checkpwd&&checkcode&&checkpwd===password)
        {
          try {
            this.$store.dispatch('registerUser',{phonenum,password,checkcode})
            this.$router.push('/login')
            } catch (error) {
            alert(error.message)
          }
        }else
        {
          alert('error')
        }
      },
      async getCode(){
        try {
          this.checkcode = await this.$store.dispatch('getCheckCode',this.phonenum)
        } catch (error) {
          alert(error.message)
        } 
      }
    },
    computed:{
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .header{
      width: 100%;
      height: 70px;
      line-height: 60px;
      box-sizing: border-box;
      margin: 0px auto;
      background-color: #fff;
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
            color: #e1251b;
          }
        }
      }
    }
    .register {
      width: 1200px;
      margin: 0 auto;
      .content {
        padding-left: 390px;
        margin-bottom: 50px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          border-radius: 19px;
          margin: 0px 20px;
          outline: none;
          background: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 120%;
          left: 515px;
          color: red;
        }

        button{
          outline: none;
          background: none;
          border: 1px solid #aaa;
          border-radius: 20px;
          cursor: pointer;
        }
      }

      .controls {
        text-align: center;
        position: relative;
        left: 15px;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 120%;
          left: 500px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 37px 0 0 70px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          color: #777 ;
          display: inline-block;
          font-size: 16px;
          border-radius: 18px;
          outline: none;
          background: none;
          border: none;
          border-bottom: 1px solid #f70;
          &:hover{
            border-color: rgba(0, 0, 0, 1);
            color: #333;
            cursor: pointer;
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