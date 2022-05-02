<template>
  <!-- 底部 -->
  <div class="footer">
    <div class="message">
      <div class="left">
        <span><i>开发者：</i> 冯亮</span>
        <span><i>相关技术：</i> Vue+Node</span>
        <span><i>用途：</i> 学习Demo</span>
        <span><i>联系QQ：</i> 776488326</span>
      </div>
      <div class="right">
        <span>帮助中心</span>
        <img
          src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-764647c8-fd81-4a31-845f-c0bf285f2096/29b00f52-7e95-4c48-b85d-62ea72edf3dc.jpg"
          alt="weixin"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="less" scoped>
.footer {
  height: 300px;
  background: hsla(0, 0%, 100%, 0.3);
  .message {
    width: 1200px;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      i {
        color: #f70;
        font-weight: bold;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
      color: #f70;
      img {
        width: 150px;
      }
    }
  }
}
</style>